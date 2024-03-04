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
          <SiTailwindcss className="size-20 px-2 transition ease-out hover:-translate-y-1 hover:scale-110 duration-100" />
        </div>
      </div>
      <div className="text-center text-xl leading-8 py-4 text-rose text-balance">
        <p>
          I have been programming in <a className="text-teal"> HTML </a> and{" "}
          <a className="text-teal">CSS</a> for about 4 years now between
          professional and personal projects. In my 2 year tenure at
          BoomTown/Inside Real Estate, I was the sole developer for our
          RealContact product, a real time communication application that
          facilitated dialogue and transactions between leads and Real Estate
          agents utilizing the Twilio <a className="text-teal">API</a>. The
          Front End was developed in{" "}
          <a className="text-teal">JavaScript/TypeScript</a>,{" "}
          <a className="text-teal">Angular</a>, and
          <a className="text-teal"> React</a>. The Back End was developed in{" "}
          <a className="text-teal">PHP </a>
          and <a className="text-teal">Laravel</a>. We also utilized a{" "}
          <a className="text-teal">MySQL </a>
          database to track leads, customer data, housing information, etc.
          Beyond my programming experience, I also created and led the Training
          Development Team within BoomTown to help onboard and train new
          developers.
        </p>
      </div>
    </div>
  );
}
