import {
  FaReact,
  FaPhp,
  FaLaravel,
  FaHtml5,
  FaCss3,
  FaPython,
  FaAngular,
} from "react-icons/fa";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export default function Skills() {
  return (
    <div>
      <div>
        <h3 className="text-6xl py-4 text-center text-rose">
          Technical Skills
        </h3>
        <div className="flex flex-row justify-center text-teal">
          <SiJavascript className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <SiTypescript className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaReact className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaPhp className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaLaravel className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaHtml5 className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaCss3 className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaPython className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
          <FaAngular className="size-20 px-2 transition ease=out hover:-translate-y-1 hover:scale-110 duration-100" />
          <GrMysql className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
        </div>
      </div>
      <div className="text-center text-xl leading-8 py-4 text-rose">
        <p>
          I have acquired these skills through years of education and also
          through practical work experience.{" "}
        </p>
        <p>
          In my previous role at BoomTown, I worked on a TypeScript/JavaScript
          FrontEnd
        </p>{" "}
        <p>
          that utilized both React and Angular. The BackEnd was designed in PHP
          and Laravel.
        </p>{" "}
        <p>I also took advantage of a MySQL database.</p>{" "}
        <p>
          Throughout my school I learned other practical skills such as Python,
          HTML, and CSS.
        </p>
      </div>
    </div>
  );
}
