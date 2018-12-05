import React, { Component } from 'react';
import firebase from 'firebase';
// import dada from '.dada';
import SubmissionsForm from './SubmissionsForm'
// import Likes from './Likes';
// import Login from './Login';
// import Moods from './Moods';
import Submission from './Submission';
// import RandomSubmission from './RandomSubmission';
import './App.css';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYKO4NUxYv7mh4EbS01NqnHd7BvVj38l4",
  authDomain: "project-6-1f870.firebaseapp.com",
  databaseURL: "https://project-6-1f870.firebaseio.com",
  projectId: "project-6-1f870",
  storageBucket: "project-6-1f870.appspot.com",
  messagingSenderId: "959955144530"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref(); //the root of firebase


class App extends Component {
  constructor() {
    super();
    this.state = {
      title:"",
      description:"",
      mood:"",
      image:"",
      submitted: {}

    };
  }

  componentDidMount() {
    //attach event listener to firebase
    dbRef.on('value', (snapshot) => {
      // console.log(snapshot.val()); //firebase method, return me an object the represents verything in the database.
      this.setState({
        submitted: snapshot.val()//firebase method. Firebase is sending us our brand new object
      })
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newSubmission = {
      title: this.state.title,
      description: this.state.description,
      mood: this.state.mood,
      image: this.state.image
    }
    dbRef.push(newSubmission); 

    this.setState({
      title: "",
      description: "",
      mood: "",
      image: "",
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value //square brackets evaluate the property
    })
    console.log(e.target.value)
  }

    render() {
      return (
        <div className="App">
          <Submission 
            submitted={this.state.submitted}
          />
          <SubmissionsForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />
        </div>
      );
    }
} 
export default App;
