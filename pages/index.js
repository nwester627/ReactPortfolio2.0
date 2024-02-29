import Head from "next/head";
import React from "react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import portrait from "../public/utilities/images/portrait.png";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nicolas Wester Portfolio</title>
      </Head>

      <main className="bg-gradient-to-r from-dark-greenish to-greenish text-yellowish font-poppins">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between drop-shadow-xl">
            <a href="https://nicolaswesterresume.tiiny.site/">
              <button className="bg-yellowish text-dark-greenish font-bold px-4 rounded-full ml-8 h-8 hover:animate-wiggle hover:animate-infinite">
                Resume
              </button>
            </a>
            <ul className="flex items-center px-8">
              <li className="px-4 hover:animate-wiggle hover:animate-infinite">
                <a href="https://github.com/nwester627">
                  <FaGithubSquare className="cursor-pointer size-16" />
                </a>
              </li>
              <li className="hover:animate-wiggle hover:animate-infinite">
                <a href="https://www.linkedin.com/in/nicolaswester">
                  <FaLinkedin className="cursor-pointer size-16" />
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10 drop-shadow-2xl">
            <h2 className="text-5xl py-2 font-medium animate-fade-down animate-duration-1000 animate-ease-linear">
              Nicolas Wester
            </h2>
            <h3 className="text-2xl py-2 font-medium">
              <Typewriter
                words={[
                  "Software Engineer",
                  "React Enthusiast",
                  "WGU Graduate",
                ]}
                loop={false}
                cursor={true}
                deleteSpeed={50}
                typeSpeed={50}
                delaySpeed={500}
                cursorBlinking={false}
              />
            </h3>

            <p className="text-md py-5">
              Experienced Software Engineer that specalizes in
              JavaScript/TypeScript, React, Angular, PHP, Laravel, and more!
            </p>
          </div>
          <div className="relative mx-auto rounded-full w-96 h-96 overflow-hidden mt-20 md:h-96 md:w-96 bg-dark-greenish">
            <Image
              src={portrait}
              layout="fill"
              objectFit="cover"
              alt="Portrait"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
