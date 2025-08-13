import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import GlassButton from "../common/GlassButton";
import { useTheme } from "@/context/ThemeContext";
import discordBot from "../../assets/images/discordBot.png";
import inventoryManagement from "../../assets/images/inventorymanagementproject.png";
import videoGames from "../../assets/images/videogames.jpeg";
import webDeveloper from "../../assets/images/webdeveloper.jpg";

export default function Projects() {
  const { isDarkMode } = useTheme();

  return (
    <div className="px-4 py-8">
      <h3
        className={`text-5xl py-4 text-center 2xl:text-6xl mb-8 ${
          isDarkMode ? "text-light-gray" : "text-light-text"
        }`}
      >
        Projects I've Worked On
      </h3>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-4 sm:px-8">
        <div
          className={`flex flex-col rounded-lg shadow-lg overflow-hidden h-[440px] w-full max-w-sm mx-auto transition-all duration-900 ease-extra-smooth hover:scale-[1.02] hover:shadow-xl
          ${
            isDarkMode
              ? "bg-space border border-gray-700 shadow-black/30"
              : "bg-gradient-to-b from-white via-light-surface to-light-accent/30 border border-light-primary/10 shadow-light-primary/10"
          }`}
        >
          <div className="relative w-full h-48 group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 group-hover:opacity-0 transition-opacity duration-700 ease-smooth"></div>
            <Image
              src={discordBot.src}
              alt="Discord Bot"
              fill
              className="rounded-t-lg object-cover transition-transform duration-1000 ease-smooth group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div
            className={`flex flex-col justify-between flex-grow p-5 transition-colors duration-500
            ${
              isDarkMode
                ? "bg-blackish-blue"
                : "bg-gradient-to-b from-light-surface via-light-container to-white backdrop-blur-sm"
            }`}
          >
            <div>
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight transition-all duration-1000 ease-extra-smooth ${
                  isDarkMode
                    ? "text-white"
                    : "text-light-text bg-gradient-to-r from-light-primary/90 to-light-primary bg-clip-text text-transparent"
                }`}
              >
                Discord Bot
              </h5>
              <p
                className={`mb-3 font-normal transition-colors duration-500 ${
                  isDarkMode ? "text-light-gray" : "text-light-secondary"
                }`}
              >
                This bot was built using{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  Python
                </span>
                . The bot allows for moderation of users, media playback, making
                server announcements, and fun easter eggs for my friends! This
                was my first project in{" "}
                <a
                  className={
                    isDarkMode ? "text-lavender" : "text-light-primary"
                  }
                >
                  Python
                </a>
                .
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

        <div
          className={`flex flex-col rounded-lg shadow-lg overflow-hidden h-[440px] w-full max-w-sm mx-auto transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-xl
          ${
            isDarkMode
              ? "bg-space border border-gray-700 shadow-black/30"
              : "bg-gradient-to-b from-white via-light-surface to-light-accent/30 border border-light-primary/10 shadow-light-primary/10"
          }`}
        >
          <div className="relative w-full h-48 group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src={inventoryManagement.src}
              alt="Inventory Tracker"
              fill
              className="rounded-t-lg object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div
            className={`flex flex-col justify-between flex-grow p-5 transition-colors duration-500
            ${
              isDarkMode
                ? "bg-blackish-blue"
                : "bg-gradient-to-b from-light-surface via-light-container to-white backdrop-blur-sm"
            }`}
          >
            <div>
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight transition-colors duration-500 ${
                  isDarkMode
                    ? "text-white"
                    : "text-light-text bg-gradient-to-r from-light-primary/90 to-light-primary bg-clip-text text-transparent"
                }`}
              >
                Inventory Tracker
              </h5>
              <p
                className={`mb-3 font-normal transition-colors duration-500 ${
                  isDarkMode ? "text-light-gray" : "text-light-secondary"
                }`}
              >
                This project was written mainly in{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  Java
                </span>
                , but I used{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  JavaFX
                </span>{" "}
                to design and implement the GUI. The user is able to add parts,
                create products, search, delete, save and edit items from the
                management system.
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

        <div
          className={`flex flex-col rounded-lg shadow-lg overflow-hidden h-[440px] w-full max-w-sm mx-auto transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-xl
          ${
            isDarkMode
              ? "bg-space border border-gray-700 shadow-black/30"
              : "bg-gradient-to-b from-white via-light-surface to-light-accent/30 border border-light-primary/10 shadow-light-primary/10"
          }`}
        >
          <div className="relative w-full h-48 group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src={videoGames.src}
              alt="Video Game Royale"
              fill
              className="rounded-t-lg object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div
            className={`flex flex-col justify-between flex-grow p-5 transition-colors duration-500
            ${
              isDarkMode
                ? "bg-blackish-blue"
                : "bg-gradient-to-b from-light-surface via-light-container to-white backdrop-blur-sm"
            }`}
          >
            <div>
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight transition-colors duration-500 ${
                  isDarkMode
                    ? "text-white"
                    : "text-light-text bg-gradient-to-r from-light-primary/90 to-light-primary bg-clip-text text-transparent"
                }`}
              >
                Video Game Royale
              </h5>
              <p
                className={`mb-3 font-normal transition-colors duration-500 ${
                  isDarkMode ? "text-light-gray" : "text-light-secondary"
                }`}
              >
                This project is currently in production! This will be developed
                in{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  JavaScript
                </span>{" "}
                and{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  React
                </span>
                . I am hoping to have this out in the near future. Check back
                soon for more updates!
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

        <div
          className={`flex flex-col rounded-lg shadow-lg overflow-hidden h-[440px] w-full max-w-sm mx-auto transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-xl
          ${
            isDarkMode
              ? "bg-space border border-gray-700 shadow-black/30"
              : "bg-gradient-to-b from-white via-light-surface to-light-accent/30 border border-light-primary/10 shadow-light-primary/10"
          }`}
        >
          <div className="relative w-full h-48 group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image
              src={webDeveloper.src}
              alt="Portfolio Website"
              fill
              className="rounded-t-lg object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div
            className={`flex flex-col justify-between flex-grow p-5 transition-colors duration-500
            ${
              isDarkMode
                ? "bg-blackish-blue"
                : "bg-gradient-to-b from-light-surface via-light-container to-white backdrop-blur-sm"
            }`}
          >
            <div>
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight transition-colors duration-500 ${
                  isDarkMode
                    ? "text-white"
                    : "text-light-text bg-gradient-to-r from-light-primary/90 to-light-primary bg-clip-text text-transparent"
                }`}
              >
                Portfolio Website
              </h5>
              <p
                className={`mb-3 font-normal transition-colors duration-500 ${
                  isDarkMode ? "text-light-gray" : "text-light-secondary"
                }`}
              >
                This was a complete revamp of my old portfolio. I wanted to
                demonstrate my growth as a developer from 2 years ago. I used{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  React
                </span>
                ,{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  Tailwind CSS
                </span>
                ,{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  HTML
                </span>
                , and{" "}
                <span
                  className={`font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-lavender hover:text-lavender-light"
                      : "text-light-primary hover:text-lavender"
                  }`}
                >
                  JavaScript
                </span>
                .
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
