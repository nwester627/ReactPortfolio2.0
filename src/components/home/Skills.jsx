import {
  FaReact,
  FaPhp,
  FaLaravel,
  FaHtml5,
  FaCss3,
  FaPython,
} from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

import { useTheme } from "@/context/ThemeContext";

export default function Skills() {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <div>
        <h3
          className={`text-5xl py-4 text-center 2xl:text-6xl mb-8 ${
            isDarkMode ? "text-light-gray" : "text-light-text"
          }`}
        >
          Technical Skills
        </h3>
        <div className="hidden md:flex flex-wrap justify-center gap-4 text-lavender px-4">
          <SiJavascript className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <SiTypescript className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <FaReact className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <FaPhp className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <FaLaravel className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <FaHtml5 className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <FaCss3 className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <FaPython className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <GrMysql className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
          <SiTailwindcss className="size-16 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 lg:size-20" />
        </div>
      </div>
      <div
        className={`text-center text-md leading-8 py-4 text-balance 2xl:text-xl ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        <p>
          Full Stack Developer with 3 years of experience using
          <a
            className={`${isDarkMode ? "text-lavender" : "text-light-primary"}`}
          >
            {" "}
            JavaScript/TypeScript
          </a>
          ,{" "}
          <a
            className={`${isDarkMode ? "text-lavender" : "text-light-primary"}`}
          >
            React
          </a>
          ,{" "}
          <a
            className={`${isDarkMode ? "text-lavender" : "text-light-primary"}`}
          >
            PHP
          </a>
          ,{" "}
          <a
            className={`${isDarkMode ? "text-lavender" : "text-light-primary"}`}
          >
            Laravel
          </a>
          ,{" "}
          <a
            className={`${isDarkMode ? "text-lavender" : "text-light-primary"}`}
          >
            HTML
          </a>
          , and{" "}
          <a
            className={`${isDarkMode ? "text-lavender" : "text-light-primary"}`}
          >
            CSS
          </a>
          . While working for MediaNews Group, I built key features for the
          Reader Dashboard to enhance user experience such as profile
          customization, implementation of free trial and complementary
          subscriptions, login management, and an overhaul to our newsletter
          system. At Inside Real Estate I was solely responsible for the Real
          Contact product, a lead-gen tool used by thousands of realtors
          nationwide. Skilled in both front-end and back-end development.
        </p>
      </div>
    </div>
  );
}
