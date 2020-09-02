import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Tile, Button } from 'react-bulma-components';

function getSentencePair() {
    return fetch("http://localhost:8080/random/")
    .then(res => res.json())
    .then(
      (result) => {
        return {japanese_sentence: result.japanese1, english_sentence: result.english};
      }
    );
  }

export class TestSentence extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        japanese_sentence: '',
        english_sentence: '',
        user_translation: '',
      };
    }
  
    reinitSentence() {
      getSentencePair()
        .then(({japanese_sentence, english_sentence }) => 
        this.setState({
            japanese_sentence: japanese_sentence,
            english_sentence: english_sentence,
            user_translation: '',
          })
        );
    }

    componentDidMount() {
      this.reinitSentence();
    }

    handleChange = (e) =>{ 
      this.setState({
          user_translation: e.target.value
        });
    }
  
    validate_translation() {
      this.props.validate(
        this.state.japanese_sentence,
        this.state.english_sentence, 
        this.state.user_translation);
      this.reinitSentence()
    }
  
    render() {
      return (
        <div className="test-sentence">
          <Tile renderAs="article" kind="child" notification color="primary">
            <p>Sentence: {this.state.japanese_sentence}</p>
            <p>Answer: </p> <input  type="text" value={this.state.user_translation} onChange={this.handleChange}/> 
            <Button type="button" onClick={() => this.validate_translation()}>Validate</Button>
          </Tile>
        </div>
      );
    }
  }

  export default TestSentence;
