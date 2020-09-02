function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createBoxes(county) {
  let boxes = "";
  for (let i = 0; i < county; i++) {
    boxes += `<div style='width:${30 + 10 * i}px; height:${
      30 + 10 * i
    }px; background-color:${getRandomColor()}'>${i + 1}</div>`;
  }
  return boxes;
}

const createBtn = document.querySelector('button[data-action="create"]');
const destroyBtn = document.querySelector('button[data-action="destroy"]');
const inputContent = document.querySelector(".js-input");
const entryPoint = document.querySelector("#boxes");
createBtn.addEventListener("click", createBtnClick);

function createBtnClick(e) {
  entryPoint.innerHTML = "";
  entryPoint.insertAdjacentHTML(
    "afterbegin",
    createBoxes(Number(inputContent.value))
  );
  destroyBtn.addEventListener("click", destroyBtnClick);
}

function destroyBtnClick(e) {
  entryPoint.innerHTML = "";
  destroyBtn.removeEventListener("click", destroyBtnClick);
}
