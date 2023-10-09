import {Route, Navigate, HashRouter, Routes} from "react-router-dom";
import React, {Fragment, useContext, useState} from "react";
import {Box} from "@mui/material";

import {routes} from "utility/constants";
import {AuthContext} from "providers/contexts";

import {HomePage} from "./HomePage";
import {FilesPage} from "./FilesPage";
import {DiscussionsPage} from "./DiscussionsPage";
import {SettingsPage} from "./SettingsPage";
import {HeaderMenu} from "components/HeaderMenu";

const getTimeKey = () => new Date().getTime();

export const AppRoutes = () => {
    const [pageKey, setPageKey] = useState(getTimeKey());
    const {auth} = useContext(AuthContext);

    return (
        <HashRouter>
            <Box width={'100%'} marginBottom={2}>
                <HeaderMenu pageReload={() => setPageKey(getTimeKey())}/>
            </Box>
            <Box padding={1} key={pageKey}>
                <Routes>
                    <Route exact path={routes.viewer} element={<HomePage/>}/>
                    {auth ? (
                        <Fragment>
                            <Route exact path={routes.files} element={<FilesPage/>}/>
                            <Route exact path={routes.discussions} element={<DiscussionsPage/>}/>
                            <Route exact path={routes.settings} element={<SettingsPage/>}/>
                            <Route path="*" element={<Navigate to={routes.viewer}/>}/>
                        </Fragment>
                    ) : (
                        <Route path="*" element={<Navigate to={routes.viewer}/>}/>
                    )}
                </Routes>
            </Box>
        </HashRouter>
    )
}