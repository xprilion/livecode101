import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { db, myFirebase } from "../firebase/firebase";

class CompleteSignup extends Component {
  state = {
    name: "",
    collegeName: "",
    uid: "",
  };

  componentDidMount() {
    const self = this;
    myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let uid = user.uid;
        self.setState({ uid: uid });

        var userRef = db.collection("users").doc(uid);

        userRef
          .get()
          .then(function (doc) {
            if (doc.exists) {
              var data = doc.data();
              self.setState({ name: data.name });
              self.setState({ collegeName: data.collegeName });
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      } else {
        // No user is signed in.
      }
    });
  }

  handleNameChange = (value) => {
    this.setState({ name: value });
  };

  handleCollegeNameChange = (value) => {
    this.setState({ collegeName: value });
  };

  handleSubmit = () => {
    const { name, collegeName } = this.state;

    console.log(name);
    console.log(collegeName);

    db.collection("users").doc(this.state.uid).set({
        name: this.state.name,
        collegeName: this.state.collegeName
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  };

  render() {
    return (
      <div>
        <h1>Complete Sign Up</h1>
        <Container component="main" maxWidth="xs">
          <Paper>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={this.state.name}
              onChange={(event) => this.handleNameChange(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="collegeName"
              label="College Name"
              name="collegeName"
              value={this.state.collegeName}
              onChange={(event) =>
                this.handleCollegeNameChange(event.target.value)
              }
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default CompleteSignup;
