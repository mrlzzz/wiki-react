import React from 'react';
import wiki from 'wikijs';
import Question from './Question';
import AnswerArea from './AnswerArea';
import './GameArea.css';

class GameArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "Question",
            answerList: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
            correct: Math.floor(Math.random() * Math.floor(4)),
            isWin: false,
            isLoaded: false,
            randomTitles: []
        }
        this.getRandomArticles = this.getRandomArticles.bind(this);
        this.getRandomTitles = this.getRandomTitles.bind(this);
        this.getArticles = this.getArticles.bind(this);
        this.winHandler = this.winHandler.bind(this);
    }

    componentDidMount(){
        this.getRandomTitles();
    }

    winHandler(){
        this.getRandomTitles();
        this.setState({
            question: "Great! The next question is..."
        });
    }

    getRandomTitles = () => {
        fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=&list=random&rnnamespace=0&rnlimit=4&origin=*")
            .then(res => res.json())
            .then(res => {
                
                let y = [];
                
                for(let x of res.query.random) y.push(x.title);

                this.setState({
                    answerList: y
                });
                
                this.getArticles(this.state.answerList);
            });
    }
    
    /*
        Choose one article, flag it as correct, fetch summary of correct one, redact it and set up as a question
    */

    getArticles = (list) => {
  
        let correct = this.state.correct;
        let summary = "";
        
        /*
            Fetch articles in a form of a article summary using the titles from 'getRandomTitles()'.
            API Call returns json with 'query', 'pages' and 'extract' properties.
            'extract' property is a article summary.
        */
        
        fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=&prop=extracts&explaintext=&exintro=&titles=${list[correct]}&origin=*`)
            .then(res => res.json())
            .then(res => {
                
                summary = Object.entries(res.query.pages)[0][1].extract;

                let reg = new RegExp(list[correct], "g");
                summary = summary.replace(reg, " --- ");
                summary = summary.split(".");
                if(summary.length > 4) {
                    summary.splice(4);
                }

                this.setState({
                    question: summary
                });
            });
    }

    render(){
        return (
            <div className="GameArea">
                <Question question={this.state.question}/>
                <AnswerArea answerList={this.state.answerList} correct={this.state.correct} handler={this.winHandler}/>
            </div>
        );
    }

}

export default GameArea; 