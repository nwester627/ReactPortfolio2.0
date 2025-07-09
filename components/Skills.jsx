import {
  FaReact,
  FaPhp,
  FaLaravel,
  FaHtml5,
  FaCss3,
  FaPython,
  FaAngular,
} from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export default function Skills() {
  return (
    <div>
      <div>
        <h3 className="text-5xl py-4 text-center text-rose 2xl:text-6xl">
          Technical Skills
        </h3>
        <div className="flex flex-row justify-center text-teal">
          <SiJavascript className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <SiTypescript className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaReact className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaPhp className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaLaravel className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaHtml5 className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaCss3 className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaPython className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <FaAngular className="px-2 transition ease=out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <GrMysql className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
          <SiTailwindcss className="px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100 md:size-20" />
        </div>
      </div>
      <div className="text-center text-md leading-8 py-4 text-rose text-balance 2xl:text-xl">
        <p>
          Full Stack Developer with 4 years of experience using
          <a className="text-teal">JavaScript/TypeScript</a>,{" "}
          <a className="text-teal">React</a>, <a className="text-teal">PHP</a>,{" "}
          <a className="text-teal">Laravel</a>,{" "}
          <a className="text-teal">HTML</a>, and{" "}
          <a className="text-teal">CSS</a>. While working for MediaNews Group, I
          built key features for the Reader Dashboard to enhance user experience
          such as profile customization, implementation of free trial and
          complementary subscriptions, login management, and an overhaul to our
          newsletter system. At Inside Real Estate I was solely responsible for
          the Real Contact product, a lead-gen tool used by thousands of
          realtors nationwide. Skilled in both front-end and back-end
          development.
        </p>
      </div>
    </div>
  );
}
