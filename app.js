'use strict';

// A square represents a square on the board.
// It contains position, size information and,
// optionally, an actor that should be drawn on it.
class Square {
    constructor(x, y, width, height, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height =  height;
        this.ctx = ctx;
        this.actor = null;
        
    }

    // The draw method is used to draw the square.
    draw() {
        // Draw the ract.
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw the actor if it is not null.
        if (this.actor) {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.actor, this.x + this.width / 2, this.y + this.height / 2 + 10);
        }
    }
}

// The TIcTacToe class defines the actual game.
class TicTacToe {
    
    constructor(id) {
        // Get canvas and context.
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.turnPlayer = document.getElementById("turn");

        // Create an empty array to store the squares.
        this.squares = [];

        // Get square width and height.
        const w = this.canvas.width / 3;
        const h = this.canvas.height / 3;

        // Create 3x3 squares.
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                this.squares.push(new Square(x * w, y * h, w, h, this.ctx));
            }
        }

        // Create the actors.
        this.actors = ["X", "O"];
        this.turnPlayer.innerHTML = "Start game X turn";

        // Define the current actors.
        this.turn = 0;

        // Defines a check to see if the game is over.
        this.gameOver = false;

        // Draw the board.
        this.squares.forEach(squares => squares.draw());

        // Bind the click event.
        this.canvas.addEventListener('click', function(event) {this.click(event); }.bind(this));
        
    }

    // The click method is called whenever the canvcas is clicked.
    // The method is used to check if the mouse clicked within one of the empty squares.
    click(event) {
        // If the game has ended, reset the game.
        if (this.gameOver) {
            this.reset();
            return;
        }

        // Get mouse position.
        const x = event.offsetX;
        const y = event.offsetY;

        // Check if one of the squares was clicked.
        for (let square of this.squares) {
            // Only allow empty squares to be clicked.
            if (square.actor != null) continue;
            // Check if the mouse is inside the squares.
            if (x >= square.x && x <= square.x + square.width && y >= square.y && y <= square.y + square.height) {
                // Set actor
                square.actor = this.actors[this.turn];
                console.log(square.actor);
                square.draw();
                this.turnPlayer.innerHTML = "x turn";
                // this.turnPlayer = square.actor === 0 ? square.actor === 1 : innerHTML = "x turn";
                if (square.actor === this.actors[0] ){
                    this.turnPlayer.innerHTML = "O turn";
                    console.log("x turn");
                } else if (square.actor === this.actors[1]) {
                    
                    this.turnPlayer.innerHTML = "X turn";
                    console.log("o turn");
                }

                // Swwitch turn.
                this.turn = (this.turn + 1) % this.actors.length;
                
               
            }
        }

        // Check if the game should end.
        this.checkForWinner();
    }

    // The checkFoeWinner method ends the game if there is a winner or it's a draw.
    checkForWinner() {
        // Check if the game is over.
        const winnerCombinations = [
            // Columns
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            // Diagonals
            [0, 4, 8], [2, 4, 6]
        ];

        // Check combinations
        for (let i = 0; i < winnerCombinations.length; i++) {
            // Get combination
            let combination = winnerCombinations[i];

            // get squares
            let s1 = this.squares[combination[0]];
            let s2 = this.squares[combination[1]];
            let s3 = this.squares[combination[2]];

            // Ensure the combinaton is not three empty squares.
            if (s1.actor != null) {
                // check if the three squares has the same actor.
                if (s1.actor == s2.actor && s1.actor == s3.actor) {
                    // Set game over.
                    this.gameOver = true;

                    // Draw the combination line.
                    this.ctx.beginPath();
                    this.ctx.moveTo(s1.x + s1.width/2, s1.y + s1.height/2);
                    this.ctx.lineTo(s3.x + s3.width/2, s3.y + s3.height/2);
                    this.ctx.stroke();

                    // Draw winner text.
                    this.ctx.fillStyle = 'red';
                    this.ctx.font = '30px Arial';
                    this.ctx.textAlign = "center";
                    this.ctx.fillText(s1.actor + " wins!", this.canvas.width / 2, this.canvas.height / 2);
                }
            }
        }

        // Check if the game is draw.
        if (!this.gameOver && this.squares.filter(square => square.actor == null).length == 0) {
            this.gameOver = true;
            this.ctx.fillStyle = 'red';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = "center";
            this.ctx.fillText("Draw!", this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    // The reset method restarts the game.
    reset() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Reset all actors.
        this.squares.forEach(squares => squares.actor = null);
        // Draw the boared.
        this.squares.forEach(squares => squares.draw());
        // Reset turn.
        this.turn = 0;
        // reset game over.
        this.gameOver = false;
    }
}

// Create a new game.
new TicTacToe('canvas');