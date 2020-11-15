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
            correct: 0,
            isWin: false
        }
        this.getRandomArticles = this.getRandomArticles.bind(this);
        this.winHandler = this.winHandler.bind(this);
    }

    componentDidMount(){
        this.getRandomArticles();
    }
    winHandler(){
        this.getRandomArticles();
        this.setState({
            question: "Brawo! LECIMY DALEJ"
        })
    }
    getRandomArticles = async () => {
        var correct = Math.floor(Math.random() * Math.floor(4));
        const randomPages = await wiki({
            origin: "https://wiki-react.herokuapp.com/"
        }).random(4);
        console.log("Random Pages: " + randomPages);
        const wikiPage = [];
        for (let i=0; i<4; i++){
            wikiPage.push(await wiki({
                origin: "https://wiki-react.herokuapp.com/"
            }).page(randomPages[i]));
        }
        wikiPage[correct].summary().then(r => {
    
            //Redact title from summary and keep it 4 sentences max.
            let arr = wikiPage[correct].raw.title.split(" ");
            arr.forEach(e => {
                let reg = new RegExp(e, "g");
                r=r.replace(reg, " --- ");
            });
    
            this.setState({
                question: r,
                answerList: randomPages,
                correct: correct
            })
            console.log(r);
            //Check how many sentences from summary, if more then 4, then cut the rest off
            r = r.split(".");
            if(r.length > 4) {
                r.splice(4);
            }
            
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