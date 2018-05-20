import React from 'react';

class Questionnaire extends React.Component {
  constructor() {
    super();
    this.state = {
      likertComfort: -1,
      likertSwitching: -1,
      likertSingle: -1,
      multipleLayouts: '',
      primaryLayout: '',
      shortcut: '',
    };
  }

  handleQuestion = (e, statekey) => {
    this.setState({
      [statekey]: e.target.value,
    })
  }
  
  render() {
    return (
      <div>
        <h3>Dotazník</h3>
        <p>Vyplňte pár otázok ohľadom písania na klávesnici.</p>
        <TextQuestion
          question={<span>Aké rôzne rozloženia klávesnice používate?<br/> Napríklad: Slovenské (QWERTZ (písmeno Z  je hore)), Slovenské (QWERTY), Anglické (US)</span>}
          handleQuestion={(e) => this.handleQuestion(e, 'multipleLayouts')}
          value={this.state.multipleLayouts}
        />
        <TextQuestion
          question="Ktoré rozloženie klávesnice používate najčastejšie - je pre vás najprirodzenejšie?"
          handleQuestion={(e) => this.handleQuestion(e, 'primaryLayout')}
          value={this.state.primaryLayout}
        />
        <TextQuestion
          question="Akým spôsobom zvyknete prepínať rozloženia? (myšou, skratkou: Alt+Shift, Win+Space, ...)"
          handleQuestion={(e) => this.handleQuestion(e, 'shortcut')}
          value={this.state.shortcut}
        />
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
          question="Zvyknete si pri písaní mýliť písmenká a znaky medzi rôznymi rozloženiami klávesnice?"
          value={this.state.likertSwitching}
          handleChange={(e) => this.handleQuestion(e, 'likertSwitching')}
        />
        <LikertScale 
          left="určite nie"
          right="určite áno"
          question="Uvítali by ste nové jednotné rozloženie klávesnice pre programovanie aj písanie slovenčiny?"
          value={this.state.likertSingle}
          handleChange={(e) => this.handleQuestion(e, 'likertSingle')}
        />
        <button className='button-next' onClick={() => {
          if (this.state.likertComfort !== -1) this.props.pushUserAnswer(this.state)}}
        >Ďalej</button>
      </div>
    );
  }
}

const TextQuestion = ({question, value, handleQuestion}) => {
  return (
    <div className='question'>
      <p className="question__text">{question}</p>
      <input
        className="question__input"
        onChange={handleQuestion}
        type="text"
        spellCheck={false}
        value={value} 
      />
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