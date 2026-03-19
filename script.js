let board = document.querySelector('.board');
let button = document.querySelector('.wlc button');
let wlc = document.querySelector('.wlc');
let scoreCart = document.querySelector(".score")
let highscore = document.querySelector(".highscore")
let hscore = localStorage.getItem("highscore") || 0;
let time = document.querySelector(".time")
let pauseBtn = document.querySelector(".pause");
let resumeBtn = document.querySelector(".resume");
let restartBtn = document.querySelector(".restart");


highscore.innerText = `Highscore : ${hscore}`;

let speed = 250;
let score = 0;
let Time = 0;
let timeId;
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
        clearInterval(timeId);
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

        if (hscore < score) {
            hscore = score;

            highscore.innerText = `Highscore : ${hscore}`;
            // localStorage.setItem("highscore", hscore);
            localStorage.setItem("highscore", hscore);
        }

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

    timeId = setInterval(() => {
        Time++;

        let hours = Math.floor(Time / 3600);
        let minutes = Math.floor((Time % 3600) / 60);
        let seconds = Time % 60;

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        time.innerText = `Time : ${hours} : ${minutes} : ${seconds}`;


    }, 1000)


});

function startTimer() {

    timeId = setInterval(() => {

        Time++;

        let hours = Math.floor(Time / 3600);
        let minutes = Math.floor((Time % 3600) / 60);
        let seconds = Time % 60;

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        time.innerText = `Time : ${hours} : ${minutes} : ${seconds}`;

    }, 1000);

}

pauseBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    clearInterval(timeId);

});

resumeBtn.addEventListener("click", () => {

    clearInterval(intervalId);
    clearInterval(timeId);

    intervalId = setInterval(render, speed);

    timeId = setInterval(() => {

        Time++;

        let hours = Math.floor(Time / 3600);
        let minutes = Math.floor((Time % 3600) / 60);
        let seconds = Time % 60;

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        time.innerText = `Time : ${hours} : ${minutes} : ${seconds}`;
        

    }, 1000);

});

restartBtn.addEventListener("click", () => {

    location.reload();

});

// 

let startX = 0;
let startY = 0;

document.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX;
startY = e.touches[0].clientY;

});

document.addEventListener("touchend",(e)=>{

let endX = e.changedTouches[0].clientX;
let endY = e.changedTouches[0].clientY;

let diffX = endX - startX;
let diffY = endY - startY;

if(Math.abs(diffX) > Math.abs(diffY)){

if(diffX > 0){
dir="right";
}else{
dir="left";
}

}else{

if(diffY > 0){
dir="down";
}else{
dir="up";
}

}

});
