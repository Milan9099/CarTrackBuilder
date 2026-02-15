const grid = document.querySelector("#main-grid")
const template = document.querySelector("template")

const startBtns = document.querySelector('#start-buttons')
const editBtns = document.querySelector('#edit-buttons')
const btnSave = document.querySelector("#btnSave")
const btnLoad = document.querySelector("#btnLoad")
const btnNew = document.querySelector("#btnNewMap")
const btnReset = document.querySelector("#btnReset")
const btnBack = document.querySelector("#btnBack")

const modal = document.querySelector("#loadModal");
const mapsList = document.querySelector("#maps-list");
const btnCloseModal = document.querySelector("#closeModal");

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
btnLoad.addEventListener('click', loadData)
btnNew.addEventListener('click', newMap)
btnReset.addEventListener('click', reset)
btnBack.addEventListener('click', backToMenu)

btnCloseModal.addEventListener('click', () => {
    modal.classList.add('hidden')
})

function tileControl(e){
    let tileValue = data[parseInt(e.target.dataset.index)]

    e.target.classList.remove(states[tileValue])
    tileValue = (tileValue + 1) % states.length
    e.target.classList.add(states[tileValue])

    data[parseInt(e.target.dataset.index)] = tileValue
}

function reset(){
    let i = 0
    while (i < 400) {
        data[i] = 0
        i++
    }

    refreshGrid()
}

function newMap(){
    startBtns.classList.add('hidden')
    editBtns.classList.remove('hidden')
    grid.classList.remove('hidden')

    reset()
}

function backToMenu(){
    startBtns.classList.remove('hidden')
    editBtns.classList.add('hidden')
    grid.classList.add('hidden')
}

function saveData() {
    const mapName = prompt("Zadej název mapy pro uložení:");

    if (!mapName) return;

    let allMaps = JSON.parse(localStorage.getItem('myTrackEditorMaps')) || {};

    allMaps[mapName] = data;

    localStorage.setItem('myTrackEditorMaps', JSON.stringify(allMaps));

    alert(`Mapa "${mapName}" byla úspěšně uložena.`);
}

function refreshGrid() {
    const nodes = grid.querySelectorAll('.node-unit');

    nodes.forEach((node, index) => {
        const value = data[index];

        node.classList.remove(...states);

        node.classList.add(states[value]);
    });
}

function loadData() {
    const allMaps = JSON.parse(localStorage.getItem('myTrackEditorMaps')) || {};
    const names = Object.keys(allMaps);

    if (names.length === 0) {
        alert("Nemáš uložené žádné mapy.");
        return;
    }

    mapsList.innerHTML = "";
    modal.classList.remove("hidden");

    names.forEach(name => {
        const btn = document.createElement("button");
        btn.innerText = name;
        btn.className = "load-map-btn";

        btn.onclick = () => {
            data = allMaps[name];
            refreshGrid();
            modal.classList.add("hidden");

            startBtns.classList.add('hidden')
            editBtns.classList.remove('hidden')
            grid.classList.remove('hidden')
        };

        mapsList.appendChild(btn);
    });
}