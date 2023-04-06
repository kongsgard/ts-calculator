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

  get points(): [Point, Point, Point] {
    return [this.a, this.b, this.c];
  }

  draw(canvas: HTMLCanvasElement): void {
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

  computeSideLengths(): number[] {
    const pointPairs = this.points.map((point, index) => {
      const nextIndex = (index + 1) % this.points.length;
      return [point, this.points[nextIndex]];
    });

    return pointPairs.map(([p1, p2]) =>
      Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
    );
  }

  computePerimeter(): number {
    return this.computeSideLengths().reduce((a, b) => a + b, 0);
  }

  computeArea(): number {
    const [a, b, c] = this.computeSideLengths();
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  computeAngles(): number[] {
    const [a, b, c] = this.computeSideLengths();
    const angleA = Math.acos((a * a + c * c - b * b) / (2 * a * c));
    const angleB = Math.acos((a * a + b * b - c * c) / (2 * a * b));
    return [angleA, angleB, Math.PI - angleA - angleB].map(
      (angle) => (angle * 180) / Math.PI
    );
  }
}
