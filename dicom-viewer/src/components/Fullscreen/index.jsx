import React, {useState, useRef} from 'react';
import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {FullscreenIcon} from "../../assets/icons";
import {fullScreenColorScheme} from "../../utility";
import styles from './index.module.css';


export const Fullscreen = ({color, fullscreenEnabled, rerender, Component, componentProps}) => {
    const [isFullscreen, setIsFullScreen] = useState(false);
    const containerRef = useRef(null)

    const openFullScreen = () => {
        const element = containerRef?.current;
        if (!element) return null;
        element.onfullscreenchange = handleFullscreenChange;
        if (!document.fullscreenElement && Boolean(element?.requestFullscreen)) {
            element.requestFullscreen().then().catch(e => console.error(e));
        } else {
            document.exitFullscreen().then();
        }
    }

    const handleFullscreenChange = (e) => {
        setIsFullScreen(document.fullscreenElement === e.target);
        rerender();
    };

    const childrenUpdProps = isFullscreen ? {colorScheme: fullScreenColorScheme} : {};

    return (
        <Box>
            {fullscreenEnabled ? (
                <Box className={styles.fullScreenButtonContainer}>
                    <Box className={styles.fullScreenButton}>
                        <IconButton style={{color}} onClick={openFullScreen}>
                            <FullscreenIcon/>
                        </IconButton>
                    </Box>
                </Box>
            ) : null}
            <Box ref={containerRef} className={isFullscreen && styles.fullScreenContainer}>
                <Component {...componentProps} {...childrenUpdProps}/>
            </Box>
        </Box>
    )
}