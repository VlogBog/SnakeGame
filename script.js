        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const box = 20;
        let snake = [{ x: 9 * box, y: 9 * box }];
        let direction = null;
        let food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        let score = 0;
        let game;

        document.addEventListener('keydown', directionControl);
        // Обработка на клик събития за мобилните бутони
        document.getElementById('up').onclick = () => setDirection('UP');
        document.getElementById('down').onclick = () => setDirection('DOWN');
        document.getElementById('left').onclick = () => setDirection('LEFT');
        document.getElementById('right').onclick = () => setDirection('RIGHT');

        function setDirection(newDirection) {
            if (direction === null) {
                game = setInterval(draw, 150);
            }
            if (newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
            if (newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
            if (newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
            if (newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
        }

        function directionControl(event) {
            if (event.keyCode >= 37 && event.keyCode <= 40) {
                setDirection(
                    event.keyCode == 37 ? 'LEFT' :
                    event.keyCode == 38 ? 'UP' :
                    event.keyCode == 39 ? 'RIGHT' : 'DOWN'
                );
            }
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return true;
                }
            }
            return false;
        }

        function draw() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = 'green';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, box, box);

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;

            if (snakeX === food.x && snakeY === food.y) {
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
                score++;
                document.getElementById('score').innerText = 'Score: ' + score;
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
                alert('Game Over! Final Score: ' + score);
                document.location.reload();
            }

            snake.unshift(newHead);
        }
