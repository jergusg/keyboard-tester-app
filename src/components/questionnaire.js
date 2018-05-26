import React from 'react';

class Questionnaire extends React.Component {
  constructor() {
    super();
    this.state = {
      likertComfort: -1,
      likertMistake: -1,
      likertSingle: -1,
      multipleLayouts: '',
      multipleLayoutsBoxes: [],
      primaryLayout: '',
      primaryLayoutOptions: -1,
      shortcut: '',
      shortcutBoxes: [],
      numpad: -1,
      keyboardCheck: [],
    };
  }

  handleQuestion = (e, statekey) => {
    this.setState({
      [statekey]: e.target.value,
    })
  }

  handleTargetChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;

    if (target.type === 'checkbox') {
      if (target.checked) {
        this.setState((pS) => {
          let tmpArray = pS[name].slice()
          tmpArray.push(value)
          return {[name]: tmpArray}
        })
      }
      else {
        this.setState((pS) => {
          let index = pS[name].indexOf(value)
          let tmpArray = pS[name].slice()
          tmpArray.splice(index, 1)
          return {[name]: tmpArray}
        })
      }
    }
    else {
      this.setState({
        [name]: value,
      });
    }
  }
  
  render() {
    const KEYBOARD_LAYOUTS = ['Slovenské QWERTZ (písmeno Z je hore)', 'Slovenské QWERTY', 'Anglické (US)'];
    const SHORTCUTS = ['Vyklikaním myšou', 'Alt+Shift', 'Win+Space'];
    return (
      <div>
        <h3>Dotazník</h3>
        <p>Vyplňte pár otázok ohľadom písania na klávesnici.</p>
        <TextQuestion
          question={<span>Ktoré rozloženie klávesnice primárne používate? (je pre vás najprirodzenejšie alebo ktoré používate najčastejšie)</span>}
          handleQuestion={(e) => this.handleQuestion(e, 'primaryLayout')}
          value={this.state.primaryLayout}
          radiooptions={KEYBOARD_LAYOUTS}
          optionname="primaryLayoutOptions"
          stateValue={this.state.primaryLayoutOptions}
          handleTargetChange={this.handleTargetChange}
        />
        <TextQuestion
          question={<span>Aké ďalšie rozloženia klávesnice používate?</span>}
          handleQuestion={(e) => this.handleQuestion(e, 'multipleLayouts')}
          value={this.state.multipleLayouts}
          checkboxes={KEYBOARD_LAYOUTS}
          optionname="multipleLayoutsBoxes"
          stateValue={this.state.multipleLayoutsBoxes}
          handleTargetChange={this.handleTargetChange}   
        />
        <TextQuestion
          question="Akým spôsobom zvyknete prepínať rozloženia?"
          handleQuestion={(e) => this.handleQuestion(e, 'shortcut')}
          value={this.state.shortcut}
          checkboxes={SHORTCUTS}
          optionname="shortcutBoxes"
          stateValue={this.state.shortcutBoxes}
          handleTargetChange={this.handleTargetChange}     
        />
        <NumPad value={this.state.numpad} handleChange={this.handleTargetChange} />
        <LikertScale 
          left="žiadny problém"
          right="veľmi otravné"
          question="Ako pohodlné je pre vás prepínanie medzi rozloženiami klávesnice?"
          value={this.state.likertComfort}
          handleChange={(e) => this.handleQuestion(e, 'likertComfort')}
        />
        <LikertScale 
          left="nikdy sa nemýlim"
          right="mýlim sa často"
          question="Zvyknete si pri písaní mýliť písmená a znaky medzi rôznymi rozloženiami klávesnice?"
          value={this.state.likertMistake}
          handleChange={(e) => this.handleQuestion(e, 'likertMistake')}
        />
        <LikertScale 
          left="určite nie"
          right="určite áno"
          question="Uvítali by ste nové jednotné rozloženie klávesnice pre programovanie aj písanie slovenčiny?"
          value={this.state.likertSingle}
          handleChange={(e) => this.handleQuestion(e, 'likertSingle')}
        />
        <button className='button-next' onClick={() => {
          if (this.state.likertComfort !== -1 && this.state.likertSingle !== -1 && this.state.likertMistake !==-1) this.props.pushUserAnswer(this.state)}}
        >Ďalej</button>
      </div>
    );
  }
}




const TextQuestion = ({question, value, handleQuestion, checkboxes, radiooptions, optionname, stateValue, handleTargetChange}) => {
  return (
    <div className='question'>
      <p className="question__text">{question}</p>
      {checkboxes &&
        <CheckBoxes options={checkboxes} handleChange={handleTargetChange} name={optionname} stateValue={stateValue} />
      }
      {radiooptions &&
        <RadioOptions options={radiooptions} handleChange={handleTargetChange} name={optionname} stateValue={stateValue} />
      }
      Iné: <input
        className="question__input"
        onChange={handleQuestion}
        type="text"
        spellCheck={false}
        value={value}
      />
    </div>
  )
}



const CheckBoxOption = ({name, value, handleChange, stateValue}) => {
  return (
  <label>
    <div>
    <input
      name={name}
      type="checkbox"
      value={value}
      checked={stateValue.indexOf(value) !== -1}
      onChange={handleChange}
    /> {value}
    </div>
  </label>
)
}
const CheckBoxes = ({options, handleChange, name, stateValue}) => {
  return (
    <div>
      {options.map((option) => <CheckBoxOption
          key={option} value={option} {...{name, handleChange, stateValue}}
        />
      )}
    </div>
  );
}

const RadioOption = ({name, value, handleChange, stateValue}) => (
  <label>
    <div>
    <input
      name={name}
      type="radio"
      value={value}
      checked={value === stateValue}
      onChange={handleChange}
    /> {value}
    </div>
  </label>
)

const RadioOptions = ({options, handleChange, name, stateValue}) => {
  return (
    <div>
      {options.map((option) => <RadioOption
          key={option} value={option} {...{name, handleChange, stateValue}}
        />
      )}
    </div>
  );
}

const NumPad = ({handleChange, value}) => {
  return (
    <div className="question question--left">
      <p className="question__text">Máte na počítači numerickú klávesnicu (číselná klávesnica vpravo/numpad)? Zvyknete ju používať?</p>
      <div>
        <label>
          <input
            name="numpad"
            type="radio"
            value="1"
            checked={value === '1'}
            onChange={handleChange}
          /> Áno, mám, a zvyknem ju používať
        </label>
        <br/>
        <label>
          <input
            name="numpad"
            type="radio"
            value="2"
            checked={value === '2'}
            onChange={handleChange}
          /> Áno, mám, ale nepoužívam ju alebo ju používam len výnimočne
        </label>
        <br/>
        <label>
          <input
            name="numpad"
            type="radio"
            value="0"
            checked={value === '0'}
            onChange={handleChange}
          /> Nie, nemám
        </label>
      </div>
    </div>
  )
}


const LikertOption = ({number, checkedNumber, handleChange}) => (
  <label className="likert--col">
    <div>
      {number}
    </div>
    <div>
      <input
        type="radio"
        value={number}
        checked={number === checkedNumber}
        onChange={handleChange}
      />
    </div>
  </label>
)

const LikertScale = ({left, right, question, value, handleChange}) => {
  const numbers = ['1','2','3','4','5'];
  return (
    <div className="question">
      <p className="question__text">{question}</p>
      <div className="likert">
        <div className="likert--col">
          <div></div><div>{left}</div>
        </div>
        {numbers.map((number) =>
          <LikertOption key={number} number={number} checkedNumber={value} handleChange={handleChange} />
        )}
        <div className="likert--col">
          <div></div><div>{right}</div>
        </div>
      </div>
    </div>
  );
}



export default Questionnaire;