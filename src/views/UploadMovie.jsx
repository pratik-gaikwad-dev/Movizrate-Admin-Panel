import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Input } from "antd";
import "../css/UploadMovie.css";
const { TextArea } = Input;

const UploadMovie = () => {
  const [imageURL, setImageURL] = useState("");
  const [posterImageUrl, setPosterImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [type, setType] = useState("");
  const [videoID, setVideoID] = useState("");

  const props = {
    name: "file",
    accept: "image/png, image/jpeg, image/jpg",
    listType: "picture",
    action: "http://127.0.0.1:3000/api/v1/movies/uploadimage",
    multiple: false,
    async onChange(info) {
      if (info.file.status !== "uploading") {
        setImageURL(info.file.response.filePath);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(info) {
      try {
        const requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          `http://127.0.0.1:3000/api/v1/movies/deleteimage/${info.response.fileName}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.deleted) {
              message.success("File Deleted.");
            }
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
      }
    },
  };
  const props2 = {
    name: "file",
    accept: "image/png, image/jpeg, image/jpg",
    listType: "picture",
    action: "http://127.0.0.1:3000/api/v1/movies/uploadimage",
    multiple: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        setPosterImageUrl(info.file.response.filePath);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(info) {
      try {
        const requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          `http://127.0.0.1:3000/api/v1/movies/deleteimage/${info.response.fileName}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.deleted) {
              message.success("File Deleted.");
            }
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log(error);
      }
    },
  };

  const onSubmit = () => {
    if (imageURL.length === 0) {
      return message.error("Please select a image.");
    }

    if (posterImageUrl.length === 0) {
      return message.error("Please select a poster image");
    }
    if (movieName.length === 0) {
      return message.error("Please enter movie name");
    }
    if (genre.length === 0) {
      return message.error("Please enter movie genre");
    }
    if (description.length === 0) {
      return message.error("Please enter movie description");
    }
    if (type.length === 0) {
      return message.error("Please enter movie type");
    }
    if (videoID.length === 0) {
      return message.error("Please enter movie videoID");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: movieName,
      image: imageURL,
      posterImage: posterImageUrl,
      genre: genre,
      desc: description,
      type: type,
      videoID: videoID,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3000/api/v1/movies/uploadmovie", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.uploaded) {
          message.success("Movie is uploaded");
          setImageURL("");
          setPosterImageUrl("");
          setMovieName("");
          setDescription("");
          setGenre("");
          setType("");
          setVideoID("");
          props.showUploadList = false;
          props2.listType = false;
        } else {
          message.error("Failure!");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="upload-movie-container">
        <div className="upload-movie-main">
          <div className="upload-movie-item">
            <Upload {...props}>
              <Button className="upload-items" icon={<UploadOutlined />}>
                Click to Upload Poster Image
              </Button>
            </Upload>
          </div>
          <div className="upload-movie-item">
            <Upload {...props2}>
              <Button className="upload-items" icon={<UploadOutlined />}>
                Click to Upload Image
              </Button>
            </Upload>
          </div>
          <div className="upload-movie-item">
            <Input
              className="upload-items"
              onChange={(e) => setMovieName(e.target.value)}
              value={movieName}
              placeholder="Enter movie name"
            />
          </div>
          <div className="upload-movie-item">
            <Input
              className="upload-items"
              placeholder="Enter movie genere seperated by comma"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="upload-movie-item">
            <Input
              className="upload-items"
              placeholder="Enter type Movie/TV-Series"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="upload-movie-item">
            <Input
              className="upload-items"
              placeholder="Enter trailer ID"
              value={videoID}
              onChange={(e) => setVideoID(e.target.value)}
            />
          </div>
          <div className="upload-movie-item">
            <TextArea
              rows={6}
              className="upload-items"
              placeholder="Enter movie description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="upload-movie-item">
            <Button className="upload-items" onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMovie;