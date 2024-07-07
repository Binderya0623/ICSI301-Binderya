import React from "react";
import axios from "axios";
import { 
  AppBar, 
  Toolbar, 
  Typography 
} from "@mui/material";

import { withRouter } from "react-router-dom";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextInfo: "",
      versionNumber: null,
    };
  }

  componentDidMount() {
    this.updateContextInfo();
    this.fetchVersionNumber();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.updateContextInfo();
    }
  }

  updateContextInfo() {
    const { pathname } = this.props.location;
    const parts = pathname.split("/");
    const contextInfo = parts[1] === "users" ? "User Details" : "Photos";
    this.setState({ contextInfo });
  }

  fetchVersionNumber() {
    axios.get("http://localhost:3000/test/info")
      .then((response) => {
        const versionNumber = response.data.__v;
        this.setState({ versionNumber });
      })
      .catch((error) => {
        console.error("Error fetching version number:", error);
      });
  }

  render() {
    const { contextInfo, versionNumber } = this.state;
    const { userDetail } = this.props;
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Bindertsetseg 22B1NUM0027
            Version: {versionNumber}
          </Typography>
          <Typography variant="h6" color="inherit">
            &nbsp;Сайн уу
            Version: {versionNumber}
          </Typography>
          <Typography variant="h6" color="inherit" style={{ marginLeft: "auto" }}>
            {contextInfo === "User Details" && userDetail && userDetail.first_name && userDetail.last_name && `${userDetail.first_name} ${userDetail.last_name}`}
            {contextInfo === "Photos" && userDetail && userDetail.first_name && userDetail.last_name && `Photos of ${userDetail.first_name} ${userDetail.last_name}`}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(TopBar);