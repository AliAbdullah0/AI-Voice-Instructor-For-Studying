import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";

const CountSection = () => {
  return (
    <section className="flex w-full justify-center items-center p-5 mt-16 md:mt-36 border-t-[0.3px] border-t-gray-700">
      <div className=" font-extralight md:text-left text-center mt-7 gap-3 lg:text-8xl relative z-10 md:text-7xl text-5xl flex md:flex-row flex-col tracking-wide  items-center justify-center">
        {/* <video src="/vapi-pattern.webm" muted autoPlay className="absolute w-1/2 -z-10"></video> */}
        <h2>TRUSTED BY HUNDREDS</h2>
        <div>
        <CountUp
          from={0}
          to={500}
          separator=","
          direction="up"
          duration={1}
        
          className="font-normal"
        /><span className="font-normal">+</span>
        </div>
      </div>
    </section>
  );
};

export default CountSection;
