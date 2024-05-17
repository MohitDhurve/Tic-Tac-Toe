let playertext = document.getElementById('playertext')
let restartbtn = document.getElementById('restart')
let boxes = Array.from(document.getElementsByClassName('box'))

let winner = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "0"
const X_TEXT = "X"
// Game Logic
let currentplayer = X_TEXT
let space = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked))
}

function boxclicked(e) {
    const id = e.target.id

    if (!space[id]) {
        space[id] = currentplayer
        e.target.innerText = currentplayer

        if (playerhaswon() !== false) {
            playertext.innerText = `${currentplayer} has won!` // Fix string interpolation
            let winning_block = playerhaswon()

            winning_block.forEach(box => boxes[box].style.backgroundColor = winner) // Fix backgroundColor
            return
        }

        currentplayer = currentplayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

const winningcombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerhaswon() {
    for (const condition of winningcombo) {
        let [a, b, c] = condition
        if (space[a] && (space[a] == space[b] && space[a] == space[c])) {
            return [a, b, c]
        }
    }
    return false
}

restartbtn.addEventListener('click', restart)

function restart() {
    space.fill(null)

    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = '' // Fix backgroundColor
    })
    playertext.innerText = 'Tic Tac Toe' // Fix playertext assignment
    currentplayer = X_TEXT
}
startGame()
