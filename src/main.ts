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
let c = new Point(0.5, parseFloat(Math.cos(Math.PI / 6).toFixed(3)));
drawTriangle(canvas, a, b, c);

let triangle: Triangle = [a, b, c];
const pointInputs = document.getElementsByClassName("triangle-input");
for (let i = 0; i < pointInputs.length; i++) {
  const [x, y] = pointInputs[i].getElementsByTagName("input");
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

for (const input of document.getElementsByTagName("input")) {
  input.addEventListener("input", () => {
    const number = 245;
    (document.getElementById("area") as HTMLInputElement).value =
      number.toString();
    (document.getElementById("perimeter") as HTMLInputElement).value =
      number.toString();
    (document.getElementById("angle-a") as HTMLInputElement).value =
      number.toString() + "°";
    (document.getElementById("angle-b") as HTMLInputElement).value =
      number.toString() + "°";
    (document.getElementById("angle-c") as HTMLInputElement).value =
      number.toString() + "°";
  });
}
