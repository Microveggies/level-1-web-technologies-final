let soundOn = true;
let bgsound = document.getElementById("bgsound");
const run = function () {
    if (soundOn === false) {
        bgsound.pause();
    } else {
        bgsound.play();
    }
    window.requestAnimationFrame(run)
}
window.requestAnimationFrame(run)

function sound() {
    let image = document.getElementById("volumeBut");
    if (image.src === 'http://127.0.0.1:5500/spritesWIP/volume.png') {
        localStorage.setItem(`soundEnabled`, false);
        soundOn = false;
        image.setAttribute("src", "spritesWIP/volumeOff.png");
    } else {
        localStorage.setItem(`soundEnabled`, true);
        soundOn = true;
        image.setAttribute("src", "spritesWIP/volume.png");
    }
}

function removeHTP() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
        overlay.remove();
    }

    const existingDivs = document.querySelectorAll("div");
    existingDivs.forEach(div => {
        div.style.filter = "";
        div.style.pointerEvents = "";
    });
}

function createHTP() {
    if (document.querySelector(".overlay")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const existingDivs = document.querySelectorAll("div");
    existingDivs.forEach(div => {
        div.style.filter = "blur(5px)";
        div.style.pointerEvents = "none";
    });

    const box = document.createElement("div");
    box.setAttribute("class", "overBox")
    box.classList.add("box");

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const exitDiv = document.createElement("div");
    exitDiv.style.position = "relative";

    const exitImg = document.createElement("img");
    exitImg.setAttribute("class", "button");
    exitImg.setAttribute("src", "spritesWIP/button.png");
    exitImg.setAttribute("onmouseover", "this.src='spritesWIP/buttonHover.png';");
    exitImg.setAttribute("onmouseout", "this.src='spritesWIP/button.png';");
    exitImg.setAttribute("onclick", "removeHTP()");

    const exitText = document.createElement("b");
    exitText.setAttribute("class", "overlayExitText");
    exitText.textContent = "Exit";

    const title = document.createElement("img")
    title.setAttribute("src", "spritesWIP/HTP.png")
    title.setAttribute("width", "1000vw")
    const tutText = document.createElement("div");
tutText.innerHTML = `
  <p class="HTP">Welcome, brave soul, to the unfathomable depths of the Eldritch Abyss.<br> Here, you will encounter creatures so bizarre and ancient, their mere presence distorts reality. Your mission is to vanquish these nightmares using only the power of your ancient relic blaster, while sparing the innocent beings who are lost in this terrifying realm. Prepare yourself for a challenge where your wits and reflexes will be tested against the clock. Can you survive and thrive amidst the chaos? Prove your mettle in this three-minute trial of terror and triumph!</p>
`;

const tutText2 = document.createElement("div");
tutText2.innerHTML = `
  <ul class="HTP">
    <li><u>Left click to Attack:</u></li>
    <ul>
      <li><u>Spot the Monsters:</u> Eldritch monsters will emerge from the void. They vary in shapes and sizes, pulsing with forbidden energies.</li>
      <li><u>Click to Attack:</u> Use your relic blaster on the monsters. The ancient runes will repel the beasts!</li>
    </ul>
    <li><u>Avoid Friendly Mobs:</u></li>
    <ul>
      <li><u>Identify Friendlies:</u> Amidst the chaos, you will see ethereal figures wandering. These are the Friendlies—lost souls who mean no harm.</li>
      <li><u>Spare Them:</u> Avoid targeting these beings. Shooting a Friendly will deduct points from your score. Their more human form will distinguish them from the abyssal monsters.</li>
    </ul>
  </ul>

  <p>Once you have worked up the courage for this brave journey <b>exit</b> this menu and click the <b>start</b> button!</p>
`;
box.appendChild(title);
box.appendChild(tutText);
box.appendChild(tutText2);
    exitDiv.appendChild(exitText);
    exitDiv.appendChild(exitImg);
    box.appendChild(exitDiv);
}

function removeBeastiary() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
        overlay.remove();
    }

    const existingDivs = document.querySelectorAll("div");
    existingDivs.forEach(div => {
        div.style.filter = "";
        div.style.pointerEvents = "";
    });
}

function createBeastiary() {
    if (document.querySelector(".overlay")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const existingDivs = document.querySelectorAll("div");
    existingDivs.forEach(div => {
        div.style.filter = "blur(5px)";
        div.style.pointerEvents = "none";
    });

    const box = document.createElement("div");
    box.setAttribute("class", "overBox")
    box.classList.add("box");

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const exitDiv = document.createElement("div");
    exitDiv.style.position = "relative";

    const exitImg = document.createElement("img");
    exitImg.setAttribute("class", "button");
    exitImg.setAttribute("src", "spritesWIP/button.png");
    exitImg.setAttribute("onmouseover", "this.src='spritesWIP/buttonHover.png';");
    exitImg.setAttribute("onmouseout", "this.src='spritesWIP/button.png';");
    exitImg.setAttribute("onclick", "removeBeastiary()");

    const exitText = document.createElement("b");
    exitText.setAttribute("class", "overlayExitText");
    exitText.textContent = "Exit";

    exitDiv.appendChild(exitText);
    exitDiv.appendChild(exitImg);

    const table = document.createElement("table");
    table.setAttribute("class", "beastiaryTable");
    const beastiaryImgs = ["spritesWIP/EyeFinal.gif", "spritesWIP/batSprite.gif", "spritesWIP/tentacleright.gif", "spritesWIP/EyeFriendly.gif"];
    const beastText1 = ["Gaze Wraith", "Grim Wing", "Dagon's Thumb", "The Living"];
    const beastText2 = ["100pts x level", "200pts x level", "300pts x level", "-500pts / -1000pts(level3)"];
    const beastText3 = ["Dagon's footsoldiers of the abyss, they carry only a fraction of his power.", "Dagon's messengers of despair, they are agile and fast.", "Dagon himself, appearing only on occasion- a mere twiddle of his thumbs will penetrtate the earth you walk on.", "As the madness creeps in, you may see your allies, friends, and family as projections of the abyss"];

    for (let i = 0; i < 4; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement("td");
            if (i === 0) {
                const img = document.createElement("img");
                img.setAttribute("src", `${beastiaryImgs[j]}`);
                cell.appendChild(img);
            } else if (i === 1) {
                const text = document.createTextNode(`${beastText1[j]}`);
                cell.appendChild(text);
            } else if (i === 2) {
                const text = document.createTextNode(`${beastText2[j]}`);
                cell.appendChild(text);
            } else if (i === 3) {
                const text = document.createTextNode(`${beastText3[j]}`);
                cell.appendChild(text);
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    const title = document.createElement("img");
    title.setAttribute("src", "spritesWIP/bestiary.png");
    box.appendChild(title);
    box.appendChild(table);
    box.appendChild(exitDiv);

}
