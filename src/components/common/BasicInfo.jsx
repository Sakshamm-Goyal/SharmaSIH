import React from 'react';
import { useTranslation } from '../../contexts/TranslationContext';
import { CountUpAnimation } from '..';

const reasons = [
  {
    image: 'help',
    headingKey: 'wide_range_of_topics',
    descriptionKey: 'wide_range_of_topics_description',
  },
  {
    image: 'smart_display',
    headingKey: 'VR_Based_Video_Content',
    descriptionKey: 'VR_Based_Video_Content_description',
  },
  {
    image: 'verified_user',
    headingKey: 'verified_certificate',
    descriptionKey: 'verified_certificate_description',
  },
  {
    image: 'schedule',
    headingKey: 'apprentenceship_&_job_offers',
    descriptionKey: 'apprentenceship_&_job_offers_description',
  },
];

function BasicInfo() {
  const { translate } = useTranslation();

  return (
    <>
      <div className="my-32 w-full overflow-x-hidden border-y-2 border-black bg-primary py-10 drop-shadow-lg dark:border-white">
        <div className="mx-auto grid w-[calc(100vw-25%)] grid-cols-2 gap-10 md:grid-cols-4">
          <p className="stat">
            <CountUpAnimation end={200} />
            <span className="block text-base md:text-lg">{translate('questions')}</span>
          </p>
          <p className="stat">
            <CountUpAnimation end={100} />
            <span className="block text-base md:text-lg">{translate('quizzes')}</span>
          </p>
          <p className="stat">
            <CountUpAnimation end={150} />
            <span className="block text-base md:text-lg">{translate('lectures')}</span>
          </p>
          <p className="stat">
            <CountUpAnimation end={500} />
            <span className="block text-base md:text-lg">{translate('learners')}</span>
          </p>
        </div>
      </div>
      <div className="mb-20 w-[85%]">
        <p className="mb-20 text-center text-4xl font-bold uppercase tracking-wider lg:text-5xl">
          {translate('why sahayak ?')}
        </p>
        <div className="grid grid-cols-1 place-content-center gap-x-10 gap-y-16 xl:grid-cols-2 2xl:grid-cols-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="card mx-auto flex max-w-[500px] flex-col gap-y-4 border-0 border-b-4 !border-b-primary p-8 text-center transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="mx-auto mb-4 grid h-fit w-fit place-content-center rounded-full border-2 border-primary bg-secondary p-4 drop-shadow-md">
                <span className="material-symbols-outlined text-5xl text-white">
                  {reason.image}
                </span>
              </div>
              <p className="text-xl font-semibold">{translate(reason.headingKey)}</p>
              <p className="font-medium">{translate(reason.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BasicInfo;
