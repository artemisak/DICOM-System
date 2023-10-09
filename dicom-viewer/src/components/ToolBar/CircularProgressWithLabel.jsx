import React, {useContext} from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {LocaleContext} from '../../contexts';

import styles from './CircularProgressWithLabel.module.css';

export const CircularProgressWithLabel = () => {
    const {translate} = useContext(LocaleContext)

    return (
        <Box className={styles.flexCenter}>
            <Box marginRight={3} className={styles.whiteColor}>
                <Typography variant="body1" className={styles.textBold}>
                    {translate('pleaseWait')}
                </Typography>
                <Typography variant="body1" >
                    {translate('loading')}
                </Typography>
            </Box>
            <Box position="relative" display="inline-flex">
                <CircularProgress className={styles.whiteColor}/>
            </Box>
        </Box>
    );
}