import { useLang } from '../context/LangContext'
import { motion } from 'framer-motion'

import banovit from '../assets/brands/banovit.png'
import meravili from '../assets/brands/meravili.png'
import montana from '../assets/brands/montana.png'
import soyila from '../assets/brands/soyila.png'
import chopin from '../assets/brands/chopin.png'
import hexagon from '../assets/brands/hexagon.png'
import brandsBg from '../assets/hero.jpg'

const showAllText = ['عرض الكل', 'Voir tout', 'Show All']

const brands = [
  {
    key: 'banovit',
    area: 'banovit',
    title: ['Banovit', 'Banovit', 'Banovit'],
    subtitle: ['Vitamins Premix', 'Vitamines Prémélangées', 'Vitamins Premix'],
    logo: banovit,
    bg: 'bg-gray-100',
    btn: true,
    btnColor: 'bg-gray-900 text-white',
    logoShadow: true
  },
  {
    key: 'meravili',
    area: 'meravili',
    title: ['Meravili', 'Meravili', 'Meravili'],
    subtitle: ['فيتامينات', 'Vitamines', 'Vitamins'],
    logo: meravili,
    bg: 'bg-blue-100'
  },
  {
    key: 'montana',
    area: 'montana',
    title: ['مونتانا', 'Montana', 'Montana'],
    subtitle: ['كيك', 'Gâteau', 'Cake'],
    logo: montana,
    bg: 'bg-yellow-100',
    arDesc: 'أسهل كيك للبيت'
  },
  {
    key: 'soyila',
    area: 'soyila',
    title: ['Soy ila', 'Soy ila', 'Soy ila'],
    subtitle: ['Soya Flour', 'Farine de soja', 'Soya Flour'],
    logo: soyila,
    bg: 'bg-orange-50',
    vertical: ['Soya Flour', 'Farine de soja', 'Soya Flour']
  },
  {
    key: 'chopin',
    area: 'chopin',
    title: ['Chopin', 'Chopin', 'Chopin'],
    subtitle: ['Technologies', 'Technologies', 'Technologies'],
    logo: chopin,
    bg: 'bg-green-50'
  },
  {
    key: 'hexagon',
    area: 'hexagon',
    title: ['Hexagon', 'Hexagon', 'Hexagon'],
    subtitle: [
      'Nutritionally yours',
      'Nutritionnellement à vous',
      'Nutritionally yours'
    ],
    logo: hexagon,
    bg: 'bg-red-50',
    btn: true,
    btnColor: 'bg-red-600 text-white'
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 }
}

export default function BrandsPage () {
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const isFr = lang === 'fr'

  // عنوان الصفحة بالـ3 لغات
  const ourBrandsTitle = isAr
    ? 'علاماتنا التجارية'
    : isFr
    ? 'Nos Marques'
    : 'Our Brands'

  // اتجاه الصفحة
  const dir = isAr ? 'rtl' : 'ltr'

  return (
    <div className='min-h-screen bg-white pt-0' dir={dir}>
      {/* الهيدر بصورة */}
      <div className='w-full h-52 md:h-64 relative flex items-center justify-center bg-gradient-to-b from-white to-gray-100'>
        <img
          src={brandsBg}
          alt='Brands Hero'
          className='absolute w-full h-full object-cover top-0 left-0 opacity-75'
        />
        <div className='absolute w-full h-full bg-gradient-to-t from-white/90 to-transparent'></div>
        <h1 className='relative z-10 text-3xl md:text-4xl font-bold text-center text-gray-900'>
          {ourBrandsTitle}
        </h1>
      </div>

      {/* الجريد الرئيسي ريسبونسيف */}
      <div
        className='
          max-w-6xl mx-auto px-2 md:px-6 py-8
          grid grid-cols-1 gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          auto-rows-fr
        '
      >
        {/* Banovit (أول كارد، عريض في الديسكتوب) */}
        <motion.div
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.7, delay: 0 }}
          whileHover={{
            scale: 1.035,
            boxShadow: '0 12px 32px 0 rgba(90,90,90,0.16)'
          }}
          className={`
            ${brands[0].bg}
            rounded-xl shadow-md flex flex-col justify-between p-6
            col-span-1 sm:col-span-2 lg:col-span-2
            row-span-1
            min-h-[210px]
            transition-all duration-300
          `}
        >
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
            <div>
              <span className='text-gray-500 text-base font-medium mb-1 block'>
                {brands[0].subtitle[isAr ? 0 : isFr ? 1 : 2]}
              </span>
              <span className='text-gray-800 font-bold text-2xl md:text-3xl block mb-3'>
                {brands[0].title[isAr ? 0 : isFr ? 1 : 2]}
              </span>
              {brands[0].btn && (
                <motion.button
                  whileHover={{ backgroundColor: '#232323' }}
                  transition={{ duration: 0.18 }}
                  className='flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg mt-1 hover:bg-gray-800 transition text-sm font-semibold'
                >
                  {showAllText[isAr ? 0 : isFr ? 1 : 2]}
                  <span
                    className={`inline-block text-xl ${
                      isAr ? 'rotate-180' : ''
                    }`}
                  >
                    &rarr;
                  </span>
                </motion.button>
              )}
            </div>
            <div className='w-full md:w-1/2 flex items-center justify-center md:justify-end mt-5 md:mt-0'>
              <img
                src={brands[0].logo}
                alt={brands[0].title[isAr ? 0 : isFr ? 1 : 2]}
                className='h-20 md:h-24 object-contain drop-shadow-lg'
                style={{
                  filter: 'drop-shadow(0px 13px 22px rgba(0,0,0,0.18))'
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* باقي الكروت */}
        {brands.slice(1).map((brand, idx) => (
          <motion.div
            key={brand.key}
            variants={cardVariants}
            initial='hidden'
            animate='visible'
            transition={{ duration: 0.7, delay: 0.13 + idx * 0.09 }}
            whileHover={{
              scale: 1.035,
              boxShadow: '0 12px 32px 0 rgba(90,90,90,0.16)'
            }}
            className={`
              ${brand.bg}
              rounded-xl shadow-md flex flex-col justify-between p-6 min-h-[170px]
              transition-all duration-300
            `}
          >
            <span
              className={`
                font-medium text-base mb-1 capitalize
                ${brand.key === 'meravili' ? 'text-blue-700' : ''}
                ${brand.key === 'montana' ? 'text-yellow-700' : ''}
                ${brand.key === 'soyila' ? 'text-orange-700' : ''}
                ${brand.key === 'chopin' ? 'text-green-700' : ''}
                ${brand.key === 'hexagon' ? 'text-red-700' : ''}
              `}
            >
              {brand.subtitle[isAr ? 0 : isFr ? 1 : 2]}
            </span>
            <span className='text-gray-800 font-bold text-xl mb-1'>
              {brand.title[isAr ? 0 : isFr ? 1 : 2]}
            </span>
            {/* محتوى الكارد */}
            <div
              className={`
              flex-1 flex ${
                brand.key === 'montana'
                  ? 'flex-col justify-end items-center'
                  : 'items-center justify-center'
              }
              ${
                brand.key === 'hexagon'
                  ? 'flex-col items-center justify-end'
                  : ''
              }
              ${brand.key === 'soyila' ? 'gap-1' : ''}
            `}
            >
              <img
                src={brand.logo}
                alt={brand.title[isAr ? 0 : isFr ? 1 : 2]}
                className={`
                  ${brand.key === 'montana' ? 'h-12 md:h-16' : ''}
                  ${
                    brand.key === 'soyila' || brand.key === 'chopin'
                      ? 'h-12 md:h-14'
                      : ''
                  }
                  ${brand.key === 'hexagon' ? 'h-14 md:h-16' : ''}
                  ${brand.key === 'meravili' ? 'h-14 md:h-20' : ''}
                  object-contain
                `}
              />
              {/* vertical text (desktop فقط) */}
              {brand.vertical && (
                <>
                  <span
                    className='text-green-700 font-bold text-xs hidden md:inline'
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      letterSpacing: '.09em'
                    }}
                  >
                    {brand.vertical[isAr ? 0 : isFr ? 1 : 2]}
                  </span>
                  <span
                    className='text-green-700 font-bold text-xs md:hidden'
                    style={{ marginInlineStart: 8 }}
                  >
                    {brand.vertical[isAr ? 0 : isFr ? 1 : 2]}
                  </span>
                </>
              )}
            </div>
            {/* زرار show all لو الكارد فيه btn */}
            {brand.btn && (
              <motion.button
                whileHover={{
                  backgroundColor:
                    brand.key === 'hexagon' ? '#bf212f' : '#232323'
                }}
                transition={{ duration: 0.18 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg mt-3 mb-2 w-fit ${brand.btnColor} hover:opacity-90 transition text-sm font-semibold`}
              >
                {showAllText[isAr ? 0 : isFr ? 1 : 2]}
                <span
                  className={`inline-block text-xl ${isAr ? 'rotate-180' : ''}`}
                >
                  &rarr;
                </span>
              </motion.button>
            )}
            {/* وصف عربي فقط لكارت مونتانا */}
            {isAr && brand.arDesc && (
              <span className='text-red-700 text-md font-bold mt-1'>
                {brand.arDesc}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
