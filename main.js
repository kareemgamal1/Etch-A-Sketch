const container = document.querySelector(".container");
const gridValue = document.getElementById("gridValue");
const gridSlider = document.getElementById("gridRange");
const colorPicker = document.getElementById("color");

function makeGrid(gridSize) {
  container.style.setProperty("--grid-rows", gridSize);
  container.style.setProperty("--grid-cols", gridSize);
  for (i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
  }
}

makeGrid(gridSlider.value);
gridValue.textContent = gridSlider.value;
gridSlider.oninput = function () {
  gridValue.textContent = this.value;
  makeGrid(this.value);
  //the problem is that makeRows append childs,
  //so everytime the number of squares are increased
};

let itemsArr = document.querySelectorAll(".grid-item");
itemsArr.forEach(function (elem) {
  elem.addEventListener("mouseover", (event) => {
    elem.classList.add("colored");
  });
});

colorPicker.oninput = function () {
  itemsArr.forEach(function (elem) {
    elem.addEventListener("mouseover", (event) => {
      elem.style.setProperty("--color", colorPicker.value);
    });
  });
};
