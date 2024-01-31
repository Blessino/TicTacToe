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

        // Draw the actor
    }
}