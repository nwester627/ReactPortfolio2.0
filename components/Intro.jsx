import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import portrait from "../public/utilities/images/portrait.png";
import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";

export default function Intro() {
  return (
    <div>
      <div className="text-center p-10 drop-shadow-2xl">
        <h2 className="text-5xl py-2 font-medium animate-fade-down animate-duration-1000 animate-ease-linear 2xl:text-6xl">
          Nicolas Wester
        </h2>
        <h3 className="text-2xl py-2 font-medium text-teal 2xl:text-3xl">
          <Typewriter
            words={["Software Engineer", "React Enthusiast", "WGU Student"]}
            loop={false}
            cursor={true}
            deleteSpeed={100}
            typeSpeed={100}
            delaySpeed={500}
            cursorBlinking={false}
          />
        </h3>
      </div>
      <div className="relative mx-auto w-full max-w-4xl">
        <div className="md:flex md:flex-col md:items-center md:justify-center">
          <div className="relative mx-auto w-96 h-96 overflow-hidden md:h-96 md:w-1/2 rounded-full">
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
      <div className="flex justify-center rounded-md pt-8">
        <a
          className="items-center px-4 py-4 text-xl font-medium !text-rose bg-black border border-teal rounded-s-lg hover:cursor-pointer hover:bg-teal 2xl:px-8 2xl:text-2xl"
          href="https://www.linkedin.com/in/nicolaswester/"
        >
          <button type="button">
            <FaLinkedin className="w-3 h-3 me-2 inline-flex" />
            LinkedIn
          </button>
        </a>
        <a
          className="items-center px-4 py-4 text-xl font-medium !text-rose bg-black border-t border-b border-teal hover:cursor-pointer hover:bg-teal 2xl:py-4 2xl:px-8 2xl:text-2xl"
          href="https://github.com/nwester627"
        >
          <button type="button">
            <FaGithubSquare className="w-3 h-3 me-2 inline-flex" />
            GitHub
          </button>
        </a>
        <a
          className="inline-flex items-center px-4 py-2 text-xl font-medium !text-rose bg-black border border-teal rounded-e-lg hover:cursor-pointer hover:bg-teal 2xl:px-8 2xl:text-2xl"
          href="https://drive.google.com/file/d/1vKD4vqVRbWKr9wGxQc8uhWt8J0ufKdPQ/view?usp=sharing"
        >
          <button type="button">
            <FaCloudDownloadAlt className="w-3 h-3 me-2 inline-flex" />
            Resume
          </button>
        </a>
      </div>
      <h4 className="text-xl pt-8 pb-4 font-medium text-center 2xl:text-3xl">
        A Little Bit About Me
      </h4>
      <p className="text-md px-4 text-center text-balance 2xl:text-xl">
        Hi there! My name is Nicolas Wester. I have been developing software
        professionally for 4 years and an additional 2 in my personal life. I
        love programming and solving the puzzles that come along with it.
        Outside of programming, I'm a huge nerd. I enjoy video games, anime, and
        hanging out with my three cats.
      </p>
    </div>
  );
}
