import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import SubmissionsForm from './SubmissionsForm'
// import Likes from './Likes';
import Login from './Login';
import Moods from './Moods';
import Submission from './Submission';
import './App.css';
import logo from "../src/assets/dad-talk-logo.svg";
import { ifError } from 'assert';

//the root of firebase
const dbRef = firebase.database().ref(); 
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
      sortSubmitted: {},
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
      //snapshot from firebase is not diff enough from firebase, so we have to clone the array
      console.log('This is a snapshot, moods were updated')
      const newState = Array.from(snapshot.val());
      this.setState({
        moodArray: newState
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


     if(this.state.newMood === "" && this.state.mood === "") {
              // alert message 
          } else {

            // When user submits form, create object that records values of user submission
            const newSubmission = {
              title: this.state.title,
              description: this.state.description,
              mood: this.state.newMood,
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
              like: 1,
              newMood: ""
            });

          }
        

  }

  //ON click of mood button, we need to change mood: newmood

  newMoodSubmit = (e) => {
    e.preventDefault();
    const newNewMoodArray = Array.from(this.state.moodArray);
    const moodRef = firebase.database().ref('Moods/');
    
    //filter moods here
    newNewMoodArray.push(this.state.newMood);

    let filteredMoodArray = newNewMoodArray.filter((v, i, a) => a.indexOf(v) === i); 
    moodRef.update(filteredMoodArray);

    // this.setState({
    //   // newMood:""
    // })

    console.log("newNewMoodArray", newNewMoodArray);
  }

  

  reSubmit = (moodButton) => {
    const tempArray = Object.entries(this.state.submitted)
    
    const newState = {};
    const filteredArray = tempArray.filter((item) => {
      return item[1].mood === moodButton;
    }).forEach((match) => {
      newState[match[0]] = match[1]
    })
    
    console.log("this", newState)
  
    this.setState({
      sortSubmitted: newState
    })
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
          <header>
            <nav>
              <Login user={this.state.user} login={this.login} logout={this.logout} userImg={this.state.userImg} showForm={this.showFormFunction} />
              <img src={logo} className="logo" alt="Dad talk logo"/>
              <h2 className="heading">Conversation starters</h2>
            </nav>
          </header>
          <div className="wrapper">
            {/* Submission form will only appear if showForm state is true, and user state is true */}
            {this.state.showForm && this.state.user && <SubmissionsForm handleChange={this.handleChange // Submission form
                } handleSubmit={this.handleSubmit} title={this.state.title} description={this.state.description} newMoodSubmit={this.newMoodSubmit} moodArray={this.state.moodArray} newMood={this.state.newMood} mood={this.state.mood}/>} 
            {/* Categories/moods */}
            <div className="moods-container clearfix">
              {Object.entries(this.state.moodArray).map(
                (moodSelected, i) => {
                  let moodButtons = [];
                  moodButtons.push({
                    mood: moodSelected[1]
                  });
                  return (
                    <div>
                      {/* the parent needs a clearfix but it stops floats from working */}
                      {moodButtons.map((displayMood) => {
                        return <button onClick={() => this.reSubmit(displayMood.mood)} className="mood-btn">{displayMood.mood}</button>;
                        // annonymous function and ".this" were added infront of reSubmit to have the resubmit function wait to fire until it gets the values passed in the parameter ie displayMood.mood
                      })}
                    </div>
                  );
                }
              )}
            </div>
            {/* Submissions */}
            <Submission sortSubmitted={this.state.sortSubmitted} updateLikes={this.updateLikes} user={this.state.user} />
          </div>
        </div>;
    }
} 
export default App;
