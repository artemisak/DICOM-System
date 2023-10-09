import React, {useEffect, useState, useMemo} from 'react';
import {Box} from "@mui/material";

import {
    exportJSON,
    importJSON,
    translate,
    defaultColorScheme,
    displayModes,
    mergeMarkups
} from "../utility";

import {LocaleContext} from '../contexts';

import {FileDropZone} from './FileDropZone';
import {WorkSpace} from './WorkSpace';
import {Fullscreen} from "./Fullscreen";

const genTimeKey = () => new Date().getTime();

export const DicomViewer = (props) => {
    const {
        data = null,
        markup = null,
        additionalMarkup = null,
        onDataChange = () => {},
        onMarkupChange = () => {},
        onError = () => {},
        colorScheme = defaultColorScheme,
        locale = 'en',
        displayMode = displayModes.full,
        fullscreenEnabled = true
    } = props;

    const externalMarkup = useMemo(() => {
        return JSON.stringify(mergeMarkups(JSON.parse(markup), JSON.parse(additionalMarkup)))
    }, [markup, additionalMarkup]);

    const [localData, setLocalData] = useState(data);
    const [localMarkup, setLocalMarkup] = useState(externalMarkup);
    const [timeKey, setTimeKey] = useState(genTimeKey());

    useEffect(() => {
        if (localData !== data) setLocalData(data);
    }, [data]);

    useEffect(() => {
        if (localData !== data) onDataChange(localData)
    }, [localData]);

    useEffect(() => {
        if (localMarkup !== externalMarkup) {
            setLocalMarkup(externalMarkup);
        }
    }, [externalMarkup]);

    useEffect(() => {
        if (localMarkup !== externalMarkup || externalMarkup) {
            onMarkupChange(localMarkup)
        }
    }, [localMarkup]);

    useEffect(() => externalMarkup !== localMarkup && executeRerender(), [externalMarkup])

    const executeRerender = () => setTimeKey(genTimeKey());

    const exportMarkup = () => {
        exportJSON(localMarkup, `DICOM_Markup_${genTimeKey()}.json`);
    }

    const importMarkup = () => {
        importJSON((json) => {
            setLocalMarkup(json);
            executeRerender();
        });
    }

    const resetViewer = () => {
        setLocalData(null);
        setLocalMarkup(null);
    }

    const onControlAction = (actionId) => {
        const actions = {
            delete: resetViewer,
            export: exportMarkup,
            import: importMarkup,
        };
        if (Object.keys(actions).includes(actionId)) actions[actionId]?.();
    }

    const {color, background} = {...defaultColorScheme, ...colorScheme};

    const translateBroker = (title) => translate(title, locale);

    return (
        <LocaleContext.Provider value={{lang: locale, translate: translateBroker}}>
            <Box id={'dicom_viewer'}>
                {localData ? (
                    <Fullscreen
                        color={color}
                        fullscreenEnabled={fullscreenEnabled && displayMode !== displayModes.base}
                        rerender={executeRerender}
                        Component={WorkSpace}
                        componentProps={{
                            data: localData,
                            markup: localMarkup ? JSON.parse(localMarkup) : null,
                            onError: onError,
                            colorScheme: {color, background},
                            onMarkupChange: (newMarkup) => setLocalMarkup(JSON.stringify(newMarkup)),
                            displayMode: displayMode,
                            onControlAction: onControlAction,
                            key: timeKey
                        }}
                    />
                ) : (
                    <FileDropZone
                        onChange={(arrayBuffer) => setLocalData(arrayBuffer)}
                        onError={onError}
                        colorScheme={{color, background}}
                    />
                )}
            </Box>
        </LocaleContext.Provider>
    );
}