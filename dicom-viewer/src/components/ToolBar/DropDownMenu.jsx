import React, {useState} from "react";
import {Box, Paper, ClickAwayListener} from "@mui/material";

import {IconButtonWithTooltip} from "./IconButtonWithTooltip";

import {ButtonConstructor} from "./ButtonConstructor";

import styles from "./DropDownMenu.module.css";

export const DropDownMenu = ({colorScheme, title, Icon, isActive, closeOnSelect, numRows = 2, items}) => {
    const [isOpen, setIsOpen] = useState(null);

    const {color} = colorScheme;

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const menuWidth = 50 * numRows;
    const offset = 25 * (1 - numRows);

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box className={styles.menu}>
                <IconButtonWithTooltip
                    onClick={handleOpen}
                    title={title}
                    Icon={Icon}
                    color={color}
                    isActive={isActive}
                />
                {isOpen ? (
                    <Box className={styles.menuContent} left={offset}>
                        <Paper elevation={3}>
                            <Box className={styles.itemsContainer} width={menuWidth}>
                                {items.map((item, id) => (
                                    <ButtonConstructor
                                        {...item}
                                        onClick={(id) => {
                                            item.onClick(id);
                                            closeOnSelect && handleClose();
                                        }}
                                        color={color}
                                        key={id}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    )
}
