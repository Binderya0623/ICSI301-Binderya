import React from "react";
import axios from "axios";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import "./styles.css";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/user/list")
      .then(response => {
        if (!response.status === 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data;
      })
      .then(data => {
        this.setState({ users: data });
      })
      .catch(error => {
        console.error("Хэрэглэгчийн жагсаалтыг уншихад алдаа гарлаа! : ", error);
      });
  }
  
  render() {
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. I chose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display the users like so:
        </Typography>
        <List component="nav">
          {this.state.users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem button component={Link} to={`/users/:${user._id}`}>
                <ListItemText primary={`${user.first_name} ${user.last_name}`} />
              </ListItem>
              {/* <Link to={`/users/:${user._id}`}>
                {`${user.first_name} ${user.last_name}`}
              </Link> */}
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Typography variant="body1">
          I used to fetch the model from window.cs142models.userListModel(), but now I&lsquo;ve shifted to using Express.js for handling server-side logic.
        </Typography>
      </div>
    );
  }
}

export default UserList;