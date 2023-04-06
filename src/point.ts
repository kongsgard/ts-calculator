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
