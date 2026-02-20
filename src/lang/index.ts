import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/lang/en';
import fr from '@/lang/fr';

 i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            fr: {
                translation: fr
            }
        },
        fallbackLng: 'en',
        lng: 'fr',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;