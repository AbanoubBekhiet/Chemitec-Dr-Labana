import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import LoadingSpinner from './ui/LoadingSpinner'

function Main () {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // بعد نص ثانية مثلًا يختفي اللودينج ويظهر الأبلكيشن (تقدر تزود أو تقلل حسب تجربتك)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // أو 1000 لو حابب، أو شيلها خالص لو عندك حاجة async فعلا

    return () => clearTimeout(timer)
  }, [])

  return loading ? <LoadingSpinner /> : <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Main />
  // </React.StrictMode>
)
