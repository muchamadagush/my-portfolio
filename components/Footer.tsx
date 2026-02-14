/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import Link from 'next/link'
import { AiFillInstagram } from 'react-icons/ai'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-[#1f2937] text-gray-300 py-8">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Agus H.
            </h3>
            <p className="text-sm leading-relaxed">
              Fullstack Web Developer specializing in building exceptional digital experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="hover:text-[#5651e5] transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-[#5651e5] transition-colors duration-300">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-[#5651e5] transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#5651e5] transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#5651e5] transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/muchamad-agus-hermawan/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-700 p-3 cursor-pointer hover:bg-[#5651e5] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://github.com/muchamadagush/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-700 p-3 cursor-pointer hover:bg-[#5651e5] transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.instagram.com/muchamadagushermawan/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-700 p-3 cursor-pointer hover:bg-[#5651e5] transition-colors duration-300"
                aria-label="Instagram"
              >
                <AiFillInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Muchamad Agus Hermawan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
