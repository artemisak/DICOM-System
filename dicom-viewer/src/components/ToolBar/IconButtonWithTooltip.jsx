import React, {useContext} from "react";
import {Box, IconButton} from "@mui/material";
import {LocaleContext} from '../../contexts';

import styles from './IconButtonWithTooltip.module.css';

export const IconButtonWithTooltip = ({onClick, title, Icon, isActive, color, size = 28}) => {
    const {translate} = useContext(LocaleContext)
    const iconButtonClassName = `${styles.iconButton} ${isActive ? styles.active : ''}`;

    return (
        <IconButton
            onClick={onClick}
            className={iconButtonClassName}
            style={{color}}
            aria-label={title}
            title={translate(title)}
        >
            <Box width={size} height={size} className={styles.iconContainer}>
                <Icon/>
            </Box>
        </IconButton>
    )
}