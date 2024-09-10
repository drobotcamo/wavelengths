export interface Lobby {
    players: string[],
    lastGuesser: string | null,
    gameCode: string,
    host: string,
    numberWins: Object
    totalGames: number
}

export interface Game {
    currentCategory: number,
    cats: string[],
    submissions: any[],
    guesser: string,
    chosenNumber: number
    numCategories: number
    guesserMin: number
    guesserMax: number
    finalGuess: number
}

export type Role = "guesser" | "provider";
