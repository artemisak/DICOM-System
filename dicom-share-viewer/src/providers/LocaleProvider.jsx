import React, {useEffect, useState} from 'react';

import {LocaleContext} from './contexts';
import {getUserLang, setUserLang, translate} from "../utility";
import {localesConfig} from "utility/constants";

const standardDirection = 'ltr';

export const LocaleProvider = ({children}) => {
    const [lang, setLang] = useState(getUserLang());

    useEffect(() => {
        setUserLang(lang);
        setBodyDirection();
    }, [lang]);

    useEffect(() => setBodyDirection(), []);

    const direction = lang && localesConfig[lang]?.direction ? localesConfig[lang].direction : standardDirection;

    const setBodyDirection = () => {
        document.body.style.direction = direction;
    }

    const translateBroker = (title) => translate({title, lang});

    const isStandardDirection = direction === standardDirection;

    return (
        <LocaleContext.Provider value={{lang, setLang, isStandardDirection, t: translateBroker}}>
            {children}
        </LocaleContext.Provider>
    )
}