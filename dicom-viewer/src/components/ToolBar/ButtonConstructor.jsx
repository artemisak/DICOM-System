import React from "react";
import {IconButtonWithTooltip} from "./IconButtonWithTooltip";

export const ButtonConstructor = ({option, onClick, isActive, color}) => (
    <IconButtonWithTooltip
        title={option.id}
        Icon={option.Icon}
        onClick={() => onClick(option.id)}
        isActive={isActive}
        color={color}
    />
)