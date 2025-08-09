import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getCurrentLang, t } from "../utils/lang"; // استخدم util اللي فوق

const axiosServices = axios.create({
  baseURL: "https://chemitic.surgi-web.com",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      "https://chemitic.surgi-web.com/Authorization/RefreshToken",
      {},
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          d: refreshToken,
        },
      }
    );

    if (response.data && response.data.isSuccess && response.data.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      Cookies.set("authToken", accessToken);
      Cookies.set("refreshToken", newRefreshToken);
      return accessToken;
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

const showAuthErrorMessage = () => {
  const lang = getCurrentLang();
  toast.error(
    t(
      {
        ar: "انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.",
        en: "Session expired. Please log in again.",
        fr: "La session a expiré. Veuillez vous reconnecter.",
      },
      lang
    ),
    {
      position: "top-right",
      autoClose: 5000,
      rtl: lang === "ar",
    }
  );
};

const handleLogout = () => {
  Cookies.remove("authToken");
  Cookies.remove("refreshToken");
  Cookies.remove("user");
  localStorage.removeItem("user");
  localStorage.removeItem("authState");

  let newUrl = window.location.href.replace(/[?&]showToast=true/g, "");
  newUrl += (newUrl.includes("?") ? "&" : "?") + "showToast=true";
  window.location.href = newUrl;
};

axiosServices.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
  (response) => response,
  async (error) => {
    const lang = getCurrentLang();
    const originalRequest = error.config;

    if (!error.response) {
      toast.error(
        t(
          {
            ar: "تحقق من اتصال الإنترنت.",
            en: "Network error. Please check your connection.",
            fr: "Erreur réseau. Veuillez vérifier votre connexion.",
          },
          lang
        ),
        { position: "top-right", autoClose: 5000, rtl: lang === "ar" }
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosServices(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          processQueue(null, newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosServices(originalRequest);
        } else {
          processQueue(new Error("Failed to refresh token"));
          showAuthErrorMessage();
          handleLogout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        showAuthErrorMessage();
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response.status === 401) {
      showAuthErrorMessage();
      handleLogout();
      return Promise.reject(error);
    }

    if (error.response.status === 403) {
      toast.error(
        t(
          {
            ar: "ليس لديك صلاحية للوصول لهذا المورد.",
            en: "You don't have permission to access this resource.",
            fr: "Vous n'avez pas la permission d'accéder à cette ressource.",
          },
          lang
        ),
        { position: "top-right", autoClose: 5000, rtl: lang === "ar" }
      );
    }

    if (error.response.status >= 500) {
      toast.error(
        t(
          {
            ar: "خطأ في الخادم. حاول مرة أخرى لاحقًا.",
            en: "Server error. Please try again later.",
            fr: "Erreur serveur. Veuillez réessayer plus tard.",
          },
          lang
        ),
        { position: "top-right", autoClose: 5000, rtl: lang === "ar" }
      );
    }

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export const isAuthenticated = () => {
  const token = Cookies.get("authToken");
  const refreshToken = Cookies.get("refreshToken");
  return !!token && !!refreshToken;
};

export const forceLogout = () => {
  handleLogout();
};

export default axiosServices;
