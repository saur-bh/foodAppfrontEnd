// imports
import React, { Component } from "react";
import { withStyles, withTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Modal from "@material-ui/core/Modal";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputIcon from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FastFood from "@material-ui/icons/Fastfood";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import "./Header.css";
import { Button, InputAdornment } from "@material-ui/core";

function TabContainer(props) {
  return <div className="tab-container">{props.children}</div>;
}

const styles = {
  underline: {
    "&:after": {
      height: "2px",
      backgroundColor: "white"
    }
  }
};

class Header extends Component {
  state = {
    username: "UpGrad",
    modalOpen: false,
    value: 0,
    isLoggedIn: false,
    renderProfileMenu: false,
    anchorEl: null
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
    this.handleCloseModal();
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    this.handleCloseProfileMenu();
  };

  handleOpenProfileMenu = event => {
    this.setState({ renderProfileMenu: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseProfileMenu = () => {
    this.setState({ renderProfileMenu: false });
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const open = Boolean(this.state.anchorEl);
    return (
      <div className="header-container">
        <AppBar className="navbar" position="static">
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              style={{ alignItems: "center" }}
              spacing={24}
            >
              <Grid item>
                <FastFood className="navbar-brand" />
              </Grid>
              <Grid item>
                <div className="search-bar-container">
                  <Input
                    classes={{
                      underline: classes.underline
                    }}
                    className="search-bar"
                    fullWidth={true}
                    placeholder="Search by Restaurant Name"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </div>
              </Grid>
              <Grid item>
                {!this.state.isLoggedIn ? (
                  <div>
                    <Button variant="contained" onClick={this.handleOpenModal}>
                      <AccountCircle style={{ marginRight: "5px" }} />
                      Login
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      className="btn-profile"
                      onClick={this.handleOpenProfileMenu}
                    >
                      <AccountCircle
                        style={{ marginRight: "5px" }}
                        className="btn-profile"
                      />
                      UpGrad
                    </Button>
                    <Menu
                      className="my-menu"
                      id="menu-appbar"
                      anchorEl={this.state.anchorEl}
                      children="menu-list"
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                      open={open}
                      onClose={this.handleCloseProfileMenu}
                    >
                      {this.state.renderProfileMenu ? (
                        <div className="menu-item-container">
                          <MenuList id="menu-list">
                            <MenuItem className="menu-item">
                              My Profile
                            </MenuItem>
                            <MenuItem
                              className="menu-item"
                              onClick={this.handleLogout}
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </div>
                      ) : null}
                    </Menu>
                  </div>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="header-modal"
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
        >
          <div className="modal-container">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <FormControl className="login-form">
                  <Input fullWidth={true} placeholder="Contact No.*" />
                  <Input
                    fullWidth={true}
                    placeholder="Password*"
                    id="passInput"
                    style={{ marginTop: "10%", marginBottom: "10%" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="btn-login"
                    style={{ marginTop: "20%" }}
                    onClick={this.handleLogin}
                  >
                    Login
                  </Button>
                </FormControl>
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <FormControl className="login-form">
                  <Input fullWidth={true} placeholder="First Name *" />
                  <Input
                    fullWidth={true}
                    placeholder="Last Name"
                    id="passInput"
                    style={{ marginTop: "10%" }}
                  />
                  <Input
                    fullWidth={true}
                    placeholder="Email *"
                    id="passInput"
                    style={{ marginTop: "10%" }}
                  />
                  <Input
                    fullWidth={true}
                    placeholder="Password *"
                    id="passInput"
                    style={{ marginTop: "10%" }}
                  />
                  <Input
                    fullWidth={true}
                    placeholder="Contact No. *"
                    id="passInput"
                    style={{ marginTop: "10%", marginBottom: "10%" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="btn-login"
                    style={{ marginTop: "20%" }}
                  >
                    Signup
                  </Button>
                </FormControl>
              </TabContainer>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

// export
export default withStyles(styles)(Header);
