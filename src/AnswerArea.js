import React from 'react';
import Answer from './Answer';
import './AnswerArea.css';

class AnswerArea extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="AnswerArea">
                <Answer answer={this.props.answerList[0]} answerId="0" correct={this.props.correct} handler={this.props.handler}/>
                <Answer answer={this.props.answerList[1]} answerId="1" correct={this.props.correct} handler={this.props.handler}/>
                <Answer answer={this.props.answerList[2]} answerId="2" correct={this.props.correct} handler={this.props.handler}/>
                <Answer answer={this.props.answerList[3]} answerId="3" correct={this.props.correct} handler={this.props.handler}/>
            </div>
        );
    }
}

export default AnswerArea; 