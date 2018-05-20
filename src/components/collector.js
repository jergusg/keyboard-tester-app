import React from 'react';
import Tester from './tester';
import {APP_SCREENS} from '../config/settings'
import ReactPokusy from './react_pokusy';
import fire from '../config/fire';
import firebase from 'firebase';
import {testingSets} from '../config/testing_set';
import Questionnaire from './questionnaire';


class Collector extends React.Component {

  constructor() {
    super();
    this.state = {
      // User
      emailInput: '',
      userTestData: {},
      userKey: 'dummy-key',
      userAnswer: {},
      score: {speedList: [0,3.14], errorList: [0,0.101]},
      // Dashboard
      appScreen: APP_SCREENS.EMAIL_SCREEN,
      devMode: false,
    }
  }

  componentWillMount() {
    let ourTestingSet = [testingSets.intro, testingSets.controlEN, testingSets.controlSW]
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('set')) {
      ourTestingSet = urlParams.getAll('set')
        .map((name) => testingSets[name])
        .filter((set) => set !== undefined)
    }
    this.setState({
      ourTestingSet: ourTestingSet,
      SESSION: urlParams.has('d') ? 'session_DEV' : 'session_EXP',
      devMode: urlParams.has('d'),
    })

    if (urlParams.has('screen')) {
      this.setState({
        appScreen: Number(urlParams.get('screen')),
      })
    }
  }

  pushUserData = (userTestData) => {
    const score = this.countScore(userTestData.setResults);
    this.setState({userTestData: userTestData, score: score}, this.uploadUserData)
  }

  countScore = (setResults) => {
    const sumReducer = (acc, cur) => acc + cur;
    const arrayReducer = (a,b) => a.concat(b)
    let speedList = [];
    let errorList = [];
    setResults.forEach((oneSet) => {
      const totalLength = oneSet.sentenceLengths.reduce(arrayReducer).reduce(sumReducer);
      const totalTime = oneSet.userTimes.reduce(arrayReducer).reduce(sumReducer);
      const totalStrokes = oneSet.userStrokes.reduce(arrayReducer).reduce(sumReducer);
      speedList.push(totalLength / totalTime * 1000);
      errorList.push(totalStrokes / totalLength - 1)
    })

    return {speedList, errorList};
  }

  pushUserAnswer = (userAnswer) => {
    console.log('pushAnswer');
    this.setState({userAnswer: userAnswer, appScreen: APP_SCREENS.TESTER_SCREEN});
  }

  uploadUserData = () => {
    const {userKey, userTestData, score, SESSION, userAnswer} = this.state;
    fire.database().ref(SESSION + '/' + userKey).update({userAnswer, ...userTestData, score})
      .then((value) => {
        this.setState({appScreen: APP_SCREENS.FINISH_SCREEN})
      });
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

  submitEmail = () => {
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
    this.setState({appScreen: APP_SCREENS.QUESTIONNAIRE});
  }

  handleEmailChange = (e) => {
    this.setState({emailInput: e.target.value});
  }



  
  render() {
    const {appScreen, emailInput, ourTestingSet, devMode, score} = this.state;

    return (
      <div className="app-content-wrap">
        {appScreen === APP_SCREENS.EMAIL_SCREEN &&
          <div>
            <h2>Výskum písania na klávesnici</h2>
            <p>Moje meno je Jerguš Greššák a robím výskum zameraný na prepínanie medzi slovenským a anglickým rozložením klávesnice. Testovanie zaberie 15 minút. Prosím, spravte si čas, aby vás nikto nerušil.</p>
            <div className="email-form">
              <span className="prompt">Email alebo Meno: </span>
              <input
                onChange={this.handleEmailChange}
                type="text"
                spellCheck={false}
                value={emailInput}
                autoFocus 
              />
              <p className="description">(Potrebné pre organizáciu výskumu. Všetky dáta budú použité anonymne.)</p>
              <button className='button-next' onClick={this.submitEmail}>Ďalej</button>
            </div>
          </div>
        }
        {appScreen === APP_SCREENS.TESTER_SCREEN &&
          <Tester
            pushUserData={this.pushUserData}
            testingSets={ourTestingSet}
            devMode={devMode}
          />
        }
        {appScreen === APP_SCREENS.QUESTIONNAIRE &&
          <Questionnaire
            pushUserAnswer={this.pushUserAnswer}
          />
        }
        {appScreen === APP_SCREENS.FINISH_SCREEN &&
          <FinishResults {...{score}} />
        }
        {appScreen === APP_SCREENS.REACT_POKUSY &&
          <ReactPokusy />
        }
      </div>
    )
  }
}


const FinishResults = ({score}) => {
  console.log(score)
  let rows = []
  for (let i = 0; i < score.speedList.length; i++) {
    rows.push(<tr key={i}>
      <td>{i}</td>
      <td>{score.speedList[i].toFixed(2)}</td>
      <td>{(score.speedList[i]*12).toFixed(2)}</td>
      <td>{(score.errorList[i]*100).toFixed(0)}%</td>
    </tr>)
  }
  return (
    <div>
      <h2>Výsledky</h2>
      <table>
        <thead>
          <tr><th>Sada</th><th>Rýchlosť (ch/s)</th><th>Rýchlosť WPM</th><th>Chyba</th></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <p className="thank-you">Ďakujeme za účasť!</p>
    </div>
  )
}

export default Collector;