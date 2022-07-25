const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const color = document.getElementById("color");
const ctx = canvas.getContext("2d");
const bucket = document.getElementsByClassName("bucket")[0];

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

console.log(canvasOffsetX);
console.log(canvasOffsetY);
console.log(window.innerHeight);
console.log(window.innerWidth);

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
ctx.lineCap = "round";

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "white";
    document.getElementsByTagName("p")[0].innerHTML = "Draw Here";
  }
  if (e.target.id === "round") ctx.lineCap = "round";
  if (e.target.id === "square") ctx.lineCap = "square";
  if (e.target.id === "bucket") canvas.style.backgroundColor = color.value;
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "color") {
    ctx.strokeStyle = e.target.value;
    bucket.style.backgroundColor = e.target.value;
  }

  if (e.target.id === "lineWidth") {
    lineWidth = e.target.value;
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = lineWidth;

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  document.getElementsByTagName("p")[0].innerHTML = "";
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);
