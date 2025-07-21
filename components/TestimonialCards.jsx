export default function TestimonialCards() {
  const data = [
    {
      id: 1,
      name: "Jared Smith",
      title: "Director of Engineering - BoomTown",
      img: "utilities/images/JaredSmith.png",
      icon: "utilities/images/BoomTown.jpg",
      desc: '"From the beginning, Nick has always been someone who enjoys digging in and learning new things. I remember when he reached out to me about a possible BoomTown internship and gave him some feedback that he took, internalized, and exceeded. When the time came and that internship was open, it was an easy sell to bring him on board, and he validated my faith in him time and time again."',
    },
    {
      id: 2,
      name: "Tyler Sorenson",
      title: "Engineering Manager - IRE",
      img: "utilities/images/TylerSorenson.png",
      desc: '"Nick was an excellent member of our team. In the short time I had to work with him I was beyond impressed with his willingness to learn new things, jump into new code bases, and take on challenging tasks and bugs. I feel like even in the short time I had to work with him he made great strides. He has a great attitude and is great to work with. He would be an excellent engineer for any team he joins."',
      featured: true,
    },
    {
      id: 3,
      name: "Kenny Richmond",
      title: "Software Engineering Manager - IRE",
      img: "utilities/images/KennyRichmond.png",
      desc: '"Nick is always willing to jump on any task needed, and has been extremely valuable to our team, especially when troubleshooting bugs. He takes a systematic approach to debugging, in order to isolate and solve issues as quickly as possible. Nick is an excellent engineer and will be a valuable asset to any team!"',
    },
  ];
  return (
    <div className="flex flex-col items-center rounded">
      <h3 className="text-5xl py-4 text-center text-light-gray 2xl:text-6xl">
        Testimonials
      </h3>
      <div className="w-full h-4/5 flex flex-col items-center mt-16 3xl:flex-row">
        {data.map((d) => (
          <div
            className={
              d.featured
                ? "mb-4 max-w-[350px] max-h-4/6 rounded flex flex-col py-12 px-4 hover:scale-105 hover:duration-1000 transition ease-in-out duration-1000 bg-blackish-blue border border-rose shadow-md shadow-black 3xl:w-[400px] 3xl:h-5/6 3xl:-mx-8"
                : "mb-4 max-w-[350px] max-h-4/6 rounded flex flex-col py-8 m-auto hover:scale-105 hover:duration-1000 transition ease-in-out duration-1000 bg-blackish-blue border border-rose shadow-md shadow-black"
            }
          >
            <div className="flex items-center justify-center bg-blackish-blue">
              <img
                className="h-[60px] w-[60px] rounded-full object-cover mb-4 border border-rose"
                src={d.img}
                alt="Testimonial Picture"
              />
            </div>
            <div
              className={
                d.name === "Kenny Richmond"
                  ? "px-4 py-8 text-center"
                  : "p-4 text-center"
              }
            >
              {d.desc}
            </div>
            <div className="flex items-center flex-col justify-center bg-blackish-blue p-4">
              <h3 className="text-white">{d.name}</h3>
              <h4>{d.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
