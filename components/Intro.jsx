import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import portrait from "../public/utilities/images/portrait.png";
import { FaLinkedin, FaGithubSquare, FaCloudDownloadAlt } from "react-icons/fa";

export default function Intro() {
  return (
    <div>
      <div className="text-center p-10 drop-shadow-2xl">
        <h2 className="text-5xl py-2 font-medium animate-fade-down animate-duration-1000 animate-ease-linear">
          Nicolas Wester
        </h2>
        <h3 className="text-2xl py-2 font-medium text-teal">
          <Typewriter
            words={["Software Engineer", "React Enthusiast", "WGU Graduate"]}
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
        <Image src={portrait} layout="fill" objectFit="cover" alt="Portrait" />
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
    </div>
  );
}
