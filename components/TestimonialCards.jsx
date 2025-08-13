import React from "react";
import Image from "next/image";

const testimonialsData = [
  {
    id: 1,
    name: "Jared Smith",
    title: "Director of Engineering - BoomTown",
    img: "/utilities/images/JaredSmith.png",

    desc: '"From the beginning, Nick has always been someone who enjoys digging in and learning new things. I remember when he reached out to me about a possible BoomTown internship and gave him some feedback that he took, internalized, and exceeded. When the time came and that internship was open, it was an easy sell to bring him on board, and he validated my faith in him time and time again."',
  },
  {
    id: 2,
    name: "Tyler Sorenson",
    title: "Engineering Manager - IRE",
    img: "/utilities/images/TylerSorenson.png",
    desc: '"Nick was an excellent member of our team. In the short time I had to work with him I was beyond impressed with his willingness to learn new things, jump into new code bases, and take on challenging tasks and bugs. I feel like even in the short time I had to work with him he made great strides. He has a great attitude and is great to work with. He would be an excellent engineer for any team he joins."',
  },
  {
    id: 3,
    name: "Kenny Richmond",
    title: "Software Engineering Manager - IRE",
    img: "/utilities/images/KennyRichmond.png",
    desc: '"Nick is always willing to jump on any task needed, and has been extremely valuable to our team, especially when troubleshooting bugs. He takes a systematic approach to debugging, in order to isolate and solve issues as quickly as possible. Nick is an excellent engineer and will be a valuable asset to any team!"',
  },
];

export default function TestimonialCards() {
  return (
    <div className="flex flex-col items-center px-4 py-8 rounded-lg">
      <h3 className="text-5xl py-4 text-center text-light-gray 2xl:text-6xl mb-4">
        Testimonials
      </h3>
      <div className="w-24 h-1 bg-rose mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mx-auto px-4">
        {testimonialsData.map((d) => (
          <div
            key={d.id}
            className="flex flex-col items-center justify-between h-auto rounded-lg bg-space/90 border border-rose shadow-md shadow-black p-6 sm:p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
          >
            <div className="absolute top-4 left-4 text-rose text-4xl opacity-20">
              <i className="fas fa-quote-left"></i>
            </div>

            <div className="relative h-[60px] w-[60px] rounded-full bg-gradient-to-br from-rose to-lavender p-1 hover:shadow-lg hover:shadow-rose transition-transform duration-300 hover:rotate-3 mb-4 overflow-hidden shadow-md border-2 border-white">
              <Image
                className="rounded-full object-cover"
                src={d.img}
                alt={`${d.name}'s Picture`}
                fill
                sizes="60px"
              />
            </div>

            <p className="text-center text-light-gray mb-6 flex-grow">
              {d.desc}
            </p>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white">{d.name}</h3>
              <h4 className="text-light-gray">{d.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
