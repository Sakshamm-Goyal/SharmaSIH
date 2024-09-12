import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { logo } from '../../assets';
import { useGAEventTracker } from '../../hooks';

function Footer() {
  const { translate } = useTranslation();
  const gaEventTracker = useGAEventTracker('Footer');

  return (
    <footer className="w-full bg-white px-6 py-4 dark:bg-black sm:px-14 sm:py-6">
      <div className="md:mr-10 md:flex md:justify-between">
        <div className="-ml-1 mb-6 md:mb-0">
          <Link className="flex items-center" to="/">
            <img alt={translate('logo_alt')} className="mr-1 h-8 rounded-full sm:h-9" src={logo} />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-primary sm:text-2xl">
              {translate('site_name')}
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase">{translate('resources')}</h2>
            <Link className="hover:underline" to="/quizzes">
              {translate('quizzes')}
            </Link>
            <Link className="hover:underline" to="/learn">
              {translate('learn')}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase">{translate('follow_us')}</h2>
            <a
              className="hover:underline"
              href="https://github.com/s4shibam"
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => gaEventTracker({ label: 'Github' })}
            >
              {translate('github')}
            </a>
            <a
              className="hover:underline"
              href="https://www.linkedin.com/in/s4shibam"
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => gaEventTracker({ label: 'LinkedIn' })}
            >
              {translate('linkedin')}
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase">{translate('legal')}</h2>
            <Link className="hover:underline" to="/">
              {translate('privacy_policy')}
            </Link>
            <Link className="hover:underline" to="/">
              {translate('terms_and_conditions')}
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-6 border-black dark:border-white sm:mx-auto lg:my-8" />
      <div className="flex flex-col justify-center text-sm md:mr-10 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <span className="mb-1 block ">
            {translate('developed_with')} &nbsp;
            <a
              className="cursor-pointer hover:underline"
              href="https://www.s4shibam.com"
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => gaEventTracker({ label: 'Shibam Saha' })}
            >
              {translate('team_name')}
            </a>
          </span>
          <span>
            {translate('copyright')} {new Date().getFullYear()}&nbsp;
            <Link className="hover:underline" to="/">
              {translate('site_name')}
            </Link>
            &ensp;{translate('all_rights_reserved')}
          </span>
        </div>
        <div className="mx-auto mt-4 flex w-fit space-x-6 sm:justify-center md:mx-0 md:mt-0">
          <a
            href="https://www.facebook.com/s4shibam"
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => gaEventTracker({ label: 'Facebook' })}
          >
            <svg aria-hidden="true" className="h-5 w-5 dark:fill-white" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                fillRule="evenodd"
              />
            </svg>
            <span className="sr-only">{translate('facebook')}</span>
          </a>
          <a
            href="https://www.instagram.com/s4shibam"
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => gaEventTracker({ label: 'Instagram' })}
          >
            <svg aria-hidden="true" className="h-5 w-5 dark:fill-white" viewBox="0 0 24 24">
              <path
                clipRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15a4.44 4.44 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zm0 7.629c-1.588 0-2.878 1.29-2.878 2.878 0 1.588 1.29 2.878 2.878 2.878 1.588 0 2.878-1.29 2.878-2.878 0-1.588-1.29-2.878-2.878-2.878zm0 4.056c-.646 0-1.167-.521-1.167-1.167 0-.646.521-1.167 1.167-1.167.646 0 1.167.521 1.167 1.167 0 .646-.521 1.167-1.167 1.167zm4.27-5.859c-.396 0-.796-.014-1.193-.042-.308-.027-.616-.058-.92-.095a2.348 2.348 0 01-.457-.094c-.168-.07-.336-.168-.48-.292a.9.9 0 01-.224-.436.76.76 0 01-.063-.527c.035-.305.144-.596.312-.83.35-.468.898-.793 1.56-.852.222-.021.457-.031.686-.031.693 0 1.258.228 1.726.611.47.384.772.912.772 1.53a2.336 2.336 0 01-.104.691.785.785 0 01-.239.388c-.16.175-.358.31-.572.398-.11.043-.235.07-.356.089a5.344 5.344 0 01-.496.065z"
              />
            </svg>
            <span className="sr-only">{translate('instagram')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
