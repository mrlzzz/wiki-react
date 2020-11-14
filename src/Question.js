import React from 'react';
import './Question.css';

class Question extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="Question"> 
                <p>{this.props.question}</p>
            </div>
        );
    }
}

export default Question; 