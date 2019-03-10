import classes from "*.module.css";
import { Avatar, CircularProgress, createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import { mdiBankTransfer, mdiBeer, mdiGlassWine } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

const iconMap = {
    0 : mdiBeer,
    1 : mdiGlassWine,
    2 : mdiBankTransfer,
};

interface IProps {
    iconId?: number;

    // measurements in pixels
    size?: number;
    margin?: number;
    innerSize?: number;
    color?: string | null;
    loading?: boolean;
}

const TransactionListItemIcon = ({ iconId, margin, innerSize, size, color, loading }: IProps) => {

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
    const avatarSizeStyle = {
        width: totalSizeFinal,
        height: totalSizeFinal,
        margin,
    };

    const getLoadingDummy = () => {
        return(
        <div style={avatarSizeStyle}>
            <CircularProgress
                size={innerSizeFinal}
            />
        </div>
        );
    };

    const getItemIcon = (icId: number) => {
        return(
        <Avatar style={avatarSizeStyle}>
            <Icon
                path={resolveIconPath(icId)}
                size={(innerSizeFinal) + "px"}
                color={colorFinal}
            />
        </Avatar>
        );
    };

    if (loading || iconId === undefined) {
        return getLoadingDummy();
    } else {
        return getItemIcon(iconId);
    }
};

export default TransactionListItemIcon;
