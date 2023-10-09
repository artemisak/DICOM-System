import React, {useState, Fragment, useContext} from "react";
import {Menu, MenuItem} from "@mui/material";
import {localesConfig} from "utility/constants";
import {SquareIconButton} from "../SquareIconButton";
import {LanguageIcon} from "assets/icons";
import {LocaleContext} from "providers/contexts";

export const LangButtonWithSelection = () => {
    const {setLang} = useContext(LocaleContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const onChangeHandler = (value) => {
        setLang(value);
        setAnchorEl(null);
    }

    return (
        <Fragment>
            <SquareIconButton
                Icon={LanguageIcon}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                {Object.keys(localesConfig).map((locale, id) => (
                    <MenuItem onClick={() => onChangeHandler(localesConfig[locale].value)} key={id}>
                        {localesConfig[locale].title}
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}