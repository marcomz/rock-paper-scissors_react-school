import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CSS from '../assets/css/styles.scss';
import Title from './Title.js';
import Options from './Options.js';
import Results from './Results.js';
import Timeline from './Timeline.js';
import Fireworks from './Fireworks.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: {user: 0, cpu: 0},
            timeline: [],
            cpu_message: "I'm gonna show you how great I am!",
            gifs: {user: null, cpu: null},
            result_message: '...',
            show_fireworks: false
        };
    }

    getGif = (victory) => {
        const victory_gifs = ['https://media3.giphy.com/media/xbkMY5GeLGZG0/giphy.gif?cid=790b76115cf4584f52786e7973640f1a&rid=giphy.gif','https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif', 'https://media.giphy.com/media/RWFpHUbc6s492/giphy.gif', 'https://media.giphy.com/media/10cuF5z6VYzqW4/giphy.gif', 'https://68.media.tumblr.com/92f5d72d151d1150c8b177774b1ab571/tumblr_ohh83x7MX41so18vqo1_540.gif', 'https://i.imgur.com/6UW3Jsl.gif', 'https://media.giphy.com/media/i2dE5VvBNxBw4/giphy.gif', 'https://media1.giphy.com/media/xTiTneFZmX5JOEJEnS/source.gif', 'https://media3.giphy.com/media/3o6j8fXbqweKIIfCJW/source.gif', 'https://media.giphy.com/media/iPTTjEt19igne/giphy.gif'];
        const sad_gifs = ['https://media.giphy.com/media/2KhpwqOReXDLq/giphy.gif', 'https://thumbs.gfycat.com/HastySecondaryAtlanticspadefish-small.gif', 'https://media2.giphy.com/media/3rgXBIrhWMlIkbfUwE/giphy.gif', 'https://media.giphy.com/media/OremTbBqHow8w/giphy.gif', 'https://media2.giphy.com/media/7OQPhN9hl3QGI/source.gif', 'https://media0.giphy.com/media/ZcVmJHgVx1f7FyGUGv/giphy.gif', 'http://i.giphy.com/s1eMZx5spN6zC.gif', 'https://media.giphy.com/media/3o85xE7pIsVXSKnIQg/giphy.gif', 'https://gifimage.net/wp-content/uploads/2018/11/rick-and-morty-sad-gif-4.gif', 'https://media.giphy.com/media/jfipgv48GrDS8/giphy.gif'];

        const length = victory ? victory_gifs.length : sad_gifs.length;
        const index = Math.floor(Math.random() * length);

        return victory ? victory_gifs[index] : sad_gifs[index];
    }

    optionClicked = option => {
        this.setState({gifs: {user: null, cpu: null}});
        setTimeout(async () => {
            const cpu_move = await this.getCPUMove();
            const winner = this.getWinner(option, cpu_move.move);
            this.setState({
                score: this.getNewScore(winner),
                timeline: this.getNewTimeline(option, cpu_move.move),
                cpu_message: cpu_move.message,
                gifs: {user: this.getGif(winner==='user'), cpu: this.getGif(winner==='cpu')},
                result_message: this.getResultMessage(option, cpu_move.move, winner),
                show_fireworks: (winner === 'user') ? true : false
            });
        },1);
    }

    capitalizeLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getResultMessage = (user, cpu, winner) => {
        const user_result = winner === 'draw' ? "It's a draw" : (winner === 'user' ? 'You win' : 'You lost');
        const result_comparsion = winner === 'draw' ? 'equals' : (winner === 'user' ? 'beats' : 'loses to');
        return  this.capitalizeLetter(user) + ' '+result_comparsion+' '+this.capitalizeLetter(cpu)+'. ' + user_result;
    }

    getCPUMove = () => {
        return new Promise((resolve, reject) => {
            const options_by_first_letter = {
                R: 'rock',
                P: 'paper',
                S: 'scissors',
            };
            fetch('https://smartplay.afiniti.com/v1/play/' + this.getLastTenMovements()).then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                resolve({
                    move: options_by_first_letter[myJson.nextBestMove],
                    message: myJson.reason
                });
            });
        });
    }

    getLastTenMovements = () => {
        let results = '';
        for (let i = 0; i < 10; i++) {
            if (this.state.timeline[i]) {
                results += this.state.timeline[i].user[0].toUpperCase();
            }
        };
        return results;
    }

    getNewScore = (winner) => {
        const user_score = this.state.score.user + (winner==='user' ? 1 : 0);
        const cpu_score = this.state.score.cpu + (winner==='cpu' ? 1 : 0);
        return {user: user_score, cpu: cpu_score};
    }

    getNewTimeline = (user,cpu) => {
        const newTimeline = this.state.timeline.map((timeline_element) => {
            return timeline_element;
        });
        newTimeline.unshift({user, cpu});
        return newTimeline;
    }

    getWinner = (user, cpu) => {
        if (user === 'rock') {
            if (cpu === 'rock') {return 'draw'} else if (cpu === 'paper') {
                return 'cpu';
            } else if (cpu === 'scissors') {
                return 'user';
            }
        } else if (user === 'paper') {
            if (cpu === 'paper') {return 'draw'} else if (cpu === 'rock') {
                return 'user';
            } else if (cpu === 'scissors') {
                return 'cpu';
            }
        } else if (user === 'scissors') {
            if (cpu === 'scissors') {return 'draw'} else if (cpu === 'rock') {
                return 'cpu';
            } else if (cpu === 'paper') {
                return 'user';
            }
        }
    }

    render() {
        return (
            <div className='app'>
                {this.state.show_fireworks ? <Fireworks /> : null}
                <Title />
                <Options optionClicked={this.optionClicked} />
                <p className='screen_message'>{this.state.result_message}</p>
                <Results score={this.state.score} gifs={this.state.gifs} />
                <div className='screen_message'>{'CPU says: ' + this.state.cpu_message}</div>
                <Timeline timeline={this.state.timeline} />
            </div>
        )
    }
}


let container = document.getElementById('app');
let component = <App />;

ReactDOM.render(component, container);
