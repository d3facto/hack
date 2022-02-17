Jeu de tictacoe en ligne

Quand l'utilisateur clique pour jouer : 

UI send message to websocket 
```json
// START
{
  "event": "play",
  "gameId": "12234",
  "userId": "XXX",
  "payload": {
    "squares": [null, null, null, null, null],
    "stepNumber": 0,
  }
}

// FIRST GAME
{
  "event": "play",
  "gameId": "12234",
  "userId": "XXX",
  "payload": {
    "squares": [null, "X", null, null, null],
    "stepNumber": 1,
  }
}
```

[]

this.state = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
};

handleClick(i) 

[null, null, null]
[null, O, X]
