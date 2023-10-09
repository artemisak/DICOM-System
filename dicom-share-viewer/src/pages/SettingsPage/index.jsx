import React, {useContext} from "react";
import {InstallContext, LocaleContext, SnackbarContext} from "providers/contexts";
import {Box, Typography} from "@mui/material";
import {Underlay} from "components/Underlay";

import {InstallButton, InfoButtonWithModal, LangButtonWithSelection} from 'components/SettingButtons';
import {FlexBox} from "components/StyledComponents";
import {SquareIconButton} from "components/SquareIconButton";
import {ClearCacheIcon} from "assets/icons";

export const SettingsPage = () => {
    const {t} = useContext(LocaleContext);
    const {showMessage} = useContext(SnackbarContext);
    const {onInstall} = useContext(InstallContext);

    const clearCache = () => {
        caches.keys().then(cachesKeys => {
            cachesKeys.forEach(key => !key.includes('static') && caches.delete(key))
            showMessage(t('cleared_cache'))
        });
    }

    return (
        <Box marginX={'auto'} width={400}>
            <Underlay>
                <Box padding={2}>
                    <Typography variant={'h6'}>{t('settings')}</Typography>
                    <Box>
                        {onInstall ? (
                            <FlexBox marginTop={2}>
                                {t('install_app')}: <InstallButton/>
                            </FlexBox>
                        ) : null}
                        <FlexBox marginTop={1}>
                            {t('about_us')}: <InfoButtonWithModal/>
                        </FlexBox>
                        <FlexBox marginTop={1}>
                            {t('language')}: <LangButtonWithSelection/>
                        </FlexBox>
                        <FlexBox marginTop={1}>
                            {t('clear_cache')}: <SquareIconButton Icon={ClearCacheIcon} onClick={clearCache}/>
                        </FlexBox>
                    </Box>
                </Box>
            </Underlay>
        </Box>
    );
}