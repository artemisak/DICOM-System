import React, {useContext} from 'react';

import {LocaleContext, SizeContext} from './contexts';
import {Box, styled} from "@mui/material";
import {appSizeConfig} from "utility/constants";
import {useWindowSize} from "utility/hooks";

const AppContainer = styled(Box)(({scale, maxWidth, width, transform}) => ({
    margin: '0 auto',
    transform: `scale(${scale})`,
    transformOrigin: transform,
    maxWidth: maxWidth,
    width: width
}))

export const SizeProvider = ({children}) => {
    const {normalWidth, minWidth} = appSizeConfig;
    const {isStandardDirection} = useContext(LocaleContext);

    const {width} = useWindowSize();

    return (
        <AppContainer
            scale={(width < minWidth) ? (width / minWidth) : 1}
            transform={isStandardDirection ? '0 0' : '420px 0'}
            width={width > minWidth ? width : minWidth}
            maxWidth={normalWidth}
        >
            <SizeContext.Provider value={{isPortable: width < normalWidth, width}}>
                {children}
            </SizeContext.Provider>
        </AppContainer>
    )
}