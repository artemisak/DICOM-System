import {localesConfig} from './constants'
import * as locales from '../locales';

const defaultLocale = 'en';

export const translate = ({title, lang = defaultLocale, placeholder = '-'}) => {
    return locales?.[lang]?.[title] || placeholder;
}

export const getUserLang = () => {
    let lang;
    const langFromStore = localStorage.getItem('lang');
    if (langFromStore) lang = langFromStore;
    else {
        const langFromBrowser = window?.navigator?.language;
        if (langFromBrowser) {
            const langFromBrowserSort = langFromBrowser.substr(0, 2).toLowerCase();
            if (Object.keys(localesConfig).includes(langFromBrowserSort)) lang = langFromBrowserSort;
            else lang = defaultLocale;
        } else lang = defaultLocale;
    }
    setUserLang(lang);

    return lang;
}

export const setUserLang = (lang) => {
    localStorage.setItem('lang', lang);
}