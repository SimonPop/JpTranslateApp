import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Level, Button, Columns } from 'react-bulma-components';

import { Form } from 'react-bulma-components';

const { Input, Field, Control, Label } = Form;

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

    handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.validate_translation();
      }
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
        <div className="test-sentence" class="has-text-centered">
          <Level>
              <Level.Item>
                <p>{this.state.japanese_sentence}</p>
              </Level.Item>
          </Level>
            <Columns>
              <Columns.Column size={2}>
                <p>Type your answer: </p>
              </Columns.Column>
              <Columns.Column size={8}>
                <Input  type="text" value={this.state.user_translation} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
              </Columns.Column>
              <Columns.Column size={2}>
                <Button type="button" onClick={() => this.validate_translation()}>Validate</Button>
              </Columns.Column>
            </Columns>
        </div>
      );
    }
  }

  export default TestSentence;
