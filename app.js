const O = 'fa-circle-o';
const X = 'fa-times';
let round = 1;
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? X : O;
    if (board[row][column] !== '') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;

    console.log(check());
}

function check() {
    const result = board.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'fa-times': [],
        'fa-circle-o': []
    };
    result.forEach(function (field, index) {
        if (moves[field]) moves[field].push(index)
    });
    combinations.forEach(combination => {
        if (combination.every(index => moves[O].indexOf(index) > -1)) {
            winner = 'Winner: O';
        }
        if (combination.every(index => moves[X].indexOf(index) > -1)) {
            winner = 'Winner: X';
        }
    });

    return winner;
}