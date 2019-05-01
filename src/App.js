import React from 'react';
import './App.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: 'AIzaSyBXCQWKDC5ZcFWu5kMf9_qhk0cb5sdfBg0',
  authDomain: 'test-e3646.firebaseapp.com'
})

class App extends React.Component {

  state={
    isSignedIn:false
  }
  uiConfig={
    signInFlow: 'popup',
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccess: () => false
    } 
  }
  

  componentDidMount = () =>{
    
    firebase.auth().onAuthStateChanged(user =>{
      this.setState({isSignedIn: !!user})
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <h1>Signed In!</h1>
            <div>
            <h2>Welcome {firebase.auth().currentUser.displayName}</h2>
            <img src={firebase.auth().currentUser.photoURL}/>
            </div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}
  
export default App;
