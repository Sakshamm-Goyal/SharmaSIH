"use client";
import React, { useEffect, useState } from 'react';
import { useScroll, useTransform } from "framer-motion";
import { coding, hero } from '../assets';
import { BasicInfo, ContactUs, Footer, PopularQuizzes } from '../components';
import { GoogleGeminiEffect } from "../components/atoms/gemini";
import { InfiniteMovingCards } from '../components/atoms/infinite-moving-cards'; 
import { StickyScroll } from '../components/atoms/sticky-scroll-reveal'; 
import { useTranslation } from '../contexts/TranslationContext';

function Home() {
  const { translate, switchLanguage, language } = useTranslation();
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
      title: translate("collaborative_editing"),
      description: translate("collaborative_editing_description"),
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          {translate("collaborative_editing")}
        </div>
      ),
    },
    {
      title: translate("real_time_changes"),
      description: translate("real_time_changes_description"),
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw0CJDIh6DjyQMPODi4shJdK&ust=1726067235049000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOiRwNXTuIgDFQAAAAAdAAAAABAE"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt={translate("real_time_changes")}
          />
        </div>
      ),
    },
    {
      title: translate("version_control"),
      description: translate("version_control_description"),
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          {translate("version_control")}
        </div>
      ),
    },
    {
      title: translate("running_out_of_content"),
      description: translate("running_out_of_content_description"),
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          {translate("running_out_of_content")}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const injectBotpressScripts = () => {
      const script1 = document.createElement('script');
      script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = "https://mediafiles.botpress.cloud/1b9ad40f-0228-4157-9da1-f301289ab07b/webchat/v2.1/config.js";
      script2.async = true;
      document.body.appendChild(script2);

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    };

    injectBotpressScripts();
  }, []);

  const testimonials = [
    { quote: translate("testimonials_quote_1"), name: translate("testimonials_author_1"), title: translate("testimonials_title_1") },
    { quote: translate("testimonials_quote_2"), name: translate("testimonials_author_2"), title: translate("testimonials_title_2") },
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
          {translate("Learn by doing")}
          <span className="my-1 block text-center text-primary drop-shadow-2xl">
            {translate(" Experience education in the ")}
          </span>
          {translate("real world.")}
        </p>
        <p className="rounded-lg bg-primary px-4 py-2 text-center font-semibold uppercase tracking-wide text-black md:text-xl">
          {translate("Transformative education for a transformative India.")}
        </p>
      </div>

      <BasicInfo />

      <div className="mt-16">
        <StickyScroll content={content} />
      </div>

      <div className="mt-32">
        <InfiniteMovingCards items={testimonials} direction="right" speed="fast" />
      </div>

      <div className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip" ref={ref}>
        <GoogleGeminiEffect pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]} />
      </div>

      <ContactUs />
      <Footer />

      <button onClick={switchLanguage} className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded">
        {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      </button>
    </div>
  );
}

export default Home;
