import React, {useState, useEffect, useMemo, useRef} from 'react';
import {ToolBar} from "../ToolBar";
import {Box, Typography} from "@mui/material";

import styles from './index.module.css';
import {ErrorIcon} from "../../assets/icons";
import {initDwvOptions, initDwvInstance, newDwvState} from "./dwvConfig";
import {displayModes} from "../../utility";

export const WorkSpace = ({data, colorScheme, onError, markup, onMarkupChange, onControlAction, displayMode}) => {
    const [dwvApp, setDwvApp] = useState(null);
    const [loaded, setLoaded] = useState(null);
    const [error, setError] = useState(null);
    const [containerHeight, setContainerHeight] = useState(960);
    const dwvRef = useRef(null);

    useEffect(() => {
        initDwvOptions();
        const app = initDwvInstance({onError: setError, onLoad: setLoaded});
        setDwvApp(app);
    }, []);

    useEffect(() => {
        let syncMarkupTimer = null;

        if (dwvApp && [displayModes.full, displayModes.edit].includes(displayMode)) {
            syncMarkupTimer = setInterval(() => {
                const {drawings, drawingsDetails} = JSON.parse(dwvApp.getState());
                if (JSON.stringify({drawings, drawingsDetails}) !== JSON.stringify(markup)) {
                    onMarkupChange({drawings, drawingsDetails});
                }
            }, 1000);
        }

        return () => syncMarkupTimer && clearInterval(syncMarkupTimer);
    }, [JSON.stringify(dwvApp), JSON.stringify(markup)]);

    useEffect(() => {
        if (dwvApp) dwvApp.loadURLs([data], {});
    }, [JSON.stringify(dwvApp), data]);

    useEffect(() => {
        onError && error && onError(error);
    }, [error]);

    useEffect(() => {
        if (loaded) {
            markup && applyDwvState(markup);
            const canvasHeight = dwvRef?.current?.getElementsByTagName('canvas')?.[0]?.height;
            setContainerHeight && setContainerHeight(canvasHeight ? canvasHeight : 960);
            window.addEventListener('resize', dwvApp?.onResize);
        }
        return () => {
            window.removeEventListener('resize', dwvApp?.onResize)
        }
    }, [loaded]);

    const onModeChange = ({action, colorMap, name, option}) => {
        if (dwvApp) {
            try {
                if (action && dwvApp[action]) dwvApp[action]();
                if (colorMap) dwvApp.setColourMap(colorMap);
                if (name) dwvApp.setTool(name);
                if (option && dwvApp.setDrawShape) dwvApp.setDrawShape(option);
            } catch(e) { console.error('An error occurred while dwvApp working') }
        }
    }

    const applyDwvState = (drawings) => {
        try {
            if (drawings) {
                const currentState = JSON.parse(dwvApp.getState());
                const appState = newDwvState();
                appState.apply(dwvApp, {...currentState, ...drawings});
            }
        } catch(e) {
            console.error('An error occurred while loading the markup')
        }
    }

    const {color, background} = colorScheme;

    const dwvScreenMemoized = useMemo(() => (
        <Box className={styles.dwvContainer} height={containerHeight}>
            <div
                id="layerGroup0"
                className={styles.layerGroup}
                style={{borderColor: color, background}}
                ref={dwvRef}
            />
        </Box>
    ), [dwvApp, containerHeight, color, background]);

    const dwvErrorMemoized = useMemo(() => (
        <Box width={32} marginX={'auto'} marginY={1}>
            <Typography variant={'body2'} fontWeight={'bold'} style={{color}}>
                <ErrorIcon/>
            </Typography>
        </Box>
    ), [color]);

    return (
        <Box style={{position: 'relative'}}>
            <Box style={{height: '100%'}}>
                {dwvApp ? (
                    <ToolBar
                        onChange={onModeChange}
                        loaded={loaded}
                        colorScheme={colorScheme}
                        onControlAction={onControlAction}
                        displayMode={displayMode}
                    />
                ) : null}
                {!error ? dwvScreenMemoized : dwvErrorMemoized}
            </Box>
        </Box>
    );
}
