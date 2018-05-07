import React from 'react';
import Tester from './tester';
import {APP_SCREENS, TESTING_SESSION} from '../config/settings'
import update from 'immutability-helper';
import ReactPokusy from './react_pokusy';
import fire from '../config/fire';
import firebase from 'firebase';
import {testingSets} from '../config/testing_set';


class Collector extends React.Component {

  constructor() {
    super();
    this.state = {
      // User
      emailInput: '',
      user: {},
      userKey: 'dummy-key',
      setNumber: 0,
      // Dashboard
      appScreen: APP_SCREENS.EMAIL_SCREEN,

    }
  }

  pushUserData = (user) => {
    this.setState({user: user}, this.uploadUserData)
  }

  uploadUserData = () => {
    const {userKey, user} = this.state;
    fire.database().ref(TESTING_SESSION + '/' + userKey).update(user);
  }

  screenNext = () => {
    const N = Object.keys(APP_SCREENS).length
    this.setState({
      appScreen: (this.state.appScreen + 1) % N
    })
  }

  screenPrev = () => {
    const N = Object.keys(APP_SCREENS).length
    this.setState({
      appScreen: (this.state.appScreen + N - 1) % N
    })
  }

  addEmail = () => {
    const userEmail = this.state.emailInput;
    const userKey = fire.database().ref().child('usersT1').push().key;
    this.setState({userKey: userKey});
    var userData = {
      email: userEmail,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    fire.database().ref(TESTING_SESSION + '/' + userKey).update(userData)
    .catch((err) => {
      console.log(err);
    })
    this.setState({appScreen: APP_SCREENS.TESTER_SCREEN});
  }

  handleEmailChange = (e) => {
    this.setState({emailInput: e.target.value});
  }
  
  render() {
    const {appScreen, emailInput} = this.state;
    return (
      <div>
        {appScreen === APP_SCREENS.EMAIL_SCREEN &&
          <div>
            <h3>EMAIL SCREEN</h3>
            <input
              onChange={this.handleEmailChange}
              type="text"
              spellCheck={false}
              value={emailInput}
              autoFocus 
            />
            <button onClick={this.addEmail}>Submit</button>
          </div>
        }
        {appScreen === APP_SCREENS.TESTER_SCREEN &&
          <Tester
            pushUserData={this.pushUserData}
            testingSets={[testingSets.alternating1]} />
        }
        {appScreen === APP_SCREENS.FINISH_SCREEN &&
          <div>
            <h3>FINISH SCREEN</h3>
          </div>
        }
        {appScreen === APP_SCREENS.REACT_POKUSY &&
          <div>
            <h3>REACT POKUSY</h3>
            <ReactPokusy />
          </div>
        }
      </div>
    )
  }
}



export default Collector;