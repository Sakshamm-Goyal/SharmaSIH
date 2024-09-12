const aboutDetails = [
  `Welcome to Sahayak, An AI-driven learning platform designed to create personalized educational journeys tailored to each student's unique skills, career goals, and interests. It offers interactive multilingual content, including videos, quizzes, and downloadable resources, to enhance learning engagement. Additional features like live Q&A sessions and a notes maker promote active participation.`,
  
  `The platform also includes multiplayer VR labs for vocational training, allowing students to gain hands-on experience in a simulated environment. A multilingual AI chatbot offers instant support and personalized guidance.`,

  `We offer a wide range of quizzes designed to challenge learners at every level. From multiple-choice questions to coding challenges, our quizzes are crafted to test your knowledge in a fun and engaging way. Sahayak provides instant feedback on user responses, aiding in learning and improvement. As such, Sahayak is perfect for both educational purposes and entertainment. Best of all, these features are available for free.`,

  `Our team of expert coders and educators work tirelessly to create and curate high-quality quizzes and resources that are both challenging and informative. Our quizzes are updated regularly to reflect the latest trends and technologies in the coding domain, so you can be sure that you're learning the most up-to-date information.`,

  `Thank you for choosing Sahayak as your go-to source for free coding quizzes and resources. We hope you enjoy learning and growing with us!`
];

function About() {
  return (
    <div className="mx-auto flex w-[85%] animate-reveal flex-col items-center justify-center">
      <h1 className="page-heading">About Sahayak</h1>

      <div className="card flex !w-full max-w-4xl flex-col gap-10 p-6 text-justify font-medium dark:text-red-300 sm:w-3/5 sm:text-xl">
        {aboutDetails.map((para, index2) => (
          <p
            key={index2}
            className="indent-10 first-letter:text-xl dark:text-gray-300 sm:first-letter:text-2xl"
          >
            {para}
          </p>
        ))}
      </div>

      <span className="mt-14 block font-semibold tracking-wide">
        Developed with 💚 by &nbsp;
        <a
          className="cursor-pointer hover:underline"
          href="https://www.s4shibam.com"
          rel="noreferrer"
          target="_blank"
        >
          TeamError404.
        </a>
      </span>

      <div className=" mt-8 inline-flex w-full items-center justify-center">
        <hr className="my-8 h-1 w-64 rounded border-0 bg-primary dark:bg-secondary" />
        <div className="absolute left-1/2 -translate-x-1/2 bg-light px-4 dark:bg-dark">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 27"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default About;
