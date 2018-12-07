import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import dadPhotos from './dadPhotos';
// import dada from '.dada';
import SubmissionsForm from './SubmissionsForm'
// import Likes from './Likes';
import Login from './Login';
import Moods from './Moods';
import Submission from './Submission';
// import RandomSubmission from './RandomSubmission';
import './App.css';


const dbRef = firebase.database().ref(); //the root of firebase

// Choose random image from array of images
function imageRandom(array) {
  return array[Math.floor(Math.random() * (array.length))];
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      title:"",
      description:"",
      mood:"",
      image:"",
      like:1,
      userArray: [],
      submitted: {},
      user: null,
      uid: "",
      showForm: false

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
    // Keeps the user logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          user,
          uid: user.uid,
          name: user.displayName,
          userImg: user.photoURL,
          loggedOut: false 
        });
      }
    });    
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // When user submits form, create object that records values of user submission
    const newSubmission = {
      title: this.state.title,
      description: this.state.description,
      mood: this.state.mood,
      image: imageRandom(dadPhotos),
      likes: 1,
      userArray: ["test", "test2"]
    }

    // Push new object to store to firebase
    dbRef.push(newSubmission); 

    // Reset values of state
    this.setState({
      title: "",
      description: "",
      mood: "",
      image: "",
      like: 1
    });
  }

  updateLikes = event => {
<<<<<<< HEAD

=======
 
>>>>>>> cec3eed79b47e639c8ab75ddb2df835fdb9be04e
    // //1. clone the current state
    const newLikes = Object.assign({}, this.state.submitted);
    const currentPost = newLikes[event.target.value]
    // Variable to target current submission in firebase
    const currentPostFirebase = firebase.database().ref(event.target.value)

    // Turn userArray object in Firebase into an array
    const newUserArray = Array.from(currentPost.userArray);
    console.log('Original user Array', currentPost.userArray)
    
    // Add conditions - if the uid exists within the user array, subtract 1 like on button click, and remove user ID from the array
    if (newUserArray.indexOf(this.state.uid) > -1) {
      currentPost.likes =
      currentPost.likes - 1;
      
      const index = newUserArray.indexOf(this.state.uid);
      newUserArray.splice(index, 1);
      currentPost.userArray = newUserArray
      // If the user ID doesn't already exist in the user array, add 1 to likes and push user ID into the array
    } else {
      currentPost.likes =
      currentPost.likes + 1;

      newUserArray.push(this.state.uid);
      currentPost.userArray = newUserArray;
      console.log('userArray', currentPost.userArray);

      
    }

    // //2. add one to the likes at [event.target.value]

    

    console.log('newArray', newUserArray);

    //3. Push new inofrmation to firebase
    currentPostFirebase.set(currentPost);
    // currentPostFirebase.set(currentPost.userArray);
  };



  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value //square brackets evaluate the property
    })
    console.log(e.target.value)
  }

  // Login function - when user logs in, set states to match user information
login = () => {
  auth.signInWithPopup(provider).then(result => {
   const user = result.user;
   this.setState({
    user,
    uid: user.uid,
    name: user.displayName,
    userImg: user.photoURL,
    loggedOut: false
   });
  }); 
 };

  //  Logout function - when user is logged out, set user-related states to null
 logout = () => {
  auth.signOut().then(() => {
   this.setState({
    user: null,
    uid: null,
    email: null,
    loggedOut: true
   });
  });
 };

//  Change boolean value of showForm state (true to false, or false to true)
 showFormFunction = () => {
   this.setState ({
     showForm: !this.state.showForm
   })
 }

    render() {
      return (
        <div className="App">
          <nav>
            <Login user={this.state.user} login={this.login} logout={this.logout} userImg={this.state.userImg} showForm={this.showFormFunction}/>
          </nav>
<<<<<<< HEAD
          {/* Submission form will only appear if showForm state is true, and user state is true */}
          {this.state.showForm && this.state.user &&
          <SubmissionsForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />}
          <div>
            {
              Object.entries(this.state.submitted).map((moodSelected, i) => {
                let moodArray = [];
                moodArray.push({
                  mood: moodSelected[1].mood
                });
                return (
                  <div>
                    {moodArray.map(displayMood => {
                      return (
                          <button>{displayMood.mood}</button>
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
          <Submission 
            submitted={this.state.submitted}
            updateLikes={this.updateLikes}
          />
=======
          <div className="wrapper">
            {/* Submission form will only appear if showForm state is true, and user state is true */}
            {this.state.showForm && this.state.user &&
            <SubmissionsForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              />}
            <Submission 
              submitted={this.state.submitted}
              updateLikes={this.updateLikes}
            />
          </div>
>>>>>>> cec3eed79b47e639c8ab75ddb2df835fdb9be04e
        </div>
      );
    }
} 
export default App;
