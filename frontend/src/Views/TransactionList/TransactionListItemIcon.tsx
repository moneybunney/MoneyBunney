import { Avatar, createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import { mdiBankTransfer, mdiBeer, mdiGlassWine } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

const iconMap = {
    0 : mdiBeer,
    1 : mdiGlassWine,
    2 : mdiBankTransfer,
};

interface IProps {
    iconId: number;

    // measurements in pixels
    size?: number;
    margin?: number;
    innerSize?: number;
    color?: string | null;
}

const TransactionListItemIcon = ({ iconId, margin, innerSize, size, color }: IProps) => {

    const resolveIconPath = (id: number) => {
        return (iconMap as any)[id];
    };
    // setting the defaults:
    // height / width => 48px
    // inner icon size => 3/4 * size
    // color => #fafafa

    const totalSizeFinal = size ? size : 48;
    const innerSizeFinal = innerSize ? innerSize : totalSizeFinal * 3 / 4;
    const colorFinal = color ? color : "#fafafa";
    const avatarStyles = {
        width: totalSizeFinal,
        height: totalSizeFinal,
        margin,
    };
    return (
        <Avatar style={avatarStyles}>
            <Icon
                path={resolveIconPath(iconId)}
                size={(innerSizeFinal) + "px"}
                color={colorFinal}
            />
        </Avatar>
    );
};

export default TransactionListItemIcon;
