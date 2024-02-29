import Head from "next/head";
import { React } from "react";
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
import discordCode from "../public/utilities/images/discordCode.png";
import spaceBackground from "../public/utilities/images/space.png";
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

      <main className="bg-space text-rose font-poppins">
        <section className="min-h-screen">
          <nav className="py-8 mb-12 flex justify-between px-8">
            <span>
              <FaHome className=" cursor-pointer size-16 text-teal" />
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
                deleteSpeed={50}
                typeSpeed={50}
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
              className="items-center px-6 py-4 text-sm font-medium !text-space bg-teal border border-rose rounded-s-lg hover:cursor-pointer"
            >
              <a href="https://www.linkedin.com/in/nicolaswester/">
                <FaLinkedin className="w-3 h-3 me-2 inline-flex" />
                LinkedIn
              </a>
            </button>
            <button
              type="button"
              className="items-center px-6 py-4 text-sm font-medium !text-space bg-teal border-t border-b border-rose hover:cursor-pointer"
            >
              <a href="https://github.com/nwester627">
                <FaGithubSquare className="w-3 h-3 me-2 inline-flex" />
                GitHub
              </a>
            </button>
            <button
              type="button"
              className="inline-flex items-center px-6 py-4 text-sm font-medium !text-space bg-teal border border-rose rounded-e-lg hover:cursor-pointer"
            >
              <a href="https://nicolaswesterresume.tiiny.site/">
                <FaCloudDownloadAlt className="w-3 h-3 me-2 inline-flex" />
                Resume
              </a>
            </button>
          </div>
        </section>
        <section className="rounded bg-dark-blueish w-1/2 m-auto mt-8 py-8">
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
            <div class="max-w-sm bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
              <a href="https://github.com/nwester627/discordBot">
                <Image class="rounded-t-lg" src={discordCode} alt="" />
              </a>
              <div className="p-5">
                <a href="https://github.com/nwester627/discordBot">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-teal">
                    Discord Bot
                  </h5>
                </a>
                <p className="mb-3 font-normal text-teal">
                  This bot was built using Python. The bot allows for moderation
                  of users, media playback, making server announcements, and fun
                  easter eggs for my friends!
                </p>
                <a
                  href="https://github.com/nwester627/discordBot"
                  class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-space rounded-lg"
                >
                  Source Code
                  <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
