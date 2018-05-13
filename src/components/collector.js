import React from 'react';
import Tester from './tester';
import {APP_SCREENS} from '../config/settings'
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

  componentWillMount() {
    let ourTestingSet = [testingSets.slovak1, testingSets.english1, testingSets.alternating1]
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('set')) {
      ourTestingSet = urlParams.getAll('set')
        .map((name) => testingSets[name])
        .filter((set) => set !== undefined)
    }
    this.setState({
      ourTestingSet: ourTestingSet,
      SESSION: urlParams.has('d') ? 'session_DEV' : 'session_EXP',
      develMode: urlParams.has('d'),
    })
  }

  pushUserData = (user) => {
    this.setState({user: user}, this.uploadUserData)
  }

  uploadUserData = () => {
    const {userKey, user, SESSION} = this.state;
    fire.database().ref(SESSION + '/' + userKey).update(user);
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
    const {emailInput, SESSION} = this.state
    const userKey = fire.database().ref().child(SESSION).push().key;
    this.setState({userKey: userKey});
    var userData = {
      email: emailInput,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    fire.database().ref(SESSION + '/' + userKey).update(userData)
    .catch((err) => {
      console.log(err);
    })
    this.setState({appScreen: APP_SCREENS.TESTER_SCREEN});
  }

  handleEmailChange = (e) => {
    this.setState({emailInput: e.target.value});
  }
  
  render() {
    const {appScreen, emailInput, ourTestingSet, develMode} = this.state;
    

    return (
      <div>
        {appScreen === APP_SCREENS.EMAIL_SCREEN &&
          <div>
            <h2>Výskum písania na klávesnici</h2>
            Email alebo Meno: <input
              onChange={this.handleEmailChange}
              type="text"
              spellCheck={false}
              value={emailInput}
              autoFocus 
            />
            <button onClick={this.addEmail}>Submit</button>
            <p>Potrebné pre organizáciu výskumu. Všetky dáta budú použité anonymne.</p>
          </div>
        }
        {appScreen === APP_SCREENS.TESTER_SCREEN &&
          <Tester
            pushUserData={this.pushUserData}
            testingSets={ourTestingSet}
            develMode={develMode}
          />
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