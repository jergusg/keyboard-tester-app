import React from 'react';
import Tester from './tester';
import {APP_SCREENS} from '../config/settings'
import update from 'immutability-helper';
import ReactPokusy from './react_pokusy';

class Collector extends React.Component {

  constructor() {
    super();
    this.state = {
      // User
      email: '',
      user: {
        userTimes: {},
        userStrokes: {},
      },
      // Dashboard
      appScreen: APP_SCREENS.EMAIL_SCREEN,
    }
  }

  updateUserData = (roundNum, timesVector, strokesVector) => {
    this.setState((prevState) =>
      update(prevState, {
      user: {
        userTimes: {[roundNum]: {$set: timesVector}},
        userStrokes: {[roundNum]: {$set: strokesVector}},
      }})
    );
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
  
  render() {
    const {appScreen} = this.state;
    return (
      <div>
        {appScreen === APP_SCREENS.EMAIL_SCREEN &&
          <div>
            <h3>EMAIL SCREEN</h3>
            <input />
            <button>Submit</button>
          </div>
        }
        {appScreen === APP_SCREENS.TESTER_SCREEN &&
          <Tester updateUserData={this.updateUserData} />
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