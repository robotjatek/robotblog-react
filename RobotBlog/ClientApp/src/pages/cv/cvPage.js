import React, { useEffect, useState } from 'reactn';
import { useTranslation } from 'react-i18next';
import mdService from '../../services/md/md.service';

const CvPage = () => {
  const [cv, setCv] = useState();
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadCv = async () => {
      const { language } = i18n;
      const mdPath = `dist/cv-${language}.md`;

      try {
        const md = await mdService.loadSanitizedMd(mdPath);
        setCv(md);
      } catch (e) {
        const md = await mdService.loadSanitizedMd('dist/cv-en.md');
        setCv(md);
      }
    };

    loadCv();
  }, [i18n.language, i18n]);

  /* eslint-disable react/no-danger */
  return (<div dangerouslySetInnerHTML={{ __html: cv }} />);
};

export default CvPage;
