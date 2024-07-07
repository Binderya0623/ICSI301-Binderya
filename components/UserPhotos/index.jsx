import React from "react";
import axios from "axios";
import { Typography, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import TopBar from "../TopBar";

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  async componentDidMount() {
    if (this.props.match.params.userId) {
      await this.fetchPhotos();
      await this.fetchUserData();
    }
  }

  async fetchPhotos() {
    try {
      const photoResponse = await axios.get(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}`);
      console.log(`http://localhost:3000/photosOfUser/${this.props.match.params.userId}-аас хэрэглэгчийн зургийг амжилттай уншлаа.`);
      this.setState({ photos: photoResponse.data });
    } catch (error) {
      this.handleFetchError(error, "Зургуудыг уншиж байна...");
    }
  }

  async fetchUserData() {
    try {
      const userResponse = await axios.get(`http://localhost:3000/user/${this.props.match.params.userId}`);
      console.log(`http://localhost:3000/user/${this.props.match.params.userId}-аас хэрэглэгчийн мэдээллийг амжилттай уншлаа.`);
      this.setState({ user: userResponse.data });
      this.props.handler(`${userResponse.data.first_name} ${userResponse.data.last_name}`);
    } catch (error) {
      if (error.response) {
        console.log(`Хэрэглэгчийн мэдээллийг уншихад алдаа гарлаа: ${error.response.status}.`);
      } else if (error.request) {
        console.log(`Хэрэглэгчийн мэдээллийг уншихад алдаа гарлаа: Хүсэлтэд хариу ирсэнгүй`);
      } else {
        console.log(`Хэрэглэгчийн мэдээллийг уншихад алдаа гарлаа: Хүсэлт явуулахад алдаа гарлаа: ${error.message}`);
      }
    }
  }

  render() {
    const { photos, user } = this.state; // Updated from userInfo to user
    return (
      <div>
        <TopBar userDetail={user} /> {/* Updated prop name from userInfo to user */}
        {photos.length === 0 ? (
          <Typography variant="body2">No photos available.</Typography>
        ) : (
          <ImageList sx={{ width: "100%" }} cols={3} gap={8}>
            {photos.map((photo) => (
              <ImageListItem key={photo._id}>
                <img src={`../../images/${photo.file_name}`} alt={photo.title} loading="lazy" />
                <ImageListItemBar position="below" title={photo.date_time} />
                {photo.comments && (
                  <div>
                    <Typography variant="body2">Comments:</Typography>
                    {photo.comments.map((comment) => (
                      <div key={comment._id}>
                        <Typography variant="body2">
                          {comment.date_time} -{" "}
                          <Link to={`/users/:${comment.user._id}`}>
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>{" "}
                          - {comment.comment}
                        </Typography>
                      </div>
                    ))}
                  </div>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </div>
    );
  }
}

export default UserPhotos;