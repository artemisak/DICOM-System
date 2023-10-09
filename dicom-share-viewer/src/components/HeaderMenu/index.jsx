import React, {useContext} from "react";
import {SizeContext, AuthContext, LocaleContext} from "providers/contexts";
import {HeaderMenuComponent} from "./HeaderMenuComponent";

export const HeaderMenu = ({pageReload}) => {
    const {isPortable} = useContext(SizeContext);
    const {auth, login, logout} = useContext(AuthContext);
    const {t} = useContext(LocaleContext);

    return (
        <HeaderMenuComponent
            isPortable={isPortable}
            auth={auth}
            login={login}
            logout={logout}
            t={t}
            pageReload={pageReload}
        />
    )
}