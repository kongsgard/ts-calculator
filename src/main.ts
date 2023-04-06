import { drawTriangle, Point, Triangle } from "./triangle.js";

const CANVAS_MAX_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const app = document.getElementById("app");
const canvas = document.createElement("canvas");
canvas.width =
  window.innerWidth > CANVAS_MAX_WIDTH ? CANVAS_MAX_WIDTH : window.innerWidth;
canvas.height = CANVAS_HEIGHT;
if (app) {
  app.insertBefore(canvas, document.getElementById("triangle-input-wrapper"));
}

let a = new Point(0, 0);
let b = new Point(1, 0);
let c = new Point(0.5, Math.cos(Math.PI / 6));
drawTriangle(canvas, a, b, c);

let triangle: Triangle = [a, b, c];
const inputs = document.getElementsByClassName("triangle-input");
for (let i = 0; i < inputs.length; i++) {
  const [x, y] = inputs[i].getElementsByTagName("input");
  x.value = triangle[i].x.toString();
  y.value = triangle[i].y.toString();
  x.addEventListener("input", (e: Event) => {
    if (e?.target) {
      triangle[i].x = parseFloat(x.value);
      drawTriangle(canvas, triangle[0], triangle[1], triangle[2]);
    }
  });
  y.addEventListener("input", (e: Event) => {
    if (e?.target) {
      triangle[i].y = parseFloat(y.value);
      drawTriangle(canvas, triangle[0], triangle[1], triangle[2]);
    }
  });
}
