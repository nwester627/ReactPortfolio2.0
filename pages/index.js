import Head from "next/head";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nicolas Wester Portfolio</title>
      </Head>

      <main className="bg-gradient-to-r from-dark-greenish to-greenish text-yellowish font-poppins">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between drop-shadow-xl">
            <a href="https://nicolaswesterresume.tiiny.site/">
              <button className="bg-yellowish text-dark-greenish font-bold px-4 rounded-full ml-8 h-8">
                Resume
              </button>
            </a>
            <ul className="flex items-center px-8">
              <li className="px-4">
                <a href="https://github.com/nwester627">
                  <FaGithubSquare className="cursor-pointer size-16" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/nicolaswester">
                  <FaLinkedin className="cursor-pointer size-16" />
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10 drop-shadow-2xl">
            <h2 className="text-5xl py-2 font-medium">Nicolas Wester</h2>
            <h3 className="text-2xl py-2 font-medium">Software Engineer</h3>
            <p className="text-md py-5">
              Experienced Software Engineer that specalizes in
              JavaScript/TypeScript, React, Angular, PHP, Laravel, and more!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
