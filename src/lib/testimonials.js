// Centralized testimonial data
// Each testimonial: id, name, title, image (imported path), summary (short pull quote), full (detailed text), context (short descriptor), tags
import JaredSmithImg from "@/assets/images/JaredSmith.png";
import TylerSorensonImg from "@/assets/images/TylerSorenson.png";
import KennyRichmondImg from "@/assets/images/KennyRichmond.png";

export const testimonials = [
  {
    id: "jared-smith",
    name: "Jared Smith",
    title: "Director of Engineering – BoomTown",
    image: JaredSmithImg.src,
    context: "Internship mentorship",
    tags: ["Mentorship", "Growth", "Initiative"],
    summary:
      "Nick digs in, learns fast, and consistently exceeds the bar we set.",
    full: "From the beginning, Nick has always been someone who enjoys digging in and learning new things. He reached out about a possible BoomTown internship, took feedback, internalized it, and exceeded expectations. When the internship opened it was an easy sell to bring him on board, and he validated my faith in him time and time again.",
  },
  {
    id: "tyler-sorenson",
    name: "Tyler Sorenson",
    title: "Engineering Manager – IRE",
    image: TylerSorensonImg.src,
    context: "Team collaboration",
    tags: ["Collaboration", "Learning", "Ownership"],
    summary:
      "He jumped into new codebases and tough bugs with zero hesitation.",
    full: "Nick was an excellent member of our team. In a short time I was impressed with his willingness to learn new things, jump into new code bases, and take on challenging tasks and bugs. Even in that brief period he made great strides. He has a great attitude and is great to work with — a strong addition to any engineering team.",
  },
  {
    id: "kenny-richmond",
    name: "Kenny Richmond",
    title: "Software Engineering Manager – IRE",
    image: KennyRichmondImg.src,
    context: "Debug & reliability",
    tags: ["Debugging", "Reliability", "Problem-Solving"],
    summary: "Systematic, fast debugging that added real reliability for us.",
    full: "Nick is always willing to jump on any task needed and has been extremely valuable to our team, especially when troubleshooting bugs. He takes a systematic approach to debugging to isolate and solve issues quickly. He is an excellent engineer and will be a valuable asset to any team.",
  },
];
