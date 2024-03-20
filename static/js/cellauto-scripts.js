const formElements = {
  'tableSizeElem'       : document.querySelector('#arena_n'),
  'iterCountElem'       : document.querySelector('#arena_times'),
  'gameSpeedElem'       : document.querySelector('#game_speed'),
  'templateCoordsElem'  : document.querySelector('#template_coords'),
  'cellsCoordsElem'     : document.querySelector('#cells_coords'),
  'formElem'            : document.querySelector('#form'),
  'submitFormElem'      : document.querySelector('#submit_form')
}
const arena = document.querySelector('#game_grid')
const bodyElem = document.querySelector('body')
const templateCoords = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]

// Массив индексов включенных в шаблон координат
const activeCoordsIdx = []
const templateElements = document.querySelectorAll('#template_square')

// Статус игры; 1 - запущена
let gamePolling = 0
let aliveCells = []
let arenaCoords = []

templateElements.forEach((elem, idx) => {
  elem.addEventListener('click', (event) => {
    event.preventDefault()
    // Если игра запущена, то игнорируем изменения
    if (gamePolling) {
      return
    }
    // центр не считаем
    if (idx === 4) {
      return
    }
    if (activeCoordsIdx.indexOf(idx) === -1) {
      activeCoordsIdx.push(idx)
      elem.style.background = '#de3e3e'
    }else {
      activeCoordsIdx.splice(activeCoordsIdx.indexOf(idx), 1)
      elem.style.background = '#fff'
    }
  })
})

formElements.tableSizeElem.addEventListener('change', () => {
  arenaInit(Number(formElements.tableSizeElem.value))
})

formElements.formElem.addEventListener('submit', (event) => {
  event.preventDefault()
  if (gamePolling) return;
  let counter = 0;
  const arenaElements = document.querySelectorAll('.game_grid-block')
  const iters = Number(formElements.iterCountElem.value)
  const gameInterval = setInterval(() => {
    gamePolling = 1
    bodyElem.style.background = '#9ae7ff'
    if (counter >= iters) {
      clearInterval(gameInterval)
      gamePolling = 0
      aliveCells = []
      bodyElem.style.background = '#ededed'
    }else {
      counter++
      gameIteration(arenaElements)
      aliveCells.forEach(idx => {
        changeArenaBlockStatus(arenaElements[idx], idx, 0)
      })
    }
  }, Number(formElements.gameSpeedElem.value));
})

arenaInit(Number(formElements.tableSizeElem.value))

function arenaInit(n) {
  arena.innerHTML = ''
  arena.style.gridTemplateColumns = `repeat(${n}, 1fr)`
  let strHtml = ''
  arenaCoords = []
  let idx = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      arenaCoords.push([i, j])
      strHtml += `<div class="game_grid-block" onclick="changeArenaBlockStatus(this, ${idx})"></div>`
      idx++
    }
  }
  arena.innerHTML = strHtml
}

function changeArenaBlockStatus(elem, idx, flag = 1) {
  if (gamePolling & flag === 1) {
    return
  }
  if (!elem.style.background | elem.style.background === 'rgb(255, 255, 255)') {
    if (flag) aliveCells.push(idx);
    elem.style.background = '#de3e3e'
  }else {
    elem.style.background = 'rgb(255, 255, 255)'
    if (flag) aliveCells.splice(aliveCells.indexOf(idx), 1);
  }
}

// Возвращает количество соседей
function checkNeighbors(coords) {
  let count = 0
  activeCoordsIdx.forEach(templateIdx => {
    const curX = coords[0] + templateCoords[templateIdx][0]
    const curY = coords[1] + templateCoords[templateIdx][1]
    if (curX >= 0 & curY >= 0) {
      position = arenaCoords.findIndex(coord => coord[0] === curX && coord[1] === curY)
      if (position >= 0) {
        if (aliveCells.indexOf(position) !== -1) {
          count++
        }
      }
    }
  })
  return count
}

// Обновляем статус клеток за момент времени
function gameIteration(arenaElements) {
  if (arenaCoords.length === 0) {
    return;
  }
  const newData = []
  arenaCoords.forEach((elem, idx) => {
    const neighbors = checkNeighbors(elem)
    if (aliveCells.indexOf(idx) !== -1) {
      if (neighbors == 2 || neighbors == 3) {
        newData.push(idx)
      }
    }else {
      if (neighbors === 3) {
        newData.push(idx)
      }
    }
  })
  // очищаем поле для перерисовки
  aliveCells.forEach(idx => {
    changeArenaBlockStatus(arenaElements[idx], idx, 0)
  })
  aliveCells = newData
}