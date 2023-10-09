import React, {useState, Fragment, useEffect, useRef} from "react";
import {Box, ButtonGroup} from "@mui/material";

import {api} from "api";
import {requestStatus, viewerModes} from "utility/constants";
import {UploadButton} from "./UploadButton";
import {ViewerLoader} from "@libs/ExternalLoader";
import {ViewerSkeletonLoader} from "components/Viewer/ViewerSkeletonLoader";
import {ResearchList} from "components/Viewer/ResearchList";
import {ReportModal} from "components/ReportModal";

export const ViewerComponent = ({fileId, discussionId, withResearches, lang, auth, isPortable, t}) => {
    const [mode, setMode] = useState(null);

    const [file, setFile] = useState(null);
    const [markups, setMarkups] = useState(null);
    const [researches, setResearches] = useState(null);

    const [savedFileId, setSavedFileId] = useState(null);

    const [fileStatus, setFileStatus] = useState(requestStatus.READY);
    const [markupStatus, setMarkupStatus] = useState(requestStatus.READY);
    const [researchesStatus, setResearchesStatus] = useState(requestStatus.READY);

    const [selectedResearches, setSelectedResearches] = useState([]);

    const viewerRef = useRef(null);

    useEffect(() => {
        if (fileId) {
            loadFile(fileId, discussionId);
            if (withResearches) loadResearches(fileId, discussionId);
        }
    }, []);

    useEffect(() => {
        if (auth) {
            if ((fileId || savedFileId) && !file) return setMode(null);
            if (selectedResearches.length && !markups?.length) return setMode(null);
            if (selectedResearches.length) return setMode(viewerModes.view);
            else return setMode(viewerModes.edit);
        } else {
            return setMode(viewerModes.full)
        }
    }, [auth, file, fileId, savedFileId, JSON.stringify(markups), JSON.stringify(selectedResearches)]);

    const selectExistResearches = (researchIds) => {
        setSelectedResearches(researchIds);
        loadResearch(researchIds, discussionId);
    }

    const loadFile = (reqFileId, reqDiscussionId) => {
        setFile(null);
        if (!reqFileId) {
            setFileStatus(requestStatus.READY);
        } else {
            setFileStatus(requestStatus.LOADING);
            api.get.file({fileId: reqFileId, discussionId: reqDiscussionId})
                .then(({data}) => {
                    setFile(data);
                    setFileStatus(requestStatus.READY);
                })
                .catch(() => setFileStatus(requestStatus.ERROR))
        }
    }

    const loadResearch = (reqResearchIds, reqDiscussionId) => {
        setMarkups(null);
        if (!reqResearchIds.length) {
            setMarkupStatus(requestStatus.READY);
        } else {
            setMarkupStatus(requestStatus.LOADING);
            const requestList = reqResearchIds.map(reqResearchId =>
                api.get.research({researchId: reqResearchId, discussionId: reqDiscussionId})
            )
            Promise.all(requestList)
                .then((response) => {
                    setMarkups(response.map(({data}) => JSON.stringify(data)));
                    setMarkupStatus(requestStatus.READY);
                })
                .catch(() => setMarkupStatus(requestStatus.ERROR))
        }
    }

    const loadResearches = (reqFileId, reqDiscussionId) => {
        setResearches(null);
        if (!reqFileId) {
            setResearchesStatus(requestStatus.READY);
        } else {
            setResearchesStatus(requestStatus.LOADING);
            api.get.researches({fileId: reqFileId, discussionId: reqDiscussionId})
                .then(({data}) => {
                    setResearches(data);
                    setResearchesStatus(requestStatus.READY);
                })
                .catch(() => setResearchesStatus(requestStatus.ERROR))
        }
    }

    const onSuccessResearchSave = (id) => {
        setSelectedResearches([id]);
        if (withResearches) loadResearches(fileId, discussionId);
    }

    const canvases = Array.from(viewerRef.current?.getElementsByTagName('canvas') || []);

    return (
        <Fragment>
            {withResearches ? (
                <Box marginBottom={2}>
                    <ResearchList
                        onSelect={selectExistResearches}
                        isPortable={isPortable}
                        data={researches}
                        status={researchesStatus}
                        reload={() => loadResearches(fileId, discussionId)}
                        t={t}
                    />
                </Box>
            ) : null}
            {[fileStatus, markupStatus].includes(requestStatus.LOADING) ? (
                <ViewerSkeletonLoader/>
            ) : (
                <Fragment>
                    {mode ? (
                        <div ref={viewerRef}>
                            <ViewerLoader
                                data={file}
                                markup={markups?.[0]}
                                additionalMarkup={markups?.[1]}
                                onDataChange={data => setFile(data)}
                                onMarkupChange={markup => setMarkups([markup])}
                                locale={lang}
                                displayMode={mode}
                                fullscreenEnabled={!isPortable}
                            />
                            {auth && !(selectedResearches.length) ? (
                                <Box marginTop={2} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <ButtonGroup
                                        variant={'contained'}
                                        orientation={isPortable ? 'vertical' : 'horizontal'}
                                        sx={{
                                            width: '100%',
                                            boxShadow: 'none',
                                            '& > button': {
                                                width: '100%',
                                                margin: 0.25
                                            }
                                        }}
                                    >
                                        <UploadButton
                                            markup={markups && markups[0]}
                                            file={file}
                                            fileId={savedFileId || fileId}
                                            discussionId={discussionId}
                                            setFileId={setSavedFileId}
                                            setMarkupId={onSuccessResearchSave}
                                            t={t}
                                        />
                                        {file ? (
                                            <ReportModal canvases={canvases}/>
                                        ) : null}
                                    </ButtonGroup>
                                </Box>
                            ) : null}
                        </div>
                    ) : null}
                </Fragment>
            )}

        </Fragment>
    );
}

