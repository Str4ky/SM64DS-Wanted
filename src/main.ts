import { WantedHead } from "./WantedHead";
import OtherHeads from "./OtherHeads";
import marioWanted from "../assets/mario_wanted.png";
import luigiWanted from "../assets/luigi_wanted.png";
import warioWanted from "../assets/wario_wanted.png";
import yoshiWanted from "../assets/yoshi_wanted.png";
import "./style.css";

const button = document.getElementById("launchGame") as HTMLElement;

let score = 0;

button.addEventListener("click", () => {
  const container = document.getElementById("container") as HTMLElement;
  container.innerHTML =
    `<img src="./assets/mario_wanted.png" width="400" id="poster"></img>
    <canvas id="game" width="400" height="400"></canvas>
    <p id="score">Score: 0</p>`;
  start();
});

function start() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const audio = document.getElementById("audio") as HTMLAudioElement;

  const poster = document.getElementById("poster") as HTMLImageElement;

  const chosenHead = Math.floor(Math.random() * 4);

  audio.play();

  let head: OtherHeads[] = [];

  let faces = [marioWanted, luigiWanted, warioWanted, yoshiWanted];

  poster.src = faces[chosenHead];

  const wantedHead = new WantedHead(ctx, canvas, chosenHead);

  head.push(wantedHead);

  for (let i = 0; i < 100; i++) {
    head.push(new OtherHeads(ctx, canvas, chosenHead));
  }

  const moving = () => {
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      head.forEach((h) => {
        h.update();
        h.drawImage();
      });
    }

    window.requestAnimationFrame(moving);
  };

  moving();

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const scoreText = document.getElementById("score") as HTMLElement;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    head.forEach((h) => {
      const position = h.getPosition();
      if (
        x >= position.x &&
        x <= position.x + h.getSize() &&
        y >= position.y &&
        y <= position.y + h.getSize()
      ) {
        if (h instanceof WantedHead) {
          score++;
          scoreText.innerText = `Score: ${score}`;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          head = [];
          start();
        }
      }
    });
  });
}
