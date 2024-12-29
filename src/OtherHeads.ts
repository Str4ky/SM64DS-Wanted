import mario from "../assets/mario.png";
import luigi from "../assets/luigi.png";
import wario from "../assets/wario.png";
import yoshi from "../assets/yoshi.png";

export default class OtherHeads {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private size: number;

  protected chosenHead: number;

  private x: number;
  private y: number;
  private directionX: number;
  private directionY: number;
  protected speed: number;
  
  protected image: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, chosenHead: number) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.size = 40;
    this.chosenHead = chosenHead;
    this.x = Math.random() * (this.canvas.width - this.size);
    this.y = Math.random() * (this.canvas.height - this.size);
    this.directionX = this.initRandomDirection();
    this.directionY = this.initRandomDirection();
    this.speed = 3;
    this.image = new Image();
    this.initImage();
  }

  private initRandomDirection(): number {
    const positive = Math.random() * (1 - 0.1) + 0.1;
    const negative = Math.random() * (-0.1 + 1) - 1;
    return Math.random() < 0.5 ? positive : negative;
  }

  protected initImage(): void {
    const images = [mario, luigi, wario, yoshi];
    images.splice(this.chosenHead, 1);
    this.image.src = images[Math.floor(Math.random() * images.length)];
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  getSize(): number {
    return this.size;
  }

  drawImage(): void {
    this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  update(): void {
    this.x += this.directionX / this.speed;
    this.y += this.directionY / this.speed;

    if (this.x > this.canvas.width) {
      this.x = -this.size;
    } else if (this.x + this.size < 0) {
      this.x = this.canvas.width;
    }

    if (this.y > this.canvas.height) {
      this.y = -this.size;
    } else if (this.y + this.size < 0) {
      this.y = this.canvas.height;
    }
  }
}
