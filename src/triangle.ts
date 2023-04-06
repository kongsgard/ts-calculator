import { Point } from "./point.js";

export class Triangle {
  a: Point;
  b: Point;
  c: Point;

  constructor(a: Point, b: Point, c: Point) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get points() {
    return [this.a, this.b, this.c];
  }

  draw(canvas: HTMLCanvasElement) {
    const getMinimumValue = (a: Point, b: Point, c: Point): number => {
      return Math.min(a.x, a.y, b.x, b.y, c.x, c.y);
    };

    const getMaximumValue = (a: Point, b: Point, c: Point): number => {
      return Math.max(a.x, a.y, b.x, b.y, c.x, c.y);
    };

    const min = getMinimumValue(this.a, this.b, this.c);
    const max = getMaximumValue(this.a, this.b, this.c);
    const a = this.a.normalize(min, max).mapToCanvas(canvas);
    const b = this.b.normalize(min, max).mapToCanvas(canvas);
    const c = this.c.normalize(min, max).mapToCanvas(canvas);

    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.lineTo(c.x, c.y);
      context.fill();
    }
  }
}
