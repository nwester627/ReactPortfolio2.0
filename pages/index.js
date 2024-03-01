import Head from "next/head";
import { React, useState } from "react";
import {
  FaLinkedin,
  FaGithubSquare,
  FaReact,
  FaPhp,
  FaLaravel,
  FaHtml5,
  FaCss3,
  FaPython,
  FaAngular,
  FaHome,
  FaCloudDownloadAlt,
  FaArrowRight,
} from "react-icons/fa";
import portrait from "../public/utilities/images/portrait.png";
import discordBot from "../public/utilities/images/discordBot.png";
import inventoryManagementSystem from "../public/utilities/images/inventorymanagementproject.png";
import videoGames from "../public/utilities/images/videogames.jpeg";
import webDeveloper from "../public/utilities/images/webdeveloper.jpg";
import recommendation1 from "../public/utilities/images/JaredSmithRecommendation.png";
import recommendation2 from "../public/utilities/images/TylerSorensonRecommendation.png";
import recommendation3 from "../public/utilities/images/KennyRichmondRecommendation.png";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nicolas Wester Portfolio</title>
      </Head>

      <main className="bg-gradient-to-b from-space to to-black text-rose font-poppins">
        <section className="min-h-screen">
          <nav className="py-8 mb-12 flex justify-between px-8">
            <span>
              <FaHome className=" cursor-pointer size-16 text-teal hover:animate-wiggle hover:animate-infinite" />
            </span>
          </nav>
          <div className="text-center p-10 drop-shadow-2xl">
            <h2 className="text-5xl py-2 font-medium animate-fade-down animate-duration-1000 animate-ease-linear">
              Nicolas Wester
            </h2>
            <h3 className="text-2xl py-2 font-medium text-teal">
              <Typewriter
                words={[
                  "Software Engineer",
                  "React Enthusiast",
                  "WGU Graduate",
                ]}
                loop={false}
                cursor={true}
                deleteSpeed={100}
                typeSpeed={100}
                delaySpeed={500}
                cursorBlinking={false}
              />
            </h3>

            <p className="text-md px-4">
              Experienced Software Engineer that specalizes in
              JavaScript/TypeScript, React, Angular, PHP, Laravel, and more!
            </p>
          </div>
          <div className="relative mx-auto w-96 h-96 overflow-hidden mt-4 md:h-96 md:w-1/2 rounded">
            <Image
              src={portrait}
              layout="fill"
              objectFit="cover"
              alt="Portrait"
            />
          </div>
          <div className="flex justify-center rounded-md pt-8">
            <button
              type="button"
              className="items-center px-6 py-4 text-xl font-medium !text-rose bg-black border border-teal rounded-s-lg hover:cursor-pointer hover:bg-teal"
            >
              <a href="https://www.linkedin.com/in/nicolaswester/">
                <FaLinkedin className="w-3 h-3 me-2 inline-flex" />
                LinkedIn
              </a>
            </button>
            <button
              type="button"
              className="items-center px-6 py-4 text-xl font-medium !text-rose bg-black border-t border-b border-teal hover:cursor-pointer hover:bg-teal"
            >
              <a href="https://github.com/nwester627">
                <FaGithubSquare className="w-3 h-3 me-2 inline-flex" />
                GitHub
              </a>
            </button>
            <button
              type="button"
              className="inline-flex items-center px-6 py-4 text-xl font-medium !text-rose bg-black border border-teal rounded-e-lg hover:cursor-pointer hover:bg-teal"
            >
              <a href="https://nicolaswesterresume.tiiny.site/">
                <FaCloudDownloadAlt className="w-3 h-3 me-2 inline-flex" />
                Resume
              </a>
            </button>
          </div>
        </section>
        <section className="rounded bg-space w-1/2 m-auto mt-8 py-8">
          <div>
            <h3 className="text-5xl py-4 text-center text-rose">
              Technical Skills
            </h3>
            <div className="flex flex-row justify-center text-teal">
              <SiJavascript className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <SiTypescript className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaReact className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaPhp className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaLaravel className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaHtml5 className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaCss3 className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaPython className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
              <FaAngular className="size-16 px-2 transition ease=out hover:-translate-y-1 hover:scale-110 duration-100" />
              <GrMysql className="size-16 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
            </div>
          </div>
          <div className="text-center text-md leading-8 py-4 text-rose">
            <p>
              I have acquired these skills through years of education and also
              through practical work experience.{" "}
            </p>
            <p>
              In my previous role at BoomTown, I worked on a
              TypeScript/JavaScript FrontEnd
            </p>{" "}
            <p>
              that utilized both React and Angular. The BackEnd was designed in
              PHP and Laravel.
            </p>{" "}
            <p>I also took advantage of a MySQL database.</p>{" "}
            <p>
              Throughout my school I learned other practical skills such as
              Python, HTML, and CSS.
            </p>
          </div>
        </section>
        <section className="rounded bg-space w-1/2 m-auto mt-8 py-8">
          <div>
            <h3 className="text-5xl py-4 text-center">
              Projects I've Worked On
            </h3>
            <div className="grid grid-cols-2">
              <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
                <Image
                  className="rounded-t-lg max-h-48"
                  src={discordBot}
                  alt=""
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Discord Bot
                  </h5>
                  <p className="mb-3 font-normal text-rose">
                    This bot was built using Python. The bot allows for
                    moderation of users, media playback, making server
                    announcements, and fun easter eggs for my friends! This was
                    my first project in Python.
                  </p>
                  <a
                    href="https://github.com/nwester627/discordBot"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg"
                  >
                    Source Code
                    <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                  </a>
                </div>
              </div>
              <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
                <Image
                  className="rounded-t-lg max-h-[10.5rem]"
                  src={inventoryManagementSystem}
                  alt=""
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Inventory Tracker
                  </h5>
                  <p className="mb-3 font-normal text-rose">
                    This project was written mainly in Java, but I used JavaFX
                    to design and implement the GUI. The user is able to add
                    parts, create products, search, delete, save and edit items
                    from the management system.
                  </p>
                  <a
                    href="https://github.com/nwester627/schoolProject"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg"
                  >
                    Source Code
                    <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                  </a>
                </div>
              </div>
              <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-16">
                <Image
                  className="rounded-t-lg max-h-48"
                  src={videoGames}
                  alt=""
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Video Game Royale
                  </h5>
                  <p className="mb-3 font-normal text-rose">
                    I haven't actually made this. Everything you see here is
                    placeholder text. This is my next project. It will probably
                    be in JS. Blah blah blah placeholder text. This is a place
                    holder.
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg"
                  >
                    Source Code
                    <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                  </a>
                </div>
              </div>
              <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-16">
                <Image
                  className="rounded-t-lg max-h-[11.5rem]"
                  src={webDeveloper}
                  alt=""
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Portfolio Website
                  </h5>
                  <p className="mb-3 font-normal text-rose">
                    Literally the website you are looking at. This is it. You
                    are looking at it. I used React, CSS, HTML, JavaScript, and
                    Tailwind. I am a big fan of Tailwind. It works great.
                  </p>
                  <a
                    href="https://github.com/nwester627/ReactPortfolio2.0"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg"
                  >
                    Source Code
                    <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rounded bg-space w-1/2 m-auto mt-8 py-8">
          <h3 className="text-5xl py-4 text-center text-rose">Testimonials</h3>
          <div className="flex flex-col justify-center mt-16">
            <Image
              className="bg-space border-rose border-[6px] rounded-lg m-auto mb-8"
              src={recommendation1}
            />
            <Image
              className="bg-space border-rose border-[6px] rounded-lg m-auto mb-8"
              src={recommendation2}
            />
            <Image
              className="bg-space border-rose border-[6px] rounded-lg m-auto"
              src={recommendation3}
            />
          </div>
        </section>
        <section className="w-1/2 mt-8 py-8 m-auto">
          <div className="text-center">
            <button className="bg-space border-rose rounded px-4 py-2 hover:bg-teal">
              Contact Me!
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
