import React, { useEffect, useContext, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../UCProvider";
function AboutUser() {
  var {
    user,
    comments,
    setComments,
    newComment,
    setNewComment,
    updateComment,
    setUpdateComment,
  } = useContext(UserContext);

  useEffect(() => {
    function usercomments() {
      axios
        .get("http://localhost:4000/getcomment", { withCredentials: true })
        .then((res) => {
          setComments(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    usercomments();
  }, []);

  function handleNewComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/setcomment",
        {
          text: newComment,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setNewComment("");
        setComments([...comments, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateComment(_id: string) {
    axios
      .put(
        `http://localhost:4000/updatecomment/${_id}`,
        {
          text: updateComment,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUpdateComment("");
        setComments(
          comments.map((val) => {
            return val._id === _id
              ? {
                  _id: val._id,
                  user_email: val.user_email,
                  text: updateComment,
                }
              : val;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteComment(_id: string) {
    axios
      .delete(`http://localhost:4000/deletecomment/${_id}`, {
        withCredentials: true,
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val._id !== _id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  var displayComments = comments.map((comment) => {
    return (
      <div key={comment._id}>
        <p>_ID: {comment._id} </p>
        <p>Text: {comment.text} </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateComment(comment._id);
          }}
        >
          <input
            type="text"
            placeholder="Update Comment"
            value={updateComment}
            onChange={(event) => setUpdateComment(event.target.value)}
            required
          />
          <br /> <br />
          <button type="submit">
            <FontAwesomeIcon icon={faPen} /> Update Comment
          </button>{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteComment(comment._id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Delete Comment
          </button>
        </form>

        <p>.................................</p>
      </div>
    );
  });

  return (
    <div className="container mt-1">
      <br />
      <h3>About User </h3>
      <p>_ID: {user._id} </p>
      <p>Name: {user.name} </p>
      <p>Email: {user.email} </p>
      <p>.................................</p>
      <form onSubmit={handleNewComment}>
        <textarea
          cols={30}
          rows={5}
          placeholder="New Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <br />
        <button className="mt-3" type="submit">
          Submit
        </button>
      </form>
      <h3>{comments.length} Comments of the user </h3>
      {displayComments}
      {user.email === "" && <Navigate to="/" />}
    </div>
  );
}

export default AboutUser;
