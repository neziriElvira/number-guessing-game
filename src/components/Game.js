import React, { Component } from 'react';
import InitalState from './InitialState';

class Game extends Component {

    state = InitalState();
    checkGuess = this.checkGuess.bind(this);

    componentDidMount() {
        this.guessNumber.focus();
    }

    newGame = () => {
        this.setState(InitalState());
        this.submitGuess.removeAttribute("disabled", "disabled");
        this.guessNumber.removeAttribute("disabled", "disabled");
    }

    checkGuess(event) {
        event.preventDefault();
        let guessValue = parseInt(event.target.guessNumber.value, 10);
        let randomValue = this.state.randomNumber;
        event.target.guessNumber.value = "";

        if (guessValue !== "") {
            this.setState((prevState) => ({
                guesses: prevState.guesses === "" ? `Previous guesses: ${guessValue}` : `${prevState.guesses}, ${guessValue}`,
                guessCount: prevState.guessCount - 1,
                classList: "par"
            }));
            if (guessValue === randomValue) {
                this.setState({
                    result: "Congratulations! You got it right!",
                    classLastResult: "d-none",
                    classResult: "par bg-success",
                    classButtonNewGame: "par bg-success bg-newgame"
                });

                this.submitGuess.setAttribute("disabled", "disabled");
                this.guessNumber.setAttribute("disabled", "disabled");

            } else if (this.state.guessCount === 1) {
                this.setState({
                    result: "GAME OVER!",
                    classResult: "par bg-warning",
                    classButtonNewGame: "par bg-warning bg-newgame"
                });

                this.submitGuess.setAttribute("disabled", "disabled");
                this.guessNumber.setAttribute("disabled", "disabled");

            } else if (guessValue > randomValue) {
                this.setState({
                    result: "UPS! Last guess was too high!",
                    classResult: "par bg-danger"
                });
            } else if (guessValue < randomValue) {
                this.setState({
                    result: "UPS! Last guess was too low!",
                    classResult: "par bg-info"
                })
            }
        }
    }

    render() {
        return (
            <div className="container">
                <form className="form-block" onSubmit={this.checkGuess}>
                    <label>Enter a number:</label>
                    <input className="main-input" name="guessNumber" type="number" min="1" max="100" ref={(input) => { this.guessNumber = input; }} required />
                    <button className="btn" type="submit" ref={(button) => { this.submitGuess = button; }} >Submit</button>
                    <input className="btn" type="reset" value="Clear" />
                    <button className="btn" type="button" onClick={this.newGame}> Reset </button>
                </form>
                <p className={this.state.classList}>{this.state.guesses}</p>
                <p className="par">Remaining attempts: {this.state.guessCount}</p>
                <p className={this.state.classResult}>{this.state.result}</p>
                <button className={this.state.classButtonNewGame} onClick={this.newGame}>Start new game</button>
            </div>
        );
    }
}

export default Game;