let board = document.querySelector('.board');
let button = document.querySelector('.wlc button');
let wlc = document.querySelector('.wlc');
let scoreCart = document.querySelector(".score")

let score = 0;
const rows = 20;
const cols = 30;

let intervalId = null;

let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
};

const boxes = [];
const snake = [{ x: 1, y: 3 }];

let direction = 'right';

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

    let head;

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };

    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };

    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };

    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    if (head.x < 0
        || head.x >= rows
        || head.y < 0
        || head.y >= cols
        // || snake == head.x
        || snake.slice(1).some(s => s.x == head.x && s.y == head.y)) {
        alert("Game is Over");
        clearInterval(intervalId);
    }


    snake.unshift(head);
    snake.pop();

    clearSnake();

    snake.forEach(s => {
        boxes[`${s.x}-${s.y}`].classList.add("snake");
    });

    boxes[`${food.x}-${food.y}`].classList.add("food");

    if (head.x == food.x && head.y == food.y) {

        score++;
        scoreCart.innerText = `Score : ${score}`;

        boxes[`${food.x}-${food.y}`].classList.remove("food");


        do {
            food = {
                x: Math.floor(Math.random() * rows),
                y: Math.floor(Math.random() * cols)
            };
        } while (snake.some(s => s.x === food.x && s.y === food.y));

        boxes[`${food.x}-${food.y}`].classList.add("food");

        snake.unshift(head);


    }

}

function clearSnake() {
    Object.values(boxes).forEach(box => {
        box.classList.remove("snake");
    });
}

// intervalId = setInterval(() => {


//     render();

// }, 250);

addEventListener("keydown", (evt) => {


    if (evt.key === "ArrowLeft" && direction !== "right") {
        direction = "left"
    }

    if (evt.key === "ArrowRight" && direction !== "left") {
        direction = "right"
    }

    if (evt.key === "ArrowUp" && direction !== "down") {
        direction = "up"
    }

    if (evt.key === "ArrowDown" && direction !== "up") {
        direction = "down"
    }
});

button.addEventListener("click", () => {
    // intervalId = setInterval(() => { render() }, 250)
    wlc.style.display = "none";
    if (!intervalId) {
        intervalId = setInterval(render, 250);
    }
});

// SPEED

let speed = 250;

// function increaseSpeed() {
//     if (score % 5 === 0 && speed > 100) {
//         speed -= 20;

//         clearInterval(intervalId);
//         intervalId = setInterval(render, speed);

//     }


// }

// SCORE 


