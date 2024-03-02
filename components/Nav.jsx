import { FaHome } from "react-icons/fa";

export default function Nav() {
  return (
    <nav className="py-8 mb-12 flex justify-between px-8">
      <span>
        <FaHome className=" cursor-pointer size-16 text-teal hover:animate-wiggle hover:animate-infinite" />
      </span>
    </nav>
  );
}
