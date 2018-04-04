import React from "react";
import {diffChars} from 'diff';
import {T_STATES} from '../config/settings';
import classNames from 'classnames';


class Tester extends React.Component {
  constructor() {
    super();
    this.state = {
      testerState: T_STATES.NEW,
    };
  }

  componentWillMount() {
    this.prepareNextRound(0);
  }

  prepareNextRound(nextRound) {
    this.setState({
      testerState: T_STATES.ROUND_PREPARED,
      roundNum: nextRound,
      sentenceNum: 0,
      inputText: '',
      inputStrokes: 0,
      timesVector: [],
      strokesVector: [],
      modelSentence: this.props.testingSet.set[nextRound][0],
      modelLeaveClass: false,
    });
  }

  runNextRound = () => {
    this.setState({   
      testerState: T_STATES.RUNNING,
      startTimePoint: Date.now(),
    })
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
    } = this.state;
    const {testingSet} = this.props;
    if (testerState !== T_STATES.RUNNING) return;
    const newInputText = e.target.value;
    console.log('handleChange: ' + newInputText);
    const allSentences = testingSet.set[roundNum].length;
    const textLengthDiff = newInputText.length - inputText.length;
    const newStrokes = (textLengthDiff > 0) ? inputStrokes + 1 : inputStrokes;
    // if (textLengthDiff > 1) {
    //   // Ctrl-V: Bad Thing
    //   console.log("Cheat!");
    //   return;
    // }
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
      } else {
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
    console.log('Next sentence');
    this.setState((prevState) => { return {
      testerState: T_STATES.RUNNING,
      sentenceNum: prevState.sentenceNum + 1,
      modelSentence: this.props.testingSet.set[prevState.roundNum][prevState.sentenceNum + 1],
      startTimePoint: Date.now(),
      inputText: '',
      inputStrokes: 0,
      modelLeaveClass: false,
    }});
  }

  finishRound() {
    const {
      roundNum,
      timesVector,
      strokesVector,
    } = this.state;
    const REAL_ROUNDS_NUM = this.props.testingSet.set.length;
    this.props.updateUserData(roundNum, timesVector, strokesVector, !(roundNum < REAL_ROUNDS_NUM - 1));
    if (roundNum < REAL_ROUNDS_NUM - 1) {
      this.prepareNextRound(roundNum + 1);
    } else {
      this.setState({
        testerState: T_STATES.ALL_FINISHED,
      });
    }
  }

  // Physical Keys
  // handleKeyDown = (e) => {
  //   const vector = [e.key, e.charCode, e.keyCode, e.which];
  //   this.setState({keySequence: this.state.sequence.concat([e.key])})
  // }

  render() {
    const {
      testerState,
      roundNum,
      inputText,
      modelSentence,
      modelLeaveClass,
    } = this.state;
    const {testingSet} = this.props;

    return (
      <div>
        <h3>Round: {roundNum}</h3>
        {(testerState === T_STATES.RUNNING || testerState === T_STATES.DELAYING)  &&
          <div>
            <div className='fix-model'>
              <p className={classNames({'Model':true, 'model-leave': modelLeaveClass})}>
                {diffChars(inputText, modelSentence).filter((part) => !part.removed).map((part, id) => {
                  const color = part.added ? 'black' : 'green';
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
            <button onClick={this.runNextRound}>Start</button>
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