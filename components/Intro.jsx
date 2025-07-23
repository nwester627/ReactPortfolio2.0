import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import portrait from "../public/utilities/images/portrait.png";
import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";
import GlassButton from "./GlassButton";

export default function Intro() {
  return (
    <div>
      <div className="text-center p-10 drop-shadow-2xl">
        <h2 className="text-5xl py-2 font-medium animate-fade-down animate-duration-1000 animate-ease-linear 2xl:text-6xl">
          Nicolas Wester
        </h2>
        <h3 className="text-2xl py-2 font-medium text-lavender 2xl:text-3xl">
          <Typewriter
            words={["Full Stack Developer", "React Enthusiast", "WGU Alumni"]}
            loop={false}
            cursor={true}
            deleteSpeed={100}
            typeSpeed={100}
            delaySpeed={500}
            cursorBlinking={false}
          />
        </h3>
      </div>
      <div className="my-12 flex justify-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 via-blue-500 to-purple-600 opacity-30 filter blur-3xl -z-10"></div>
          <div
            className="relative w-full h-full overflow-hidden rounded-full border-4 border-white/20 shadow-lg shadow-black/40"
            style={{
              boxShadow: `inset 0 0 13.5px 9px rgba(5, 22, 34, 0.45),
                          inset 0 0 22.5px 18px rgba(5, 22, 34, 0.27)`,
            }}
          >
            <Image
              src={portrait}
              layout="fill"
              objectFit="cover"
              alt="Portrait"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center rounded-md pt-8 gap-8">
        <GlassButton
          href="https://www.linkedin.com/in/nicolaswester/"
          icon={<FaLinkedin className="inline-flex" />}
        >
          LinkedIn
        </GlassButton>
        <div className="flex justify-center">
          <GlassButton
            href="https://github.com/nwester627"
            icon={<FaGithubSquare className="inline-flex" />}
          >
            Github
          </GlassButton>
        </div>
        <GlassButton
          href="https://drive.google.com/file/d/1b3jnUc-d9EwklABf-nZEC3sDf8QXty_v/view?usp=sharing"
          icon={<FaCloudDownloadAlt className="inline-flex" />}
        >
          Resume
        </GlassButton>
      </div>
      <h4 className="text-xl pt-8 pb-4 font-medium text-center 2xl:text-3xl">
        A Little Bit About Me
      </h4>
      <p className="w-11/12 sm:w-9/12 mx-auto text-md px-4 text-center text-balance 2xl:text-xl">
        Hi there! My name is Nicolas Wester. I have been developing software
        professionally for 3 years and an additional 2 in my personal life. I
        love programming and solving the puzzles that come along with it.
        Outside of programming, I'm a huge nerd. I enjoy video games, anime, and
        hanging out with my three cats.
      </p>
    </div>
  );
}
