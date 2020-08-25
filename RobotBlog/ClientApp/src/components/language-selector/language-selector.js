import React, { useGlobal, useEffect } from 'reactn';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FlagIcon from '../flag-icon';
import './language-selector.css';

const LanguageSelector = () => {
  const [t, i18n] = useTranslation();
  const [loginResult] = useGlobal('loginResult');

  useEffect(() => {
    const lang = loginResult?.user?.preferredLanguage || 'hu';
    i18n.changeLanguage(lang);
  }, [i18n, loginResult]);

  const getFlagCode = (lang) => {
    const flag = lang === 'en' ? 'gb' : lang;
    return flag;
  };

  return (
    <>
      <NavDropdown title={
        (
          <>
            <FlagIcon code={getFlagCode(i18n.language)} />
            <span>
              {` ${t(`lang.${i18n.language}`)}`}
            </span>
          </>
        )
      }
      >
        <NavDropdown.Item onClick={() => i18n.changeLanguage('hu')}>
          <>
            <FlagIcon code={getFlagCode('hu')} />
            {' Magyar'}
          </>
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => i18n.changeLanguage('en')}>
          <>
            <FlagIcon code={getFlagCode('en')} />
            {' English'}
          </>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

export default LanguageSelector;
