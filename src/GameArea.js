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

    getRandomArticles = async () => {

        /*
           Wikijs calls Wikipedia API over HTTP for some reason, 
           this results in 
           "Blocked loading mixed active content 
           "http://en.wikipedia.org/w/api.php?format=json&action=query&redirects=&list=random&rnnamespace=0&rnlimit=4&origin=*""
           
           Rewrite the code and call API directly, compose API calls using Fetch(), XHR or different library.
           I need two types of calls, the first is above "wiki().random", the second is "wiki().page"  
         */

        var correct = Math.floor(Math.random() * Math.floor(4));

        const randomPages = await wiki({
            origin: '*'
        }).random(4);

        console.log("Random Pages: " + randomPages);
        
        const wikiPage = [];
        
        for (let i=0; i<4; i++){
            wikiPage.push(await wiki({
                origin: '*'
            }).page("Jack"));
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