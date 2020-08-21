import React, { useEffect, useState } from "reactn";
import { useTranslation } from "react-i18next";
import mdService from "../../services/md/md.service";

const CvPage = () => {

    const [cv, setCv] = useState();
    const { i18n } = useTranslation();

    useEffect(() => {
        const loadCv = async () => {
            const language = i18n.language;
            const mdPath = `dist/cv-${language}.md`;

            try {
                const md = await mdService.loadSanitizedMd(mdPath);
                setCv(md);
            } catch (e) {
                const md = await mdService.loadSanitizedMd("disr/cv-en.md");
                setCv(md);
            }
        }

        loadCv();
    }, [i18n.language]);

    const renderCv = () => {
        return {
            __html: cv
        };
    }

    return (<div dangerouslySetInnerHTML={renderCv()} />)
}

export default CvPage;
