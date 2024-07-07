import React from "react";
import ReactDOM from "react-dom";
import { Grid, Paper, Typography } from "@mui/material";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login"; // Import the Login component
import Register from "./components/Register"; // Import the Register component
import PhotoUpload from "./components/PhotoUpload"; // Import the PhotoUpload component

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: null,
    };
  }

  handleUserDetailChange = (userDetail) => {
    this.setState({ userDetail });
  };

  render() {
    const { userDetail } = this.state;
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar userDetail={userDetail} />
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    path="/login"
                    render={(props) => <Login {...props} />}
                  />
                  <Route
                    path="/register"
                    render={(props) => <Register {...props} />}
                  />
                  <Route
                    path="/upload"
                    render={(props) => <PhotoUpload {...props} />}
                  />
                  <Route
                    path="/users/:userId"
                    render={(props) => (
                      <UserDetail {...props} handler={this.handleUserDetailChange} />
                    )}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => (
                      <UserPhotos {...props} handler={this.handleUserDetailChange} />
                    )}
                  />
                  <Route path="/users" component={UserList} />
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <div>
                        <Typography variant="body1">
                          Welcome to your photosharing app! This{" "}
                          <a href="https://mui.com/components/paper/">Paper</a>{" "}
                          component displays the main content of the application.
                          The {"sm={9}"} prop in the{" "}
                          <a href="https://mui.com/components/grid/">Grid</a> item
                          component makes it responsively display 9/12 of the
                          window. The Switch component enables us to conditionally
                          render different components to this part of the screen.
                          You don&apos;t need to display anything here on the
                          homepage, so you should delete this Route component once
                          you get started.
                        </Typography>
                      </div>
                    )}
                  />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));