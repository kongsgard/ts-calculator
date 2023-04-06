import { Point } from "./point.js";
import { Triangle } from "./triangle.js";

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

let triangle = new Triangle(
  new Point(0, 0),
  new Point(1, 0),
  new Point(0.5, parseFloat(Math.cos(Math.PI / 6).toFixed(3)))
);
triangle.draw(canvas);

const pointInputs = document.getElementsByClassName("triangle-input");
const trianglePoints = triangle.points;
for (let i = 0; i < pointInputs.length; i++) {
  const point = trianglePoints[i];
  const [x, y] = pointInputs[i].getElementsByTagName("input");
  x.value = point.x.toString();
  y.value = point.y.toString();
  x.addEventListener("input", (e: Event) => {
    if (e?.target) {
      point.x = parseFloat(x.value);
      triangle.draw(canvas);
    }
  });
  y.addEventListener("input", (e: Event) => {
    if (e?.target) {
      point.y = parseFloat(y.value);
      triangle.draw(canvas);
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
