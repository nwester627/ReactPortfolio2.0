import Image from "next/image";
import recommendation1 from "../public/utilities/images/JaredSmithRecommendation.png";
import recommendation2 from "../public/utilities/images/TylerSorensonRecommendation.png";
import recommendation3 from "../public/utilities/images/KennyRichmondRecommendation.png";
export default function Testimonials() {
  return (
    <div>
      <h3 className="text-5xl py-4 text-center text-rose">Testimonials</h3>
      <div className="flex flex-col justify-center mt-16">
        <Image
          className="bg-space border-rose border-[6px] rounded-lg m-auto mb-8"
          src={recommendation1}
          alt="Recommendation from Jared Smith"
        />
        <Image
          className="bg-space border-rose border-[6px] rounded-lg m-auto mb-8"
          src={recommendation2}
          alt="Recommendation from Tyler Sorenson"
        />
        <Image
          className="bg-space border-rose border-[6px] rounded-lg m-auto"
          src={recommendation3}
          alt="Recommendation from Kenny Richmond"
        />
      </div>
    </div>
  );
}
