import mario from "../assets/mario.png";
import luigi from "../assets/luigi.png";
import wario from "../assets/wario.png";
import yoshi from "../assets/yoshi.png";
import SecondHead from "./SecondHead";

export class FirstHead extends SecondHead {
  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, chosenHead: number) {
    super(ctx, canvas, chosenHead);
  }

  protected initImage(): void {
    let images = [mario, luigi, wario, yoshi];
    this.image.src = images[this.chosenHead];
  }
}
