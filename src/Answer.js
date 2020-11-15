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
        if(this.props.answerId == this.props.correct){
            this.props.handler();
            console.log("You woddn");
        }
        fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=&list=random&rnnamespace=0&rnlimit=4&origin=*")
            .then(res => res.json())
            .then(
                (result) => {
                console.log(result.query.random);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
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