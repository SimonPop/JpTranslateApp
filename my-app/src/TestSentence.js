import React from 'react';

function getSentencePair() {
    // TODO: Call Python for generation of one sentence pair (or JS?)
    return {
      japanese_sentence: '反応テスト', 
      english_sentence: 'React test.'
    }; 
  }

export class TestSentence extends React.Component {
    constructor(props) {
      super(props);

    // Get an initial pair of sentences to translate.
    const {japanese_sentence, english_sentence } = getSentencePair();

      this.state = {
        japanese_sentence: japanese_sentence,
        english_sentence: english_sentence,
        user_translation: '',
      };
    }
  
    reinitSentence() {
        const {japanese_sentence, english_sentence} = getSentencePair();
        this.setState({
            japanese_sentence: japanese_sentence,
            english_sentence: english_sentence,
            user_translation: '',
          });
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
          <p>Sentence: {this.state.japanese_sentence}</p>
          <p>Answer: </p> <input type="text" value={this.state.user_translation} onChange={this.handleChange}/> 
          <button type="button" onClick={() => this.validate_translation()}>Validate</button>
        </div>
      );
    }
  }

  export default TestSentence;
