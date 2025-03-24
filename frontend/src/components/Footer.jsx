import React from 'react';
import { FaCcDiscover, FaCcMastercard, FaCcPaypal, FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GiDolphin } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Brand & Tagline */}
        <div className="text-center mb-8">
          <div className="flex-shrink-0">
            <Link to="/" title="" className="flex items-center justify-center gap-2">
              <GiDolphin className="text-4xl " />
              <span className="w-auto h-8 lg:h-10 inline-block  font-extrabold text-3xl">
                Dolphin
              </span>
            </Link>
          </div>
          <p className="text-gray-400 mt-2">
            Laoreet semper est ligula et netus imperdiet duis eros vel lectus maximus hendrerit taciti est elementum porta.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-wrap justify-between gap-8 py-4 border-t-2 border-theme-color">
          <div>
            <p className="text-gray-300">No: 58 A, East Madison Street,</p>
            <p className="text-gray-300">Baltimore, MD, USA 4508</p>
          </div>
          <div>
            <p className="text-gray-300">Mail us everyday:</p>
            <p className="text-white">info@example.com</p>
          </div>
          <div>
            <p className="text-gray-300">Call us Anytime:</p>
            <p className="text-white">000 - 123 - 456789</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mb-8 border-y-2 py-4 border-theme-color">
          <a href="#" className="hover:text-gray-400">HOME</a>
          <a href="#" className="hover:text-gray-400">PRODUCT</a>
          <a href="#" className="hover:text-gray-400">SHOP</a>
          <a href="#" className="hover:text-gray-400">BLOG</a>
          <a href="#" className="hover:text-gray-400">PAGES</a>
          <a href="#" className="hover:text-gray-400">BUY AAHCA</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className="hover:text-gray-400"><FaXTwitter />
          </a>
          <a href="#" className="hover:text-gray-400"><FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-400"><FaPinterestP />
          </a>
          <a href="#" className="hover:text-gray-400"><FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-400"><IoLogoYoutube />
          </a>
        </div>

        {/* Payment Method Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {/* <RiVisaLine /> */}
          <FaCcMastercard className='text-4xl'/>  
          <FaCcPaypal className='text-4xl'/>
          <FaCcDiscover className='text-4xl'/>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500">
          © Designthemes all rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
