import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useRouter } from "next/router";
import logoImg from "../public/assets/Agus.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");

  const router = useRouter();

  useEffect(() => {
    if (!router.asPath.includes("#") && router.asPath.includes("projects")) {
      setNavBg("transparent");
      setLinkColor("#ecf0f3");
    } else {
      setNavBg("#ecf0f3");
      setLinkColor("#1f2937");
    }
  }, [router]);

  const handleNav = (status: boolean) => {
    setNav(status);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100]"
          : "fixed w-full h-20 z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href={"/"}>
          <Image src={logoImg} alt="/" width={125} height={50} />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <Link href={"/"}>
              <li className="ml-10 text-sm uppercase hover:border-b hover:mb-[-1px]">
                Home
              </li>
            </Link>
            <Link href={"/#about"}>
              <li className="ml-10 text-sm uppercase hover:border-b hover:mb-[-1px]">
                About
              </li>
            </Link>
            <Link href={"/#skills"}>
              <li className="ml-10 text-sm uppercase hover:border-b hover:mb-[-1px]">
                Skills
              </li>
            </Link>
            <Link href={"/#projects"}>
              <li className="ml-10 text-sm uppercase hover:border-b hover:mb-[-1px]">
                Projects
              </li>
            </Link>
            <Link href={"/#contact"}>
              <li className="ml-10 text-sm uppercase hover:border-b hover:mb-[-1px]">
                Contact
              </li>
            </Link>
          </ul>
          <div onClick={() => handleNav(true)} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 ease-in duration-500"
          }
        >
          <div>
            <div className="flex items-center justify-between w-full">
              <Image src={logoImg} alt="/" width={87} height={35} />
              <div
                onClick={() => handleNav(false)}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose size={25} />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">
                Let&apos;s build something legendary together
              </p>
            </div>
          </div>
          <div className="py-4 flex-col">
            <ul className="uppercase">
              <Link href={"/"} onClick={() => handleNav(false)}>
                <li className="py-4 text-sm">Home</li>
              </Link>
              <Link href={"/#about"} onClick={() => handleNav(false)}>
                <li className="py-4 text-sm">About</li>
              </Link>
              <Link href={"/#skills"} onClick={() => handleNav(false)}>
                <li className="py-4 text-sm">Skills</li>
              </Link>
              <Link href={"/#projects"} onClick={() => handleNav(false)}>
                <li className="py-4 text-sm">Projects</li>
              </Link>
              <Link href={"/#contact"} onClick={() => handleNav(false)}>
                <li className="py-4 text-sm">Contact</li>
              </Link>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let&apos;s connect
              </p>
              <div className="flex justify-between items-center my-4 w-full sm:w-[80%]">
                <div
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/muchamad-agus-hermawan/"
                    )
                  }
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <FaLinkedinIn />
                </div>
                <div
                  onClick={() =>
                    window.open("https://github.com/muchamadagush/")
                  }
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <FaGithub />
                </div>
                <div
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/muchamadagushermawan/"
                    )
                  }
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                >
                  <AiFillInstagram />
                </div>
                <Link href={`/#contact`} onClick={() => handleNav(false)}>
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <BsFillPersonLinesFill />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
