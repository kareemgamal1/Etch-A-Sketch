const container = document.querySelector(".container");
const gridValue1 = document.getElementById("gridValue1");
const gridValue2 = document.getElementById("gridValue2");
const gridSlider = document.getElementById("gridRange");
const colorMode = document.getElementById("color");
const rainbowMode = document.getElementById("rainbow");
const eraseMode = document.getElementById("erase");
const colorPicker = document.getElementById("coloring");
const resetButton = document.getElementById("reset");
const gridLines = document.getElementById("gridLines");

function makeGrid(gridSize) {
  container.style.setProperty("--grid-rows", gridSize);
  container.style.setProperty("--grid-cols", gridSize);
  for (i = 0; i < gridSize * gridSize; i++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
  }
  let itemsArr = document.querySelectorAll(".grid-item");
  colorPicker.onchange = function () {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.style.setProperty("--color", colorPicker.value);
      });
    });
  };
  function getRandomColor() {
    let rainbowColors = [
      "#8F00FF",
      "#4B0082",
      "#0000FF",
      "#00FF00",
      "#FFFF00",
      "#FFA500",
      "#FF0000",
    ];
    let randomIndex = Math.floor(Math.random() * 7);
    return rainbowColors[randomIndex];
  }
  if (colorMode.checked) {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.classList.add("colored");
        elem.style.setProperty("--color", colorPicker.value);
        console.log(colorPicker.value);
      });
    });
  } else if (rainbowMode.checked) {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.classList.add("colored");
        elem.style.setProperty("--color", getRandomColor());
      });
    });
  } else if (eraseMode.checked) {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.classList.remove("colored");
      });
    });
  }
  colorMode.onclick = function () {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.classList.add("colored");
        elem.style.setProperty("--color", colorPicker.value);
      });
    });
    colorPicker.style.opacity = "100";
  };

  rainbowMode.onclick = function () {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.classList.add("colored");
        elem.style.setProperty("--color", getRandomColor());
      });
    });
    colorPicker.style.opacity = "0";
  };

  eraseMode.onclick = function () {
    itemsArr.forEach(function (elem) {
      elem.addEventListener("mouseover", (event) => {
        elem.classList.remove("colored");
      });
    });
    colorPicker.style.opacity = "0";
  };

  function checkGridLines() {
    if (gridLines.checked === false) {
      itemsArr.forEach(function (elem) {
        elem.style.outline = "none";
      });
    } else {
      itemsArr.forEach(function (elem) {
        elem.style.outline = "1px solid black";
      });
    }
  }
  checkGridLines();
  gridLines.oninput = function () {
    checkGridLines();
  };
}

makeGrid(gridSlider.value);

gridValue1.textContent = gridSlider.value;
gridValue2.textContent = gridSlider.value;
gridSlider.oninput = function () {
  gridValue1.textContent = this.value;
  gridValue2.textContent = this.value;
};

function deleteItems() {
  let item = container.lastElementChild;
  while (item) {
    container.removeChild(item);
    item = container.lastElementChild;
  }
}

resetButton.onclick = function () {
  deleteItems();
  makeGrid(gridSlider.value);
};
