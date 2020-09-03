import React from 'react';
import TestSentence from './TestSentence' ;
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Columns, Hero, Tile, Container } from 'react-bulma-components';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }

  add_to_history(japanese_sentence, english_sentence, user_translation) {
    const history = this.state.history.slice();
    noteTranslation(english_sentence, user_translation).then((note) => 
      this.setState({
        history: [{
          japanese_sentence: japanese_sentence,
          english_sentence: english_sentence,
          user_translation: user_translation,
          note: note
        }].concat(history)
      })
    )
    ;
  }

  render() {
    const history = this.state.history;
    console.log(history)
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
  <div className="app" class="has-text-centered">
    <Hero color="primary">
        <Hero.Body>
            <Container>
                <Columns>
                    <Columns.Column size={9}>
                        <TestSentence 
                validate={(japanese_sentence, english_sentence, user_translation) => this.add_to_history(japanese_sentence, english_sentence, user_translation)}/>
                    </Columns.Column>
                    <Columns.Column size={3}>
                        <Score score={averageScore || 0} />
                    </Columns.Column>
                </Columns>
            </Container>
        </Hero.Body>
    </Hero>
    <Hero>
        <Hero.Body>
            <Container>
                <ul>{sentences}</ul>
            </Container>
        </Hero.Body>
    </Hero>
</div>
    );
  }
}

function HistorySentence(props) {
  return (
    <Tile renderAs="article" kind="child" class="box">
      <Container>
        <p>{props.japanese_sentence}</p>
        <p>{props.english_sentence}</p>
        <p>{props.user_translation}</p>
        <p>{Math.round(props.note*100)/100}</p>
      </Container>
    </Tile>
  );
}

function Score(props) {
  return (
    <Tile renderAs="article" kind="child" class="box">
      <Container>
        <p>Score: {Math.round(props.score*100)/100}</p>
      </Container>
    </Tile>
  );
}

function noteTranslation(target, user_translation) {
  return fetch(`http://localhost:8080/note/${user_translation}/${target}`)
    .then(res => res.json())
    .then(
      (result) => {
        return result.note;
      }
    );
  
  // return 1 - Math.abs(target.length - user_translation.length) / Math.max(target.length, user_translation.length);
}

export default App;
