"use client";
import React, { useEffect, useState } from 'react';
import { useScroll, useTransform } from "framer-motion";
import { coding, hero } from '../assets';
import { BasicInfo, ContactUs, Footer, PopularQuizzes } from '../components';
import { GoogleGeminiEffect } from "../components/atoms/gemini";
import { InfiniteMovingCards } from '../components/atoms/infinite-moving-cards'; 
import { StickyScroll } from '../components/atoms/sticky-scroll-reveal'; 

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

  const content = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <img
  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw0CJDIh6DjyQMPODi4shJdK&ust=1726067235049000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiRwNXTuIgDFQAAAAAdAAAAABAE"
  width={300}
  height={300}
  className="h-full w-full object-cover"
  alt="linear board demo"
/>

        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team  aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Running out of content
        </div>
      ),
    },
  ];



  useEffect(() => {
    // Dynamically inject Botpress Webchat scripts
    const injectBotpressScripts = () => {
      const script1 = document.createElement('script');
      script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = "https://mediafiles.botpress.cloud/1b9ad40f-0228-4157-9da1-f301289ab07b/webchat/v2.1/config.js";
      script2.async = true;
      document.body.appendChild(script2);

      // Clean up scripts on component unmount
      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    };

    injectBotpressScripts();
  }, []);

  const testimonials = [
    { quote: "It was the best of times, it was the worst of times...", name: "Charles Dickens", title: "A Tale of Two Cities" },
    { quote: "To be, or not to be, that is the question...", name: "William Shakespeare", title: "Hamlet" },
    // Other testimonials
  ];

  return (
    <div className={`mt-36 flex animate-reveal flex-col items-center justify-center xl:mt-28 ${!imageLoaded && 'hidden'}`}>
      <div className="relative mx-auto aspect-[8/5] max-w-xl overflow-hidden px-4 xl:mt-8 2xl:max-w-3xl">
        <div className="absolute left-0 top-0 flex w-full justify-center pr-1">
          <img alt="" className="w-12 origin-center animate-rotate rounded-md drop-shadow-md md:w-20 md:rounded-xl" src={coding} />
        </div>
        <img alt="" className="object-cover drop-shadow-lg" height={450} src={hero} width={720} onLoad={() => setImageLoaded(true)} />
      </div>

      <div className="mx-8 flex flex-col items-center justify-center gap-2">
        <p className="page-heading my-8 mt-10 text-center text-3xl font-bold uppercase text-black dark:text-white md:text-5xl">
          Learn by Doing
          <span className="my-1 block text-center text-primary drop-shadow-2xl">
            Experience Education that Connects You to 
          </span>
          the Real World!
        </p>
        <p className="rounded-lg bg-primary px-4 py-2 text-center font-semibold uppercase tracking-wide text-black md:text-xl">
          A Transformative Education for a Transforming Nation
        </p>
      </div>

      <BasicInfo />

      {/* InfiniteMovingCards Component */}
      
      
      
      <div className="mt-16"> {/* Increased top margin */}
  <StickyScroll content={content} />
</div>


      <div className="mt-32"> {/* Adjust the margin-top value as needed */}
  <InfiniteMovingCards items={testimonials} direction="right" speed="fast" />
</div>

<div className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip" ref={ref}>
  <GoogleGeminiEffect pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]} />
</div>

      
      <ContactUs />
     
      
      <Footer />
    </div>
  );
}

export default Home;
