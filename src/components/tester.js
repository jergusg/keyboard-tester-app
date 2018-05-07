import React from "react";
import {diffChars} from 'diff';
import {T_STATES} from '../config/settings';
import classNames from 'classnames';
import update from 'immutability-helper';


class Tester extends React.Component {
  constructor() {
    super();
    this.state = {
      testerState: T_STATES.NEW,
      testingSetNum: 0,
      userTestData: {},
    };
  }

  componentWillMount() {
    this.prepareNextRound(0);
    this.setState({
      userTestData: {
        setNames: this.props.testingSets.map((set) => set.name),
        setResults: new Object(this.props.testingSets.map((set) =>
          ({
            userTimes: [],
            userStrokes: [],
            sentenceLengths: [],
          })
        ))
      }
    });
  }


  prepareNextRound(nextRound) {
    this.setState({
      testerState: T_STATES.ROUND_PREPARED,
      roundNum: nextRound,
      sentenceNum: -1,
      inputText: '',
      inputStrokes: 0,
      timesVector: [],
      strokesVector: [],
      modelSentence: '',
      modelLeaveClass: false,
    });
  }

  prepareNextSet() {
    this.setState((prevState) => ({
      testingSetNum: prevState.testingSetNum + 1,
    }), () => this.prepareNextRound(0))
  }

  updateUserData = (timesVector, strokesVector) => {
    const {testingSetNum, roundNum} = this.state;
    const testingSet = this.props.testingSets[testingSetNum]
    this.setState((prevState) =>
      update(prevState, {
      userTestData: { 
        setResults: {
          [testingSetNum] : {
            userTimes: {$push: [timesVector]},
            userStrokes: {$push: [strokesVector]},
            sentenceLengths: {$push: [testingSet.set[roundNum].map(
              (sentence) => sentence.length
            )]}
          }
      }}})
    );
  }


  handleChange = (e) => {
    const {
      testerState,
      roundNum,
      sentenceNum,
      inputText,
      startTimePoint,
      inputStrokes,
      timesVector,
      strokesVector,
      modelSentence,
      testingSetNum,
    } = this.state;
    const testingSet = this.props.testingSets[testingSetNum];
    if (testerState !== T_STATES.RUNNING) return;
    const newInputText = e.target.value;
    const allSentences = testingSet.set[roundNum].length;
    const textLengthDiff = newInputText.length - inputText.length;
    const newStrokes = (textLengthDiff > 0) ? inputStrokes + 1 : inputStrokes;
    if (textLengthDiff > 1) {
      // console.log("Cheat!"); // Ctrl-V: Bad Thing
      // return;
    }
    this.setState({
      inputText: newInputText,
      inputStrokes: newStrokes,
    });

    if (newInputText === modelSentence) {
      // Finished Time
      const newTime = Date.now() - startTimePoint;
      this.setState({
        // Update vectors
        timesVector: timesVector.concat(newTime), 
        strokesVector: strokesVector.concat(newStrokes),
      });
      // Finished Last Sentence
      if (sentenceNum + 1 === allSentences) {
        this.setState({testerState: T_STATES.ROUND_PROCESSING}, this.finishRound)
      } else { // Next sentence
        e.target.selectionStart = 0;
        e.target.selectionEnd = 0;
        this.setState({
          testerState: T_STATES.DELAYING,
          modelLeaveClass: true,
        }, () => setTimeout(this.nextSentence, 300));
      }
    }
  }

  nextSentence = () => {
    const testingSet = this.props.testingSets[this.state.testingSetNum];
    this.setState((prevState) => ({
      testerState: T_STATES.RUNNING,
      sentenceNum: prevState.sentenceNum + 1,
      modelSentence: testingSet.set[prevState.roundNum][prevState.sentenceNum + 1],
      startTimePoint: Date.now(),
      inputText: '',
      inputStrokes: 0,
      modelLeaveClass: false,
    }));
  }


  finishRound() {
    const testingSet = this.props.testingSets[this.state.testingSetNum];
    const {
      roundNum,
      timesVector,
      strokesVector,
      testingSetNum,
      userTestData
    } = this.state;
    const REAL_ROUNDS_NUM = testingSet.set.length;
    this.updateUserData(timesVector, strokesVector);
    if (roundNum < REAL_ROUNDS_NUM - 1) {
      this.prepareNextRound(roundNum + 1);
    } else {
      if (testingSetNum + 1 < this.props.testingSets.length) {
        this.prepareNextSet()
      } else {
        this.setState({
          testerState: T_STATES.ALL_FINISHED},
          () => {
            const {userTestData} = this.state;
            this.props.pushUserData(userTestData)
          }
        );
      }
    }
  }

  render() {
    const {
      testerState,
      roundNum,
      inputText,
      modelSentence,
      modelLeaveClass,
    } = this.state;
    const testingSet = this.props.testingSets[this.state.testingSetNum];

    return (
      <div>
        {/* <h2>Testing set: {this.state.testingSetNum}</h2> */}
        <h3>Round: {roundNum} </h3>
        {testingSet.name==='alternating1' &&
        <h3>Jazyk:  {roundNum%2===0 ? 'SK' : 'EN'}</h3>}
        {(testerState === T_STATES.RUNNING || testerState === T_STATES.DELAYING)  &&
          <div>
            <div className='fix-model'>
              <p className={classNames({'Model':true, 'model-leave': modelLeaveClass})}>
                {diffChars(inputText, modelSentence).map((part, id) => {
                  if (part.removed) {
                    return  <span key={id} className="badPart">_</span>
                  }
                  const color = part.added ? 'black' : 'donePart';
                  return (
                    <span key={id} className={color}>{part.value}</span>
                  )
                })}
              </p>
            </div>
            <input
              className={classNames({'Model':true, 'Writer': true, 'writer-leave': modelLeaveClass})}
              size="50"
              type="text"
              spellCheck={false}
              value={inputText}
              onChange={this.handleChange}
              autoFocus
            />
          </div>
        }
        {testerState === T_STATES.ROUND_PREPARED &&
          <div>
            {roundNum === 0 &&
              <div>
                {testingSet.introduction}
              </div>
            }
            <button autoFocus onClick={this.nextSentence}>Start</button>
          </div>
        }
        {testerState === T_STATES.ALL_FINISHED &&
          <div>
            <h3>Finished</h3>
          </div>
        }
      </div>
    )
  }
}

export default Tester;