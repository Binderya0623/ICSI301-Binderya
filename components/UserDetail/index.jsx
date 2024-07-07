import React from "react";
import axios from "axios";
import { 
  Typography, 
  Button 
} from "@mui/material";

import { Link } from "react-router-dom";

import TopBar from "../TopBar";
import "./styles.css";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: {} };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUserData();
    }
  }

  async fetchUserData() {
    const userId = this.props.match.params.userId.substring(1);
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      this.setState({ userInfo: response.data });
    } catch (error) {
      console.error("Хэрэглэгчийн мэдээллийг уншихад алдаа гарлаа! : ", error);
    }
  }  

  render() {
    const { userInfo } = this.state;
    return (
      <div className="user-detail-container">
        <TopBar userDetail={userInfo} />
        <ul className="user-detail-info">
          <li>{userInfo.first_name} {userInfo.last_name}</li>
          <li>Location: {userInfo.location}</li>
          <li>Description: {userInfo.description}</li>
          <li>Occupation: {userInfo.occupation}</li>
        </ul>
        <Typography variant="body1" className="user-detail-button">
          <Button variant="contained" component={Link} to={`/photos/${userInfo._id}`}>
            View Photos
          </Button>
        </Typography>
      </div>
    );
  }  
}

export default UserDetail;
