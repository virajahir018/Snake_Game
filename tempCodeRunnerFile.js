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