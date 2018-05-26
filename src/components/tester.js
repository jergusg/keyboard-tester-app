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
        testingSetNames: this.props.testingSets.map((set) => set.name),
        setResults: this.props.testingSets.map((set) =>
          ({
            userTimes: [],
            userStrokes: [],
            sentenceLengths: [],
            evKeydownCode: [], 
            evKeydownKey: [],
            evKeydownTime: [],
          })
        ),
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
      keydownCodeVector: [], 
      keydownKeyVector: [],
      keydownTimeVector: [],
      modelSentence: '',
      modelLeaveClass: false,
    });
  }

  handleKeydown = (e) => {
    const evCode = e.nativeEvent.code;
    const evKey = e.nativeEvent.key;
    this.setState((pS) => update(pS, {
      keydownCode: {$push: [evCode]},
      keydownKey: {$push: [evKey]},
      keydownTime: {$push: [Date.now() - pS.letterTime]},
      letterTime: {$set: Date.now()}
    }))
  }

  prepareNextSet() {
    this.setState((prevState) => ({
      testingSetNum: prevState.testingSetNum + 1,
    }), () => this.prepareNextRound(0))
  }

  updateUserData = (timesVector, strokesVector) => {
    const {testingSetNum, roundNum, keydownCodeVector, keydownKeyVector, keydownTimeVector} = this.state;
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
            )]},
            evKeydownCode: {$push: [keydownCodeVector]},
            evKeydownKey: {$push: [keydownKeyVector]},
            evKeydownTime: {$push: [keydownTimeVector]},
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
      keydownCodeVector,
      keydownKeyVector,
      keydownTimeVector,
      keydownCode,
      keydownKey,
      keydownTime,
    } = this.state;
    const testingSet = this.props.testingSets[testingSetNum];
    if (testerState !== T_STATES.RUNNING) return;
    const newInputText = e.target.value;
    const allSentences = testingSet.set[roundNum].length;
    const textLengthDiff = newInputText.length - inputText.length;
    const newStrokes = (textLengthDiff > 0) ? inputStrokes + 1 : inputStrokes;
    if (textLengthDiff > 1 && !this.props.devMode) {
      return;
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
        keydownCodeVector: keydownCodeVector.concat([keydownCode]),
        keydownKeyVector: keydownKeyVector.concat([keydownKey]),
        keydownTimeVector: keydownTimeVector.concat([keydownTime]),
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
      keydownCode: [], 
      keydownKey: [],
      keydownTime: [],
      letterTime: Date.now(),
    }));
  }


  finishRound() {
    const testingSet = this.props.testingSets[this.state.testingSetNum];
    const {
      roundNum,
      timesVector,
      strokesVector,
      testingSetNum,
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
        {/* <h4>round: {roundNum + 1} </h4> */}
        {testingSet.name.startsWith('alternating') &&
        <h3>Jazyk:  {roundNum%2===0 ? 'SK' : 'EN'}</h3>}
        {(testerState === T_STATES.RUNNING || testerState === T_STATES.DELAYING)  &&
          <div>
            <div className={classNames('fix-model', {'unselectable': !this.props.devMode})}>
              <p className={classNames('Model', {'model-leave': modelLeaveClass})}>
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
              onKeyDown={this.handleKeydown}
              autoFocus
            />
          </div>
        }
        {testerState === T_STATES.ROUND_PREPARED &&
          <div>
            <h3>
              {testingSet.title ? testingSet.title : this.state.testingSetNum + '. Sada'}
            </h3>
            {roundNum === 0 &&
              <div className="tester__introduction">
                {testingSet.introduction}
              </div>
            }
            <p>Keď budete pripravený stlačte tlačidlo Štart</p>
            <button className='button-next button-next--start' onClick={this.nextSentence}>Štart</button>
          </div>
        }
        {testerState === T_STATES.ALL_FINISHED &&
          <div>
            <h3>Loading...</h3>
          </div>
        }
      </div>
    )
  }
}

export default Tester;