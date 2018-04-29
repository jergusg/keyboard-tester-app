import React from 'react';
import Tester from './tester';
import {APP_SCREENS} from '../config/settings'
import update from 'immutability-helper';
import ReactPokusy from './react_pokusy';
import fire from '../config/fire';
import firebase from 'firebase';

class Collector extends React.Component {

  constructor() {
    super();
    this.state = {
      // User
      emailInput: '',
      user: {
        userTimes: [],
        userStrokes: [],
      },
      userKey: 'dummy-key',
      setNumber: 0,
      // Dashboard
      appScreen: APP_SCREENS.EMAIL_SCREEN,

    }
  }

  updateUserData = (roundNum, timesVector, strokesVector, lastRound) => {
    this.setState((prevState) =>
      update(prevState, {
      user: {
        userTimes: {$push: [timesVector]},
        userStrokes: {$push: [strokesVector]},
      }}),
    lastRound ? this.uploadRounds : () => {});
  }

  uploadRounds = () => {
    const {userKey, user} = this.state;
    fire.database().ref('usersT1/' + userKey).update(user);
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
    fire.database().ref('usersT1/' + userKey).update(userData)
    .then(() => {
      this.setState({appScreen: APP_SCREENS.TESTER_SCREEN});
    })
    .catch((err) => {
      console.log(err);
    })
    this.setState({emailInput: ''});
  }

  handleEmailChange = (e) => {
    this.setState({emailInput: e.target.value});
  }
  
  render() {
    const {appScreen, emailInput} = this.state;
    const {testingSets} = this.props;
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
            />
            <button onClick={this.addEmail}>Submit</button>
          </div>
        }
        {appScreen === APP_SCREENS.TESTER_SCREEN &&
          <Tester updateUserData={this.updateUserData} testingSet={testingSets[0]} testingSets={testingSets} />
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
        <div className="devButtons">
          <button onClick={this.screenPrev}>Prev</button>
          <button onClick={this.screenNext}>Next</button>
        </div>
      </div>
    )
  }
}



export default Collector;