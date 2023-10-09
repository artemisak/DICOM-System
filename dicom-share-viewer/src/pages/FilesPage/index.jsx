import React, {Fragment, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FilesList} from "pages/FilesPage/FilesList";
import {api} from "api/index";
import {SkeletonItemListLoader} from "components/SkeletonItemListLoader";
import {DataLoader} from "components/SimpleServerRequests/DataLoader";
import {Box, Fade} from "@mui/material";
import {routes} from "utility/constants";
import {HeaderWithButton} from "components/HeaderWithButton";
import {LocaleContext} from "providers/contexts";

export const FilesPage = () => {
    const navigate = useNavigate();
    const {t} = useContext(LocaleContext);

    const [selected, setSelected] = useState(null);

    return (
        <Fragment>
            <Fade in={!selected} unmountOnExit>
                <Box>
                    <HeaderWithButton
                        title={t('my_files')}
                        buttonText={t('upload_new_file')}
                        buttonOnClick={() => navigate(`../${routes.viewer}`)}
                    />
                </Box>
            </Fade>
            <DataLoader
                RenderComponent={FilesList}
                baseProps={{navigate, selected, setSelected, t}}
                request={api.get.files}
                LoaderComponent={SkeletonItemListLoader}
            />
        </Fragment>

    );
}