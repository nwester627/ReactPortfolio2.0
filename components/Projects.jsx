import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import GlassButton from "./GlassButton";

export default function Projects() {
  return (
    <div>
      <h3 className="text-5xl py-4 text-center 2xl:text-6xl">
        Projects I've Worked On
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-4">
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8 overflow-hidden">
          <Image
            className="rounded-t-lg min-h-44"
            src={"/utilities/images/discordBot.png"}
            alt=""
          />
          <div className="p-5 bg-blackish-blue">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Discord Bot
            </h5>
            <p className="mb-3 font-normal text-light-gray">
              This bot was built using <a className="text-lavender">Python</a>.
              The bot allows for moderation of users, media playback, making
              server announcements, and fun easter eggs for my friends! This was
              my first project in <a className="text-lavender">Python</a>.
            </p>
            <GlassButton
              href="https://github.com/nwester627/discordBot"
              icon={
                <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
              }
            >
              Source Code
            </GlassButton>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8 overflow-hidden">
          <Image
            className="rounded-t-lg max-h-44"
            src={"/utilities/images/inventorymanagementproject.png"}
            alt=""
          />
          <div className="p-5 bg-blackish-blue">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Inventory Tracker
            </h5>
            <p className="mb-3 font-normal text-light-gray">
              This project was written mainly in{" "}
              <a className="text-lavender">Java</a>, but I used{" "}
              <a className="text-lavender">JavaFX</a> to design and implement
              the GUI. The user is able to add parts, create products, search,
              delete, save and edit items from the management system.
            </p>
            <GlassButton
              href="https://github.com/nwester627/schoolProject"
              icon={
                <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
              }
            >
              Source Code
            </GlassButton>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8 overflow-hidden">
          <Image
            className="rounded-t-lg max-h-44"
            src={"/utilities/images/videogames.jpeg"}
            alt=""
          />
          <div className="p-5 bg-blackish-blue">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Video Game Royale
            </h5>
            <p className="mb-3 font-normal text-light-gray">
              This project is currently in production! This will be developed in
              <a className="text-lavender"> JavaScript</a> and{" "}
              <a className="text-lavender">React</a>. I am hoping to have this
              out in the near future. Check back soon for more updates!
            </p>
            <GlassButton
              icon={
                <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
              }
              className="hover:cursor-not-allowed"
            >
              Coming Soon!
            </GlassButton>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8 overflow-hidden">
          <Image
            className="rounded-t-lg max-h-44"
            src={"/utilities/images/webdeveloper.jpg"}
            alt=""
          />
          <div className="p-5 bg-blackish-blue">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Portfolio Website
            </h5>
            <p className="mb-3 font-normal text-light-gray">
              This was a complete revamp of my old portfolio. I wanted to
              demonstrate my growth as a developer from 2 years ago. I used{" "}
              <a className="text-lavender">React</a>,{" "}
              <a className="text-lavender">Tailwind CSS</a>,{" "}
              <a className="text-lavender">HTML</a>, and{" "}
              <a className="text-lavender">JavaScript</a>.
            </p>
            <GlassButton
              href="https://github.com/nwester627/ReactPortfolio2.0"
              icon={
                <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
              }
            >
              Source Code
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
}
