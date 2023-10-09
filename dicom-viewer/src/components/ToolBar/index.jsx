import React, {useState, useEffect, useMemo, Fragment} from "react";
import {Box} from "@mui/material";

import {viewerTools, historyActions, colorMapOptions, drawTools, viewerActions, displayModes} from '../../utility';
import {CircularProgressWithLabel} from "./CircularProgressWithLabel";

import {EditIcon, HistoryIcon, MoreIcon, PaletteIcon} from "../../assets/icons";
import {DropDownMenu} from "./DropDownMenu";

import styles from './index.module.css';
import {ButtonConstructor} from "./ButtonConstructor";

export const ToolBar = ({onChange, colorScheme, loaded, onControlAction, displayMode}) => {
    const [mode, setMode] = useState(null);
    const [colorMode, setColorMode] = useState(null);

    const {background, color} = colorScheme;

    useEffect(() => {
        if (loaded) {
            changeColorMap('plain');
            changeTool('zoomAndPan');
        }
    }, [loaded]);

    const changeColorMap = (id) => {
        const colorMapConfig = colorMapOptions.find(tool => tool.id === id);
        if (colorMapConfig) {
            setColorMode(id);
            onChange({colorMap: colorMapConfig.name})
        }
    };

    const changeTool = (id) => {
        const toolConfig = [...viewerTools, ...drawTools].find(tool => tool.id === id);
        if (toolConfig) {
            const {name, option} = toolConfig;
            setMode(id);
            onChange({name, option});
        }
    };

    const executeHistoryAction = (id) => {
        const historyActionConfig = historyActions.find(action => action.id === id);
        if (historyActionConfig) {
            const {name} = historyActionConfig;
            if (id === 'resetDisplay') {
                changeColorMap('plain');
                onChange({action: 'deleteDraws'});
            } else {
                onChange({action: name});
            }
        }
    };

    const baseMenuMemoized = useMemo(() => (
        <Fragment>
            {viewerTools.map((option, id) => (
                <ButtonConstructor
                    option={option}
                    onClick={changeTool}
                    isActive={mode === option.id}
                    key={`viewerTools_${id}`}
                    color={color}
                />
            ))}
        </Fragment>
    ), [loaded, mode, JSON.stringify(colorScheme)]);

    const drawMenuMemoized = useMemo(() => (
        <DropDownMenu
            title={'draw'}
            colorScheme={colorScheme}
            Icon={EditIcon}
            isActive={drawTools.some(tool => tool.id === mode)}
            closeOnSelect={true}
            items={drawTools.map((draw) =>
                ({option: draw, onClick: changeTool, isActive: mode === draw.id})
            )}
        />
    ), [loaded, mode, JSON.stringify(colorScheme)]);

    const colorMapMenuMemoized = useMemo(() => (
        <DropDownMenu
            title={'colorMap'}
            colorScheme={colorScheme}
            Icon={PaletteIcon}
            closeOnSelect={true}
            items={colorMapOptions.map((color) =>
                ({option: color, onClick: changeColorMap, isActive: colorMode === color.id})
            )}
        />
    ), [loaded, colorMode, JSON.stringify(colorScheme)]);

    const historyMenuMemoized = useMemo(() => (
        <DropDownMenu
            title={'history'}
            colorScheme={colorScheme}
            Icon={HistoryIcon}
            numRows={3}
            items={historyActions.map((history) =>
                ({option: history, onClick: executeHistoryAction})
            )}
        />
    ), [loaded, JSON.stringify(colorScheme)]);

    const viewerActionsMenu = (
        <DropDownMenu
            title={'options'}
            colorScheme={colorScheme}
            Icon={MoreIcon}
            numRows={1}
            closeOnSelect={true}
            items={viewerActions.map((option) =>
                ({option: option, onClick: onControlAction})
            )}
        />
    );

    const editMode = [displayModes.full, displayModes.edit];

    if (displayMode === displayModes.base) return null;

    return (
        <Box style={{background, border: `1px solid ${color}`}} className={styles.container}>
            <Box display={'flex'} alignItems={'center'}>
                {baseMenuMemoized}
                {editMode.includes(displayMode) ? drawMenuMemoized : null}
                {colorMapMenuMemoized}
                {editMode.includes(displayMode) ? historyMenuMemoized : null}
            </Box>
            {displayMode === displayModes.full ? viewerActionsMenu : null}
            {!loaded ? (
                <Box className={styles.loading}>
                    <CircularProgressWithLabel/>
                </Box>
            ) : null}
        </Box>
    )
}
