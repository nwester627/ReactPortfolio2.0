import discordBot from "../public/utilities/images/discordBot.png";
import inventoryManagementSystem from "../public/utilities/images/inventorymanagementproject.png";
import videoGames from "../public/utilities/images/videogames.jpeg";
import webDeveloper from "../public/utilities/images/webdeveloper.jpg";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Projects() {
  return (
    <div>
      <h3 className="text-6xl py-4 text-center">Projects I've Worked On</h3>
      <div className="grid grid-cols-4">
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
          <Image className="rounded-t-lg max-h-48" src={discordBot} alt="" />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Discord Bot
            </h5>
            <p className="mb-3 font-normal text-rose">
              This bot was built using Python. The bot allows for moderation of
              users, media playback, making server announcements, and fun easter
              eggs for my friends! This was my first project in Python.
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
            className="rounded-t-lg max-h-[10.5rem]"
            src={inventoryManagementSystem}
            alt=""
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Inventory Tracker
            </h5>
            <p className="mb-3 font-normal text-rose">
              This project was written mainly in Java, but I used JavaFX to
              design and implement the GUI. The user is able to add parts,
              create products, search, delete, save and edit items from the
              management system.
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
          <Image className="rounded-t-lg max-h-48" src={videoGames} alt="" />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Video Game Royale
            </h5>
            <p className="mb-3 font-normal text-rose">
              I haven't actually made this. Everything you see here is
              placeholder text. This is my next project. It will probably be in
              JS. Blah blah blah placeholder text. This is a place holder.
            </p>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-rose bg-black rounded-lg hover:bg-teal"
            >
              Source Code
              <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
            </a>
          </div>
        </div>
        <div className="max-w-xs bg-space border border-rose rounded-lg shadow-md m-auto mt-8">
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
              Literally the website you are looking at. This is it. You are
              looking at it. I used React, CSS, HTML, JavaScript, and Tailwind.
              I am a big fan of Tailwind. It works great.
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
