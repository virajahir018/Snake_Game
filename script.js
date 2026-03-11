let board = document.querySelector('.board');
const rows = 30;
const cols = 20;

const boxes = [];
// const snake = [{ x: 1, y: 3 }];

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const box = document.createElement('div');
        box.classList.add('box');
        board.appendChild(box);
        // box.innerText = `${row}-${col}`;
        boxes[`${row}-${col}`] = box;
    }
}

function render() {
    snake.forEach(segment => {
        boxes[`${segment.x}-${segment.y}`].classList.add[`snake`]
    })
}