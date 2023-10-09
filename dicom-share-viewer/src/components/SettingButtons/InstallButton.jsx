import React, {useContext} from "react";

import {InstallApp} from "assets/icons";
import {SquareIconButton} from "components/SquareIconButton";
import {InstallContext} from "providers/contexts";


export const InstallButton = () => {
    const {onInstall} = useContext(InstallContext);

    if (!onInstall) return null;

    return (
        <SquareIconButton
            Icon={InstallApp}
            onClick={() => onInstall()}
        />
    )
}