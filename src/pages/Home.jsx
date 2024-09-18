"use client";
import React, { useEffect, useState } from 'react';
import { useScroll, useTransform } from "framer-motion";
import { coding, hero } from '../assets';
import image from "../assets/images/home.png"
import { BasicInfo, ContactUs, Footer, PopularQuizzes } from '../components';
import { GoogleGeminiEffect } from "../components/atoms/gemini";
import { InfiniteMovingCards } from '../components/atoms/infinite-moving-cards'; 
import { StickyScroll } from '../components/atoms/sticky-scroll-reveal'; 
import { useTranslation } from '../contexts/TranslationContext';
import { Button } from "../components/atoms/MovingBorder";
import home1 from "../assets/images/saha.png"

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
      title: translate("AI-powered Course Recommender "),
      description: translate("First, register on Solution Sahayak and fill out the provided questionnaire to help us understand your skills, interests, and career aspirations. Once completed, you can experience the AI-powered Course and Career Path Recommender, which provides personalized suggestions tailored to your unique profile. This powerful tool will guide you to explore relevant courses, including a wide range of vocational curricula designed to enhance practical skills and career readiness. Whether you're starting fresh or advancing your career, our recommender will help you make informed decisions about your learning journey."),
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        {translate("version_control")}
      </div>
      ),
    },
    {
      title: translate("Course Enrollment"),
      description: translate("After experiencing the AI-powered recommender, proceed to Course Enrollment. Here, you can explore a wide variety of multilingual courses tailored to your interests and career goals. Our platform offers engaging quizzes and assessments throughout the courses to track your progress and scores, ensuring you grasp the material effectively. Dive into a diverse range of subjects and enhance your skills with interactive content designed to cater to different learning styles and language preferences. This seamless enrollment process helps you access the right resources to advance your knowledge and career."),
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        {translate("version_control")}
      </div>
      ),
    },
    {
      title: translate("Virtual Reality (VR) Labs "),
      description: translate("Next, immerse yourself in our Virtual Reality (VR) Labs, where you can gain hands-on experience through interactive simulations and industrial training. Our VR environment provides a dynamic, immersive learning experience, allowing you to practice real-world skills in a simulated setting. Engage in virtual labs that replicate industry scenarios, receive practical training, and enhance your vocational skills in a controlled, yet realistic environment. This innovative approach bridges the gap between theoretical knowledge and practical application, preparing you for real-world challenges and opportunities."),
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          {translate("version_control")}
        </div>
      ),
    },
    {
      title: translate("Jobs, Apprenticeships, and Mentor Connect"),
      description: translate("Finally, delve into the Jobs, Apprenticeships, and Mentor Connect sections to further advance your career. Explore a curated selection of job opportunities tailored to your skills and aspirations, helping you find the perfect match in the job market. Discover various apprenticeship programs that offer hands-on experience and real-world training, allowing you to build practical skills alongside industry professionals. Additionally, connect with experienced mentors who can provide valuable guidance, support, and insights as you navigate your career path. These resources are designed to bridge the gap between learning and professional success, ensuring you’re well-equipped to achieve your career goals."),
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
          {/* <img alt="" className="w-12 origin-center animate-rotate rounded-md drop-shadow-md md:w-20 md:rounded-xl" src={coding} /> */}
        </div>
        <img alt="" className="object-cover drop-shadow-lg" height={750} src={home1} width={720} onLoad={() => setImageLoaded(true)} />
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
      <div className="fixed bottom-4 left-4">
  <button
    borderRadius="50%" // Making the button circular
    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 text-xl w-12 h-12 flex items-center justify-center"
    onClick={switchLanguage} // Handle VR button click
  >
    {language === 'en' ? 'ह' : 'E'}
  </button>
</div>


    </div>
  );
}

export default Home;
