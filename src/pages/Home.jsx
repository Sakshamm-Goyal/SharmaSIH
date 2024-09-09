"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { useEffect, useState } from 'react';
import { coding, hero } from '../assets';
import { BasicInfo, ContactUs, Footer, PopularQuizzes } from '../components';
import { GoogleGeminiEffect } from "../components/atoms/gemini";

function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
 
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  useEffect(() => {
    // Inject the chatbot script when the component is mounted
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://mediafiles.botpress.cloud/1b9ad40f-0228-4157-9da1-f301289ab07b/webchat/v2.1/config.js";
    script2.async = true;
    document.body.appendChild(script2);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    
    <div
      className={`mt-36 flex animate-reveal flex-col items-center justify-center xl:mt-28 ${
        !imageLoaded && 'hidden'
      }`}
    >
      <div className="relative mx-auto aspect-[8/5] max-w-xl overflow-hidden px-4 xl:mt-8 2xl:max-w-3xl">
        <div className="absolute left-0 top-0 flex w-full justify-center pr-1">
          <img
            alt=""
            className="w-12 origin-center animate-rotate rounded-md drop-shadow-md md:w-20 md:rounded-xl"
            src={coding}
          />
        </div>

        <img
          alt=""
          className="object-cover drop-shadow-lg"
          height={450}
          src={hero}
          width={720}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="mx-8 flex flex-col items-center justify-center gap-2">
        <p className="page-heading my-8 mt-10 text-center text-3xl font-bold uppercase text-black dark:text-white md:text-5xl">
          The Best
          <span className="my-1 block text-center text-primary drop-shadow-2xl">
            Coding Quiz Practice
          </span>
          Platform you have ever seen!
        </p>
        <p className="rounded-lg bg-primary px-4 py-2 text-center font-semibold uppercase tracking-wide text-black md:text-xl">
          Quizzes are like a mental workout, except you don&apos;t need to break a sweat!
        </p>
      </div>
      <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
      <BasicInfo />
      <PopularQuizzes />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Home;
