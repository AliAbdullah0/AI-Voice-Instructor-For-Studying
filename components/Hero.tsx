import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DotTrail from "./DotTrail";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { getCurrentUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
const Hero = async () => {
  const user = await getCurrentUser()
  return (
    <>
      <section
        className={cn(
          "min-h-screen w-full bg-dark flex justify-center border-b-[0.3px] border-b-gray-700 relative", // Add relative here
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      >
        <div className="flex flex-col items-center relative z-10 justify-center gap-2">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="lg:text-[4.6rem] md:text-6xl text-4xl text-white">
              Voice AI Agent
            </h1>
            <h1 className="lg:text-[4.6rem] md:text-6xl text-4xl text-white">
              For Students
            </h1>
          </div>
          <div className="flex md:gap-3 gap-2 mt-4">
            <SecondaryButton to={!user ? "/courses" : '/generate'} text="GET STARTED" icon={true} />
            <PrimaryButton to={user ? '/courses' : '/sign-in'} text={user ? 'EXPLORE' : "SIGN IN"} icon={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
