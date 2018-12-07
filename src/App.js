import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import dadPhotos from './dadPhotos';
// import dada from '.dada';
import SubmissionsForm from './SubmissionsForm'
// import Likes from './Likes';
import Login from './Login';
// import Moods from './Moods';
import Submission from './Submission';
// import RandomSubmission from './RandomSubmission';
import './App.css';


const dbRef = firebase.database().ref(); //the root of firebase
const posts = firebase.database().ref("posts");
const postLikes = firebase.database().ref('postLikes');


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
          user: user.uid,
          name: user.displayName,
          userImg: user.photoURL,
          loggedOut: false 
        });
      }
    });    
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newSubmission = {
      title: this.state.title,
      description: this.state.description,
      mood: this.state.mood,
      image: imageRandom(dadPhotos),
      likes: 1
    }
    dbRef.push(newSubmission); 

    this.setState({
      title: "",
      description: "",
      mood: "",
      image: "",
      like: 1,
    });
  }

  updateLikes = event => {
    // const likedPosts = firebase.database().ref(event.target.value);
    // likedPosts.on('value', (snapshot) => {
    //   const newLikes = snapshot.val().likes;
    //   console.log('new likes', newLikes)
    //   // newLikes.likes = newLikes.likes + 1;
    //   // likedPosts.set(newLikes)
    // })
    // console.log('liked posts', likedPosts)

    // console.log('Update likes', this.state)
    // console.log('howdy!', event.target.value);

    // //1. clone the current state
    const newLikes = Object.assign({}, this.state.submitted);
    const currentPost = newLikes[event.target.value]

    console.log('newLikes:', currentPost);

    // //2. add one to the likes at [event.target.value]
    currentPost.likes =
    currentPost.likes + 1;

    //3. set the state.
    firebase.database().ref(event.target.value).set(currentPost);
    // this.setState({
    //   like: newLikes
    // })
  };



  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value //square brackets evaluate the property
    })
    console.log(e.target.value)
  }

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
        </div>
      );
    }
} 
export default App;
