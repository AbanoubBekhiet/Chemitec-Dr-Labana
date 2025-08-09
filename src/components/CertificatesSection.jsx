import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axiosServices from '../utils/axios'
import { t, useLang } from '../context/LangContext'

const BASE_URL = 'https://chemitic.surgi-web.com'

export default function CertificatesSection () {
  const { lang } = useLang()
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    axiosServices
      .get('/certificates')
      .then(res => {
        if (!ignore) {
          setCertificates(Array.isArray(res.data.data) ? res.data.data : [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (!ignore) {
          setError(
            t(
              {
                en: 'Error loading certificates.',
                ar: 'حدث خطأ أثناء تحميل الشهادات.',
                fr: 'Erreur lors du chargement des certificats.'
              },
              lang
            )
          )
          setLoading(false)
        }
      })
    return () => {
      ignore = true
    }
  }, [lang])

  return (
    <section className='py-8 bg-white'>
      <motion.h2
        className='text-3xl md:text-4xl font-bold text-center mb-14'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        viewport={{ once: true }}
      >
        {t(
          {
            en: 'Quality and Experience Certificates',
            ar: 'شهادات الجودة والخبرة',
            fr: "Certificats de qualité et d'expérience"
          },
          lang
        )}
      </motion.h2>

      <div className='flex flex-wrap justify-center items-center gap-x-14 gap-y-8'>
        {loading ? (
          <div className='py-10 text-gray-400 text-center w-full'>
            {t(
              { en: 'Loading...', ar: 'جارٍ التحميل...', fr: 'Chargement...' },
              lang
            )}
          </div>
        ) : error ? (
          <div className='py-10 text-red-500 text-center w-full'>{error}</div>
        ) : !certificates.length ? (
          <div className='py-10 text-gray-400 text-center w-full'>
            {t(
              {
                en: 'No certificates found.',
                ar: 'لا توجد شهادات.',
                fr: 'Aucun certificat trouvé.'
              },
              lang
            )}
          </div>
        ) : (
          certificates.map((c, i) => (
            <motion.div
              key={c.id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.11,
                type: 'spring'
              }}
              viewport={{ once: true }}
              className='flex items-center justify-center'
            >
              <img
                src={c.image ? BASE_URL + c.image : '/no-img.png'}
                alt={c.name}
                className='h-20 md:h-24 max-w-[255px] object-contain'
                draggable='false'
                onError={e => {
                  e.target.src = '/no-img.png'
                }}
              />
            </motion.div>
          ))
        )}
      </div>
    </section>
  )
}
