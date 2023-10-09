import React, {Fragment} from "react";

import {Box, Paper, Typography, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "utility/constants";

import {LangButtonWithSelection, InfoButtonWithModal, InstallButton} from "components/SettingButtons";
import {SquareIconButton} from "components/SquareIconButton";

import {UploadedIcon, ResearchIcon, SettingsIcon} from "assets/icons";

import {AuthButtonWithModal} from "./AuthButtonWithModal";
import {useLocation} from "react-router";

const PaperWithBottomRoundings = styled(Paper)(({radius = 0}) => ({
    borderRadius: `0 0 ${radius}px ${radius}px`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const AppName = styled(Typography)({
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 18
});

const navButtonsConfig = [
    {Icon: UploadedIcon, route: routes.files},
    {Icon: ResearchIcon, route: routes.discussions},
    {Icon: SettingsIcon, route: routes.settings},
];

export const HeaderMenuComponent = ({login, logout, t, pageReload, isPortable, auth}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handlePageChange = (route) => {
        if (pathname.slice(1) === route) pageReload();
        else navigate(route);
    }

    return (
        <PaperWithBottomRoundings radius={isPortable ? 0 : 8}>
            <Box marginX={2}>
                <AppName color={'secondary'} onClick={() => handlePageChange(routes.viewer)}>
                    {t('app_name')}
                </AppName>
            </Box>
            <Box paddingX={0.5}>
                {auth ? (
                    <Fragment>
                        {navButtonsConfig.map(({Icon, route}, id) => (
                            <SquareIconButton
                                Icon={Icon}
                                onClick={() => handlePageChange(route)}
                                isActive={pathname.slice(1) === route}
                                key={id}
                            />
                        ))}
                    </Fragment>
                ) : (
                    <Fragment>
                        <InstallButton/>
                        <InfoButtonWithModal/>
                        <LangButtonWithSelection/>
                    </Fragment>
                )}
                <AuthButtonWithModal auth={auth} login={login} logout={logout} t={t}/>
            </Box>
        </PaperWithBottomRoundings>
    );
}