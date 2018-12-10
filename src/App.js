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
const posts = firebase.database().ref("Posts");
const moods = firebase.database().ref("Moods");

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
      newMood: "",
      moodArray: [],
      submitted: {},
      user: null,
      uid: "",
      showForm: false

    };
  }


  componentDidMount() {
    //attach event listener to firebase
    posts.on('value', (snapshot) => {
    //firebase method, return me an object the represents verything in the database.
      this.setState({
        submitted: snapshot.val()//firebase method. Firebase is sending us our brand new object
      })
    });  

    moods.on('value', (snapshot) => {
      console.log('This is a snapshot')
      this.setState({
        moodArray: snapshot.val()
      })
    })

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
    posts.push(newSubmission); 

    // Reset values of state
    this.setState({
      title: "",
      description: "",
      mood: "",
      image: "",
      like: 1
    });
  }

  newMoodSubmit = (e) => {
    e.preventDefault();
    const newNewMoodArray = Array.from(this.state.moodArray);
    const moodRef = firebase.database().ref('Moods');
    console.log('newNewMoodArray', newNewMoodArray);

    //filter moods here
    let filteredMoodArray = newNewMoodArray.filter((v, i, a) => a.indexOf(v) === i); 
    console.log(filteredMoodArray, 'fliteredMoodARray');

    filteredMoodArray.push(this.state.newMood);
    moodRef.update(filteredMoodArray);
    console.log(newNewMoodArray, "newnewmoodarray")
  
    console.log("Jason", filteredMoodArray);  

  }

  updateLikes = event => {
    event.stopPropagation();
 
    // //1. clone the current state
    const newLikes = Object.assign({}, this.state.submitted);
    const currentPost = newLikes[event.target.value]
    // Variable to target current submission in firebase
    const currentPostFirebase = firebase.database().ref(`/Posts/${event.target.value}`)

    // Turn userArray object in Firebase into an array
    const newUserArray = Array.from(currentPost.userArray);
    
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
    }

    // //2. add one to the likes at [event.target.value]

    


    //3. Push new inofrmation to firebase
    currentPostFirebase.set(currentPost);
    // currentPostFirebase.set(currentPost.userArray);
  };



  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value //square brackets evaluate the property
    })

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
      return <div className="App">
          <nav>
            <Login user={this.state.user} login={this.login} logout={this.logout} userImg={this.state.userImg} showForm={this.showFormFunction} />
          </nav>
          <div className="wrapper">
            {/* Submission form will only appear if showForm state is true, and user state is true */}
            {this.state.showForm && this.state.user && <SubmissionsForm handleChange={this.handleChange // Submission form
                } handleSubmit={this.handleSubmit} title={this.state.title} description={this.state.description} newMoodSubmit={this.newMoodSubmit} moodArray={this.state.moodArray}/>}
            {/* Categories/moods */}
            <div>
              {Object.entries(this.state.submitted).map(
                (moodSelected, i) => {
                  let moodButtons = [];
                  moodButtons.push({
                    mood: moodSelected[1].mood
                  });
                  return (
                    <div>
                      {moodButtons.map((displayMood) => {
                        return <button>{displayMood.mood}</button>;
                      })}
                    </div>
                  );
                }
              )}
            </div>
            {/* Submissions */}
            <Submission submitted={this.state.submitted} updateLikes={this.updateLikes} user={this.state.user} />
          </div>
        </div>;
    }
} 
export default App;
