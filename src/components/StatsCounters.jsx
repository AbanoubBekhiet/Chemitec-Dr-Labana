import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { t, useLang } from '../context/LangContext'

const counters = [
  {
    value: 150,
    label: { en: 'Our products', ar: 'منتجاتنا', fr: 'Nos produits' }
  },
  {
    value: 220,
    label: { en: 'Our customers', ar: 'عملائنا', fr: 'Nos clients' }
  },
  {
    value: 100,
    label: { en: 'Our Team', ar: 'فريق العمل', fr: 'Notre équipe' }
  },
  {
    value: 30,
    label: {
      en: 'Years of experience',
      ar: 'سنة خبرة',
      fr: "Années d'expérience"
    }
  }
]

export default function StatsCounters () {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4
  })

  const { lang } = useLang()
  const fontClass =
    lang === 'ar' ? 'font-ar' : lang === 'fr' ? 'font-fr' : 'font-en'
  const direction = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <section
      ref={ref}
      className={`w-full flex justify-center  bg-white`}
      dir={direction}
    >
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl'>
        {counters.map((counter, idx) => (
          <div key={idx} className={`flex flex-col items-center ${fontClass}`}>
            <span
              className='
                font-ar font-bold
                text-[40px] md:text-[64px]
                leading-[100%]
                tracking-[0.5%]
                text-center block
              '
            >
              +{inView ? <CountUp end={counter.value} duration={1.7} /> : 0}
            </span>
            <span
              className='
                font-poppins font-normal
                text-[16px] md:text-[24px]
                leading-[32px]
                tracking-[-1%]
                text-center block
                text-text-secondary
                mt-2
              '
            >
              {t(counter.label, lang)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
