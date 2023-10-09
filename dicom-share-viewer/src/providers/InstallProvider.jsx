import React, {useEffect, useState} from "react";
import {InstallContext} from "providers/contexts";

const isAppInstalled = () => window.matchMedia('(display-mode: standalone)').matches;

export const InstallProvider = ({children}) => {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", checkInstallHandler);
        return () => window.removeEventListener("beforeinstallprompt", checkInstallHandler);
    }, []);

    const checkInstallHandler = (e) => {
        e.preventDefault();
        setSupportsPWA(true);
        setPromptInstall(e);
    }

    const onInstallHandler = (e) => {
        if (promptInstall) {
            promptInstall.prompt();
            promptInstall.userChoice.then((choice) => choice.outcome === 'accepted' && setSupportsPWA(false));
        }
    };

    const onInstall = supportsPWA && !isAppInstalled() ? onInstallHandler : null;

    return (
        <InstallContext.Provider value={{onInstall}}>
            {children}
        </InstallContext.Provider>
    )
}
