const grid = document.querySelector("#main-grid")

let node = document.createElement("div")

node.classList.add("node-unit")
node.innerHTML = "x"

let i = 0

while (i < 400) {
    let xxx = node.cloneNode()
grid.appendChild(xxx)
}