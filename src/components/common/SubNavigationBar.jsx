import { NavLink } from 'react-router-dom';
import { NavButton } from '..';
import { useTranslation } from '../../contexts/TranslationContext'; // Adjust import based on your setup

function SubNavigationBar({ className }) {
  const { translate } = useTranslation();

  return (
    <ul className={`items-center gap-8 ${className}`}>
      <NavLink className={({ isActive }) => (isActive ? 'active-page' : null)} to="/">
        <NavButton text={translate('home')} />
      </NavLink>
      {/* <NavLink className={({ isActive }) => (isActive ? 'active-page' : null)} to="/quizzes">
        <NavButton text={translate('quizzes')} />
      </NavLink> */}
      <NavLink className={({ isActive }) => (isActive ? 'active-page' : null)} to="/learn">
        <NavButton text={translate('courses')} />
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active-page' : null)} to="/message">
        <NavButton text={translate('community')} />
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active-page' : null)} to="/about">
        <NavButton text={translate('about')} />
      </NavLink>
    </ul>
  );
}

export default SubNavigationBar;
