import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import GlassButton from "./GlassButton";

export default function Projects() {
  return (
    <div className="px-4 py-8">
      <h3 className="text-5xl py-4 text-center text-light-gray 2xl:text-6xl mb-8">
        Projects I've Worked On
      </h3>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-4 sm:px-8">
        <div className="flex flex-col bg-space border border-rose rounded-lg shadow-md overflow-hidden h-[440px] w-full max-w-sm mx-auto">
          <div className="relative w-full h-48">
            <Image
              src="/utilities/images/discordBot.png"
              alt="Discord Bot"
              fill
              className="rounded-t-lg object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow p-5 bg-blackish-blue">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                Discord Bot
              </h5>
              <p className="mb-3 font-normal text-light-gray">
                This bot was built using <a className="text-lavender">Python</a>
                . The bot allows for moderation of users, media playback, making
                server announcements, and fun easter eggs for my friends! This
                was my first project in <a className="text-lavender">Python</a>.
              </p>
            </div>
            <div className="mt-auto">
              <GlassButton
                href="https://github.com/nwester627/discordBot"
                icon={
                  <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                }
                className="transition-colors duration-300 hover:bg-rose hover:text-white hover:shadow-lg"
              >
                Source Code
              </GlassButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-space border border-rose rounded-lg shadow-md overflow-hidden h-[440px] w-full max-w-sm mx-auto">
          <div className="relative w-full h-48">
            <Image
              src="/utilities/images/inventorymanagementproject.png"
              alt="Inventory Tracker"
              fill
              className="rounded-t-lg object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow p-5 bg-blackish-blue">
            <div>
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
            </div>
            <div className="mt-auto">
              <GlassButton
                href="https://github.com/nwester627/schoolProject"
                icon={
                  <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                }
                className="transition-colors duration-300 hover:bg-rose hover:text-white hover:shadow-lg"
              >
                Source Code
              </GlassButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-space border border-rose rounded-lg shadow-md overflow-hidden h-[440px] w-full max-w-sm mx-auto">
          <div className="relative w-full h-48">
            <Image
              src="/utilities/images/videogames.jpeg"
              alt="Video Game Royale"
              fill
              className="rounded-t-lg object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow p-5 bg-blackish-blue">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                Video Game Royale
              </h5>
              <p className="mb-3 font-normal text-light-gray">
                This project is currently in production! This will be developed
                in
                <a className="text-lavender"> JavaScript</a> and{" "}
                <a className="text-lavender">React</a>. I am hoping to have this
                out in the near future. Check back soon for more updates!
              </p>
            </div>
            <div className="mt-auto">
              <GlassButton
                icon={
                  <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                }
                className="cursor-not-allowed opacity-50"
                disabled
              >
                Coming Soon!
              </GlassButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-space border border-rose rounded-lg shadow-md overflow-hidden h-[440px] w-full max-w-sm mx-auto">
          <div className="relative w-full h-48">
            <Image
              src="/utilities/images/webdeveloper.jpg"
              alt="Portfolio Website"
              fill
              className="rounded-t-lg object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-between flex-grow p-5 bg-blackish-blue">
            <div>
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
            </div>
            <div className="mt-auto">
              <GlassButton
                href="https://github.com/nwester627/ReactPortfolio2.0"
                icon={
                  <FaArrowRight className="w-3.5 h-3.5 ms-2 rtl:rotate-180" />
                }
                className="transition-colors duration-300 hover:bg-rose hover:text-white hover:shadow-lg"
              >
                Source Code
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
