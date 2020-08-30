import React from 'react';
import TestSentence from './TestSentence' ;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }

  add_to_history(japanese_sentence, english_sentence, user_translation) {
    const history = this.state.history.slice();
    this.setState({
      history: history.concat([{
        japanese_sentence: japanese_sentence,
        english_sentence: english_sentence,
        user_translation: user_translation,
        note: noteTranslation(english_sentence, user_translation)
      }])
    });
  }

  render() {
    const history = this.state.history;
    const sentences = history.map((sentence, index) => {
      return (
        <li key={index}>
          <HistorySentence 
          japanese_sentence={sentence.japanese_sentence} 
          english_sentence={sentence.english_sentence} 
          user_translation={sentence.user_translation}
          note={sentence.note}
          />
        </li>
      );
    });

    const averageScore = history.reduce(function (sum, sentence) {
      console.log(sentence.note);
      return sum + sentence.note;
  }, 0) / history.length;

    return (
      <div className="app">
        <TestSentence 
        validate={(japanese_sentence, english_sentence, user_translation) => this.add_to_history(japanese_sentence, english_sentence, user_translation)}/>
        <Score score={averageScore || 0} />
        <ol>{sentences}</ol>
      </div>
    );
  }
}

function HistorySentence(props) {
  return (
    <div>
      <p>{props.japanese_sentence}</p>
      <p>{props.english_sentence}</p>
      <p>{props.user_translation}</p>
      <p>{Math.round(props.note*100)/100}</p>
    </div>
  );
}

function Score(props) {
  return (
    <div>
      <p>Score: {Math.round(props.score*100)/100}</p>
    </div>
  );
}

function noteTranslation(target, user_translation) {
  // TODO: call Python to evaluate quality of translation.
  return 1 - Math.abs(target.length - user_translation.length) / Math.max(target.length, user_translation.length);
}

export default App;
