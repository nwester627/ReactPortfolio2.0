import discordBot from "../public/utilities/images/discordBot.png";
import inventoryManagementSystem from "../public/utilities/images/inventorymanagementproject.png";
import videoGames from "../public/utilities/images/videogames.jpeg";
import webDeveloper from "../public/utilities/images/webdeveloper.jpg";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Projects() {
  return (
    <div>
      <h3 className="text-5xl py-4 text-center 2xl:text-6xl">
        Projects I've Worked On
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-4">
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
          <Image className="rounded-t-lg min-h-44" src={discordBot} alt="" />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Discord Bot
            </h5>
            <p className="mb-3 font-normal text-rose">
              This bot was built using <a className="text-teal">Python</a>. The
              bot allows for moderation of users, media playback, making server
              announcements, and fun easter eggs for my friends! This was my
              first project in <a className="text-teal">Python</a>.
            </p>
            <a
              href="https://github.com/nwester627/discordBot"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg hover:bg-teal"
            >
              Source Code
              <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
            </a>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
          <Image
            className="rounded-t-lg max-h-44"
            src={inventoryManagementSystem}
            alt=""
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Inventory Tracker
            </h5>
            <p className="mb-3 font-normal text-rose">
              This project was written mainly in{" "}
              <a className="text-teal">Java</a>, but I used{" "}
              <a className="text-teal">JavaFX</a> to design and implement the
              GUI. The user is able to add parts, create products, search,
              delete, save and edit items from the management system.
            </p>
            <a
              href="https://github.com/nwester627/schoolProject"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg hover:bg-teal"
            >
              Source Code
              <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
            </a>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
          <Image className="rounded-t-lg max-h-44" src={videoGames} alt="" />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Video Game Royale
            </h5>
            <p className="mb-3 font-normal text-rose">
              This project is currently in production! This will be developed in
              <a className="text-teal"> JavaScript</a> and{" "}
              <a className="text-teal">React</a>. I am hoping to have this out
              in the near future. Check back soon for more updates!
            </p>
            <a
              aria-disabled="true"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg hover:bg-teal hover:cursor-not-allowed"
            >
              Coming Soon!
              <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
            </a>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
          <Image className="rounded-t-lg max-h-44" src={webDeveloper} alt="" />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Portfolio Website
            </h5>
            <p className="mb-3 font-normal text-rose">
              This was a complete revamp of my old portfolio. I wanted to
              demonstrate my growth as a developer from 2 years ago. I used{" "}
              <a className="text-teal">React</a>,{" "}
              <a className="text-teal">Tailwind CSS</a>,{" "}
              <a className="text-teal">HTML</a>, and{" "}
              <a className="text-teal">JavaScript</a>.
            </p>
            <a
              href="https://github.com/nwester627/ReactPortfolio2.0"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg hover:bg-teal"
            >
              Source Code
              <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
