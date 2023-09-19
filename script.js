const gameBoard = document.querySelector('.game-board')

let inputDirection = { x: -1, y: 0 }

let snakeArr = [
  {
    x: 15,
    y: 15,
  },
]
let foodObj = { x: 4, y: 4 }

let lastTime = 0
let SPEED = 5.5

function main(ctime) {
  window.requestAnimationFrame(main)
  let shortTime = ctime - lastTime
  if (shortTime / 1000 < 1 / SPEED) return
  lastTime = ctime
  gameLogic()
}
window.requestAnimationFrame(main)

function gameLogic() {
  if (
    snakeArr[0].x > 18 ||
    snakeArr[0].y > 18 ||
    snakeArr[0].x < 0 ||
    snakeArr[0].y < 0
  ) {
    alert('you lose! you hit the wall.')
    inputDirection = { x: -1, y: 0 }
    foodObj = { x: 4, y: 4 }
    return (snakeArr = [
      {
        x: 16,
        y: 16,
      },
    ])
  }
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      alert('you lose! you eat yourself')
      inputDirection = { x: -1, y: 0 }
      foodObj = { x: 4, y: 4 }
      return (snakeArr = [
        {
          x: 16,
          y: 16,
        },
      ])
    }
  }
  if (snakeArr[0].x === foodObj.x && snakeArr[0].y === foodObj.y) {
    // updating the game
    foodObj = {
      x: Math.floor(Math.random() * (16 - 2 + 1) + 2),
      y: Math.floor(Math.random() * (16 - 2 + 1) + 2),
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
    snake.style.gridRowStart = e.x
    snake.style.gridColumnStart = e.y
    if (index === 0) {
      snake.classList.add('head')
    }
    snake.classList.add('snake')
    gameBoard.append(snake)
  })

  const food = document.createElement('div')
  food.classList.add('food')
  food.style.gridRowStart = foodObj.x
  food.style.gridColumnStart = foodObj.y
  gameBoard.append(food)
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
