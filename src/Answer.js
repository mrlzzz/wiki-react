import React from 'react';
import './Answer.css'

class Answer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isWin: false
        }
        this.checkWin = this.checkWin.bind(this);
    }
    checkWin(){
        if(parseInt(this.props.answerId) === this.props.correct){
            this.props.handler();
            console.log("You won!");
        }
    }
    render(){
        return (
            <div className="Answer">
                <button onClick={this.checkWin}>{this.props.answer}</button>
            </div>
        );
    }
}

export default Answer; 