'use strict';

// A square represents a square on the board.
// It contains position, size information and,
// optionally, an actor that should be drawn on it.
class Square{
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
        this.ctx.ctx.strokestyle = 'black';
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw the actor if it is not null.
        if (this.actor) {
            this.ctx.fillStyles = 'black';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.actor, this.x + this.width / 2, this.y + this.height / 2 + 10);
        }
    }
}

// The TIcTacToe class defines the actual game.
class TicTacToe {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');

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
            if (x >= this.squares.x && x <= square.x + square.width && y >= square.y && y <= square.y + square.height) {
                // Set actor
                square.actor = this.actors[this.turn];
                square.draw();

                // Swwitch turn.
                this.turn = (this.turn + 1) % this.actors.length;
            }
        }
    }

    // The checkFoeWinner method ends the game if there is a winner or it's a draw.
    checkForWinner() {

    }

    // The reset method restarts the game.
    reset() {

    }
}