// src/components/Footer.jsx
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa'

export default function Footer () {
  return (
    <footer className='bg-[#f9f9fa] border-t border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row md:justify-between gap-8'>
        {/* Logo & Contact */}
        <div>
          <h2 className='font-bold text-xl mb-3'>Chemitec</h2>
          <div className='mb-2 font-semibold text-[#364152] text-[15px]'>
            Contact us
          </div>
          <div className='mb-1 text-[15px] text-[#6f6f6f]'>
            sweetdeli@gmail.com
          </div>
          <div className='mb-1 text-[15px] text-[#6f6f6f]'>+1-2345-6789</div>
          <div className='mb-4 text-[15px] text-[#6f6f6f]'>
            123 Ave, New York, USA
          </div>
          <div className='flex gap-3 text-[#364152] text-lg'>
            <a href='#'>
              <FaFacebookF className='hover:text-[#1877f2]' />
            </a>
            <a href='#'>
              <FaLinkedinIn className='hover:text-[#0a66c2]' />
            </a>
            <a href='#'>
              <FaTwitter className='hover:text-[#1da1f2]' />
            </a>
            <a href='#'>
              <FaInstagram className='hover:text-[#e1306c]' />
            </a>
          </div>
        </div>
        {/* Products */}
        <div>
          <div className='font-semibold text-[#364152] mb-3 text-[15px]'>
            Products
          </div>
          <ul className='space-y-1 text-[15px] text-[#6f6f6f]'>
            <li>
              <a href='#'>Auctor volutpat.</a>
            </li>
            <li>
              <a href='#'>Fermentum turpis.</a>
            </li>
            <li>
              <a href='#'>Mi consequat.</a>
            </li>
            <li>
              <a href='#'>Amet venenatis.</a>
            </li>
            <li>
              <a href='#'>Convallis porttitor.</a>
            </li>
          </ul>
        </div>
        {/* About */}
        <div>
          <div className='font-semibold text-[#364152] mb-3 text-[15px]'>
            About
          </div>
          <ul className='space-y-1 text-[15px] text-[#6f6f6f]'>
            <li>
              <a href='#'>Egestas vitae.</a>
            </li>
            <li>
              <a href='#'>Viverra lorem ac.</a>
            </li>
            <li>
              <a href='#'>Eget ac tellus.</a>
            </li>
            <li>
              <a href='#'>Erat nulla.</a>
            </li>
            <li>
              <a href='#'>Vulputate proin.</a>
            </li>
          </ul>
        </div>
        {/* Get the app */}
        <div>
          <div className='font-semibold text-[#364152] mb-3 text-[15px]'>
            Get the app
          </div>
          <div className='flex flex-col gap-3'>
            <a href='#'>
              <img
                className='w-36'
                src='https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg'
                alt='App Store'
              />
            </a>
            <a href='#'>
              <img
                className='w-36'
                src='https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg'
                alt='Google Play'
              />
            </a>
          </div>
        </div>
      </div>
      {/* Footer bottom */}
      <div className='border-t border-gray-100 py-3 text-[13px] flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 gap-2'>
        <div className='flex items-center gap-1 text-[#6f6f6f]'>
          <span className='material-symbols-outlined text-[17px]'>
            language
          </span>
          English
          <span className='material-symbols-outlined text-[17px]'>
            expand_more
          </span>
        </div>
        <div className='text-[#b8b8bc]'>
          Copyright © 2020. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
