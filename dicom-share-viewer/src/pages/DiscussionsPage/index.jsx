import React, {Fragment, useContext, useState} from "react";
import {LocaleContext} from "providers/contexts";
import {api} from "api";
import {SkeletonItemListLoader} from "components/SkeletonItemListLoader";
import {DataLoader} from "components/SimpleServerRequests/DataLoader";
import {DiscussionsList} from "./DiscussionsList";
import {Header} from "./Header";
import {Box, Fade} from "@mui/material";

export const DiscussionsPage = () => {
    const {t} = useContext(LocaleContext);

    const [selected, setSelected] = useState(null);

    return (
        <Fragment>
            <Fade in={!selected} unmountOnExit>
                <Box>
                    <Header t={t}/>
                </Box>
            </Fade>
        <DataLoader
            RenderComponent={DiscussionsList}
            baseProps={{t, selected, setSelected}}
            request={api.get.discussions}
            LoaderComponent={SkeletonItemListLoader}
        />
        </Fragment>
    );
}