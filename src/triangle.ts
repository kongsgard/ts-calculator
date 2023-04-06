export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normalize(min: number, max: number): Point {
    return new Point(
      (this.x - min) / (max - min),
      (this.y - min) / (max - min)
    );
  }

  mapToCanvas = (canvas: HTMLCanvasElement): Point => {
    const OFFSET = 0.05 * canvas.width; // Add some "padding" around the triangle in the canvas.
    const x = this.x * (canvas.width - 2 * OFFSET) + OFFSET;
    const y = (canvas.height - 2 * OFFSET) * (1 - this.y) + OFFSET;
    return new Point(x, y);
  };
}

export type Triangle = [Point, Point, Point];

export function drawTriangle(
  canvas: HTMLCanvasElement,
  a: Point,
  b: Point,
  c: Point
) {
  const getMinimumValue = (a: Point, b: Point, c: Point): number => {
    return Math.min(a.x, a.y, b.x, b.y, c.x, c.y);
  };

  const getMaximumValue = (a: Point, b: Point, c: Point): number => {
    return Math.max(a.x, a.y, b.x, b.y, c.x, c.y);
  };

  const min = getMinimumValue(a, b, c);
  const max = getMaximumValue(a, b, c);
  a = a.normalize(min, max).mapToCanvas(canvas);
  b = b.normalize(min, max).mapToCanvas(canvas);
  c = c.normalize(min, max).mapToCanvas(canvas);

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
