import React from 'reactn';
import { useTranslation } from 'react-i18next';

const NotAvailable = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {i18n.t('blog.not-available', { language: i18n.t(`lang.${i18n.language}`).toLowerCase() })}
    </>
  );
};

export default NotAvailable;
