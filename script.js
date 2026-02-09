const grid = document.querySelector("#main-grid")
const btnSave = document.querySelector("#btnSave")
const btnLoad = document.querySelector("#btnLoad")
const template = document.querySelector("template")

const startBtns = document.querySelector('#start-buttons')
const editBtns = document.querySelector('#edit-buttons')

const states = ['node-grass', 'node-track', 'node-water']

let data  = []

let i = 0
while (i < 400) {
    let node = template.content.cloneNode(true).firstElementChild

    node.dataset.index = i

    node.addEventListener('click', (e) => tileControl(e))
    data[i] = 0

    grid.appendChild(node)
    i++
}

btnSave.addEventListener('click', saveData)
btnSave.addEventListener('click', loadData)

function tileControl(e){
    let tileValue = data[parseInt(e.target.dataset.index)]

    e.target.classList.remove(states[tileValue])
    tileValue = (tileValue + 1) % states.length
    e.target.classList.add(states[tileValue])

    data[parseInt(e.target.dataset.index)] = tileValue
}

function saveData(){
    localStorage.setItem('data1', JSON.stringify(data))
}

function loadData(){
    let xxx = localStorage.getItem('data1')

    if (xxx){
        data = JSON.parse(xxx)
    }

    console.log(data)
}

function refreshGrid(){
    let i = 0
    while (i < 400) {

    }
}