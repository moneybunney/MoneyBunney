import { Avatar, CircularProgress } from "@material-ui/core";
import * as MaterialDesignIcons from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

const size = 48;
const color = "#fafafa";
const innerSize = 36;

const avatarSizeStyle = {
  width: size,
  height: size
};

const resolveIconPath = (id: string) => {
  const iconMap = MaterialDesignIcons as any;
  const icon = iconMap[id];
  if (icon === undefined) {
    console.error(`Not existing category icon provided ${id}`);
  }
  return icon;
};

interface IItemIconProps {
  iconId: string;
}

const ItemIcon = ({ iconId }: IItemIconProps) => {
  return (
    <Avatar style={avatarSizeStyle}>
      <Icon
        path={resolveIconPath(iconId)}
        size={innerSize + "px"}
        color={color}
      />
    </Avatar>
  );
};

const LoadingDummy = () => {
  const loaderStyle = {
    ...avatarSizeStyle,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={loaderStyle}>
      <CircularProgress size={innerSize} />
    </div>
  );
};

interface IProps {
  iconId?: string;
  loading?: boolean;
}

const TransactionListItemIcon = ({ iconId, loading }: IProps) => {
  if (loading || iconId === undefined) {
    return <LoadingDummy />;
  } else {
    return <ItemIcon iconId={iconId} />;
  }
};

export default TransactionListItemIcon;
