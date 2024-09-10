interface Lobby {
    players: string[],
    lastGuesser: string | undefined,
    gameCode: string,
    host: string,
    numberWins: Object
    totalGames: number
}

interface Game {
    currentCategory: number,
    cats: string[],
    submissions: Object[],
    guesser: string,
    chosenNumber: number
    numCategories: number
    guesserMin: number
    guesserMax: number
}