import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mainListItems, secondaryListItems } from './ListItems';

import {
  AppBar, Toolbar, IconButton, Typography,
  createStyles, Theme,
  withStyles, WithStyles,
  Badge, Divider, Drawer, List
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 240;
const styles = (theme: Theme) =>
  createStyles({
    appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },

  drawerPaper: {
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  menuButton: {
    marginLeft: -16,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    ...theme.mixins.toolbar,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 8px',
  }
});

export interface Props extends WithStyles<typeof styles> {}

interface State {
  anchorEl: null | HTMLElement;
}

class Header extends React.Component<Props, State> {
  state: State = {
    anchorEl: null
  };

  public handleDrawerOpen = (event: React.MouseEvent<HTMLElement>) => {
   this.setState({ anchorEl: event.currentTarget });
 };

 public handleDrawerClose = () => {
   this.setState({ anchorEl: null });
};

  render() {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const { classes } = this.props;

    return (
      <React.Fragment>
      <div className={classes.root}>
        <AppBar
        position="absolute"
        className={classNames(classes.appBar, isMenuOpen && classes.appBarShift)}
        >
         <Toolbar disableGutters={isMenuOpen} className={classes.toolbar}>
             <IconButton
               color="inherit"
               onClick={this.handleDrawerOpen}
               className={classNames(classes.menuButton, isMenuOpen && classes.menuButtonHidden)}
             >
               <MenuIcon />
             </IconButton>
             <Typography variant="title" color="inherit" noWrap className={classes.title}>
               MoneyBunney
             </Typography>
             <IconButton color="inherit">
               <Badge badgeContent={1} color="secondary">
                 <NotificationsIcon />
               </Badge>
             </IconButton>
           </Toolbar>
         </AppBar>
         <Drawer
           variant="permanent"
           classes={{
             paper: classNames(classes.drawerPaper, !isMenuOpen && classes.drawerPaperClose)
           }}
           open={!isMenuOpen}
         >
           <div className={classes.toolbarIcon}>
             <IconButton onClick={this.handleDrawerClose}>
               <ChevronLeftIcon />
             </IconButton>
           </div>
           <Divider />
           <List>{mainListItems}</List>
           <Divider />
           <List>{secondaryListItems}</List>
         </Drawer>
       </div>
     </React.Fragment>
   );
 }
}

(Header as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Header);