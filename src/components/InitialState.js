const InitalState = () => ({
    randomNumber: Math.floor(Math.random() * 100) + 1,
    guesses: "",
    result: "",
    guessCount: 10,
    classResult: "",
    classButtonNewGame: 'd-none',
    classList: 'd-none'
});

export default InitalState;
