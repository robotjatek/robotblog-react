import React from 'react';
import './not-found.css';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="centered_component">
        <h1>404</h1>
        <img className="notfound_img" src="img/404.webp" alt="not found" />
        <h3>{t('not_found.not_found')}</h3>
      </div>
    </div>
  );
}

export default NotFound;
