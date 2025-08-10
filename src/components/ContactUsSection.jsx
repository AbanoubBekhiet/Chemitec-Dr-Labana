import React, { useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { t, useLang } from "../context/LangContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0018225910463!2d31.23630287558422!3d30.050241818656498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841104551c65d%3A0x395f393f8aab6e0d!2z2KfZhNio2Kgg2KfZhNmF2LXYp9ixINin2YTYt9mC2KfYqSDYp9mE2YXZitmI2KfZhiDYp9mE2YPYp9mE2YrYsdmK2Kkg2KfZhNio2Kgg2KfZhNiq2KfZhA!5e0!3m2!1sar!2seg!4v1718700000000!5m2!1sar!2seg";

export default function ContactUsSection() {
  const mapRef = useRef(null);
  const inView = useInView(mapRef, { once: true, margin: "-80px" });
  const controls = useAnimation();
  const { lang } = useLang();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error | null

  React.useEffect(() => {
    if (inView) {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.95, type: "spring", bounce: 0.17 },
      });
    }
  }, [inView, controls]);

  const validateField = (name, value, lang) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value)
          error = t(
            {
              en: "Sender name is required.",
              ar: "اسم المرسل مطلوب.",
              fr: "Le nom de l'expéditeur est requis.",
            },
            lang
          );
        else if (value.length > 100)
          error = t(
            {
              en: "Name must not exceed 100 characters.",
              ar: "يجب ألا يتجاوز الاسم 100 حرف.",
              fr: "Le nom ne doit pas dépasser 100 caractères.",
            },
            lang
          );
        break;

      case "email":
        if (!value)
          error = t(
            {
              en: "Email is required.",
              ar: "البريد الإلكتروني مطلوب.",
              fr: "L'e-mail est requis.",
            },
            lang
          );
        else if (!/\S+@\S+\.\S+/.test(value))
          error = t(
            {
              en: "Please enter a valid email address.",
              ar: "يرجى إدخال بريد إلكتروني صحيح.",
              fr: "Veuillez entrer une adresse e-mail valide.",
            },
            lang
          );
        break;

      case "subject":
        if (!value)
          error = t(
            {
              en: "Subject is required.",
              ar: "الموضوع مطلوب.",
              fr: "Le sujet est requis.",
            },
            lang
          );
        else if (value.length > 200)
          error = t(
            {
              en: "Subject must not exceed 200 characters.",
              ar: "يجب ألا يتجاوز الموضوع 200 حرف.",
              fr: "Le sujet ne doit pas dépasser 200 caractères.",
            },
            lang
          );
        break;

      case "phone":
        if (value && !/^\+?[0-9]{8,15}$/.test(value))
          error = t(
            {
              en: "Invalid phone number.",
              ar: "رقم الهاتف غير صالح.",
              fr: "Numéro de téléphone invalide.",
            },
            lang
          );
        break;

      case "message":
        if (!value)
          error = t(
            {
              en: "Message content is required.",
              ar: "محتوى الرسالة مطلوب.",
              fr: "Le contenu du message est requis.",
            },
            lang
          );
        else if (value.length > 1000)
          error = t(
            {
              en: "Message must not exceed 1000 characters.",
              ar: "يجب ألا تتجاوز الرسالة 1000 حرف.",
              fr: "Le message ne doit pas dépasser 1000 caractères.",
            },
            lang
          );
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, lang),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], lang);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://chemitic.surgi-web.com/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-12 px-12 mx-auto" id="contactUs">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
        className="text-4xl md:text-5xl font-bold text-center mb-3"
      >
        {t({ en: "Contact us", ar: "تواصل معنا", fr: "Contactez-nous" }, lang)}
      </motion.h2>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="text-gray-400 text-center mb-12 max-w-4xl mx-auto"
      >
        {t(
          {
            en: "The harder you work for something, the greater you’ll feel when you achieve it.",
            ar: "كلما عملت بجد من أجل شيء ما، كلما شعرت بشعور أعظم عندما تحققه.",
            fr: "Plus vous travaillez dur pour quelque chose, plus vous vous sentirez fier lorsque vous l’aurez atteint.",
          },
          lang
        )}
      </motion.p>

      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
          className="flex-1 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder={t(
              { en: "Your name", ar: "اسمك", fr: "Votre nom" },
              lang
            )}
            className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] transition"
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-[2px] leading-tight">
              {errors.name}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Phone Field */}
            <div className="flex flex-col flex-1">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder={t(
                  { en: "Phone", ar: "رقم الهاتف", fr: "téléphone" },
                  lang
                )}
                className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] transition"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-[2px] leading-tight">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col flex-1">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder={t(
                  { en: "E-mail", ar: "الإيمال", fr: "E-mail" },
                  lang
                )}
                className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] transition"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-[2px] leading-tight">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            type="text"
            placeholder={t(
              { en: "Subject", ar: "الموضوع", fr: "sujette" },
              lang
            )}
            className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-200 text-[16px] transition"
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-[2px] leading-tight">
              {errors.subject}
            </p>
          )}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t(
              { en: "Description", ar: "وصف", fr: "Description" },
              lang
            )}
            className="border border-gray-200 rounded-md px-4 py-2 h-28 focus:outline-none focus:border-blue-200 text-[16px] transition resize-none"
            required
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-[2px] leading-tight">
              {errors.message}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-2 w-[140px] h-10 bg-[#4b5e77] text-white rounded-md font-medium text-[16px] shadow transition disabled:opacity-50"
            disabled={loading}
          >
            {loading
              ? t(
                  { en: "Sending...", ar: "جاري الإرسال...", fr: "Envoi..." },
                  lang
                )
              : t(
                  {
                    en: "Send request",
                    ar: "إرسال الطلب",
                    fr: "Envoyer une demande",
                  },
                  lang
                )}
          </motion.button>

          {status === "success" && (
            <p className="text-green-500 mt-2">
              {t(
                {
                  en: "Message sent successfully!",
                  ar: "تم إرسال الرسالة بنجاح!",
                  fr: "Message envoyé avec succès!",
                },
                lang
              )}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 mt-2">
              {t(
                {
                  en: "Something went wrong!",
                  ar: "حدث خطأ ما!",
                  fr: "Une erreur s'est produite!",
                },
                lang
              )}
            </p>
          )}
        </motion.form>

        {/* Map */}
        <motion.div
          ref={mapRef}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={controls}
          className="flex-1 flex items-center justify-end"
        >
          <div className="w-full h-[360px] md:w-[570px] md:h-[450px] overflow-hidden bg-gray-100 shadow-sm flex items-center justify-center">
            <iframe
              title="Google Map"
              src={MAP_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
