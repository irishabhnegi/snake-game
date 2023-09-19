const gameBoard = document.querySelector('.game-board')

let inputDirection = { x: -1, y: 0 }

const snakeArr = [
  {
    x: 16,
    y: 16,
  },
]
let foodObj = { x: 4, y: 4 }

let lastTime = 0
let SPEED = 5

function main(ctime) {
  window.requestAnimationFrame(main)
  let shortTime = ctime - lastTime
  if (shortTime / 1000 < 1 / SPEED) return
  lastTime = ctime
  gameLogic()
}
window.requestAnimationFrame(main)

function gameLogic() {
  // updating the game
  if (snakeArr[0].x === foodObj.x && snakeArr[0].y === foodObj.y) {
    foodObj = {
      x: Math.floor(Math.random() * 18),
      y: Math.floor(Math.random() * 18),
    }
    snakeArr.unshift({ x: snakeArr[0].x, y: snakeArr[0].y })
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1].x = snakeArr[i].x
    snakeArr[i + 1].y = snakeArr[i].y
  }
  snakeArr[0].x += inputDirection.x
  snakeArr[0].y += inputDirection.y
  // Rendering the game
  gameBoard.innerHTML = ''
  snakeArr.forEach((e, index) => {
    const snake = document.createElement('div')
    snake.classList.add('snake')
    snake.style.gridRowStart = e.x
    snake.style.gridColumnStart = e.y
    gameBoard.append(snake)
  })

  const food = document.createElement('div')
  food.classList.add('food')
  food.style.gridRowStart = foodObj.x
  food.style.gridColumnStart = foodObj.y
  gameBoard.append(food)
  //   console.log(inputDirection)
}

window.addEventListener('keydown', (e) => {
  console.log(e.key)

  switch (e.key) {
    case 'ArrowUp':
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowDown':
      inputDirection = { x: 1, y: 0 }
      break
    case 'ArrowLeft':
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowRight':
      inputDirection = { x: 0, y: 1 }
      break

    default:
      break
  }
})
