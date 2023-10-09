import * as locales from '../locales';

export const translate = (title, lang, placeholder = '-') => {
    const dict = locales[lang] ? locales[lang] : locales['en'];
    if (!dict) return placeholder;
    return dict[title] ? dict[title] : placeholder;
}