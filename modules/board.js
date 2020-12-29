let board = undefined;
let current = 'dark';

module.exports.getBoard = function () {
    return board;
}

module.exports.getCurrent = function () {
    return current;
}

// updates board and current player
module.exports.play = function (row, column) {
    board[row][column] = current;
    current = (current === 'dark' ? 'light' : 'dark');
}

// resets board
module.exports.initBoard = function () {
    board = [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "light", "dark", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "dark", "light", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
    ];
}