import { WantedHead } from "./WantedHead";
import OtherHeads from "./OtherHeads";
import marioWanted from "../assets/mario_wanted.png";
import luigiWanted from "../assets/luigi_wanted.png";
import warioWanted from "../assets/wario_wanted.png";
import yoshiWanted from "../assets/yoshi_wanted.png";
import "./style.css";

const button = document.getElementById("launchGame") as HTMLElement;

let score = 0;
let hasFoundHead = false;

let previousHead: number;

button.addEventListener("click", () => {
  const container = document.getElementById("container") as HTMLElement;
  container.innerHTML =
    `<img src="./assets/mario_wanted.png" width="400" id="poster"></img>
    <canvas id="game" width="400" height="400"></canvas>
    <p id="score">Score: 0</p>`;
  start();
});

function chooseHead(): number {
  let chosenHead: number;

  do {
      chosenHead = Math.floor(Math.random() * 4);
  } while (chosenHead === previousHead);
  previousHead = chosenHead;
  return chosenHead;
}

function start() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const audio = document.getElementById("audio") as HTMLAudioElement;

  const found = document.getElementById("found") as HTMLAudioElement;

  const poster = document.getElementById("poster") as HTMLImageElement;

  const chosenHead = chooseHead();

  audio.play();

  let head: OtherHeads[] = [];

  let faces = [marioWanted, luigiWanted, warioWanted, yoshiWanted];

  poster.src = faces[chosenHead];

  const wantedHead = new WantedHead(ctx, canvas, chosenHead);

  head.push(wantedHead);

  for (let i = 0; i < 150; i++) {
    head.push(new OtherHeads(ctx, canvas, chosenHead));
  }

  const moving = () => {
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!hasFoundHead) {
        head.forEach((h) => {
          h.update();
          h.drawImage();
        });
      } else {
        wantedHead.drawImage();
      }
    }

    window.requestAnimationFrame(moving);
  };

  moving();

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const scoreText = document.getElementById("score") as HTMLElement;
    const gameElement = document.getElementById('game');
    if(!gameElement) {
        return;
    }
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
          head = head.filter((item) => item instanceof WantedHead);
          hasFoundHead = true;
          found.play();
          setTimeout(() => {
            ctx.fillStyle = "#FFFF31";
            hasFoundHead = false;
            start();
          }, 1500);
          ctx.fillStyle = "#000000";
        }
      }
    });
  });
}
