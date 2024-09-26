const gamespace = document.getElementById("engine");
const gameUI = document.getElementById("UI");
const bulletimg = document.getElementById("bulletsimg");
const UIscore = document.getElementsByClassName("score")[0];
const UItime = document.getElementsByClassName("timer")[0];

let frames = 0;
let score = 0;
let enemiesShot = 0;
let shots = 0;
let bullets = 5;
let seconds = 60;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const clickSound = document.getElementById("clickSound");
const bgsoundstatus = localStorage.getItem("soundEnabled");

window.addEventListener("load", function(e){
    const bgsound = document.getElementById("bgsound")
    if(bgsoundstatus == "false"){
        bgsound.pause();
    }else{
        bgsound.play();
    }
});

window.addEventListener("keydown", function (e) {
    if (e.key === "r" || e.key === "R") {
        reloadBullets();
    }
});

const timer = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
        endlevel();
    }
}, 1000);

function scaleUI() {
    const uiElement = document.getElementById("UI");
    const scaledUIHeight = windowHeight * 0.2;
    uiElement.style.height = scaledUIHeight + "px";
}
scaleUI();
window.addEventListener("resize", scaleUI);

const gamerun = function () {
    UItime.textContent = `time: ${seconds}`;
    UIscore.textContent = `score: ${score}`;
    frames++;
    if (frames > 100) {
        let randomInt = Math.floor(Math.random() * 2) + 1;
        if (randomInt == 1) {
            eyeballright(Math.floor(Math.random() * (windowHeight * 0.8)));
        } else if (randomInt == 2) {
            eyeballleft(Math.floor(Math.random() * (windowHeight * 0.8)));
        }
        frames = 0;
    }
    window.requestAnimationFrame(gamerun)
}
window.requestAnimationFrame(gamerun)

const endlevel = function () {
    localStorage.setItem(`enemiesShot`,enemiesShot);
    localStorage.setItem(`score`, score);
    localStorage.setItem(`shots`,shots);
    localStorage.setItem(`soundEnabled`, bgsoundstatus);
    window.location.href = `level2.html`;
}

gamespace.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() !== 'img' || !event.target.classList.contains('eyeimg')) {
        if (bullets > 0) {
            bulletMiss();
        }
    }
});
gamespace.addEventListener('click', function (event) {
    if (event.target.classList.contains('eyeimg')) {
        if (bullets > 0) {
            shootHit(event.target);
        }
    }
});


function reloadBullets() {
    const tempImg = new Image();
    tempImg.onload = function () {
        bulletimg.src = this.src;
        setTimeout(() => {
            bullets = 5;
            bulletimg.src = 'spritesWIP/bullet5.png';
        }, 2100);
    };
    tempImg.src = `spritesWIP/reloading.gif`;
}

const bulletMiss = function () {
    if (bullets > 0) {
        shots +=1;
        if(bgsoundstatus === "true"){
            clickSound.pause();
            clickSound.currentTime = 0;
            clickSound.play();
        }
        bullets--;
        if (bullets === 0) {
            const tempImg = new Image();
            tempImg.onload = function () {
                bulletimg.src = this.src;
            };
            tempImg.src = `spritesWIP/OOA.gif`;
        } else {
            bulletimg.src = `spritesWIP/bullet${bullets}.png`;
        }
    }
}

const shootHit = function (e) {
    const eyeball = e.target.parentNode;
    if (eyeball.classList.contains('eyeball') && !eyeball.hasAttribute('data-shot')) {
        if (bullets > 0) {
            if(bgsoundstatus === "true"){
                clickSound.pause();
                clickSound.currentTime = 0;
                clickSound.play();
            }
            score += 100;
            enemiesShot +=1;
            bulletimg.src = `spritesWIP/bullet${bullets}.png`;
            eyeball.setAttribute('data-shot', true);
            if (eyeball.animationObject) {
                eyeball.animationObject.pause();
            }
            setTimeout(() => {
                e.target.remove();
            }, 1500);
            const eyeimg = e.target;
            if (eyeball.id == "left") {
                const tempImg = new Image();
                tempImg.onload = function () {
                    eyeimg.src = this.src;
                };
                tempImg.src = `spritesWIP/EyeDeathLeft.gif`;
            } else {
                const tempImg = new Image();
                tempImg.onload = function () {
                    eyeimg.src = this.src;
                };
                tempImg.src = `spritesWIP/EyeDeath.gif`;
            }
        } else {
            bulletMiss();
        }
    }
}

const eyeballright = function (posY) {
    const eyeball = document.createElement("div");
    const eyeimg = document.createElement("img");
    eyeimg.setAttribute("src", "spritesWIP/EyeFinal.gif");
    eyeimg.setAttribute("height", "200px");
    eyeimg.setAttribute("width", "200px");
    eyeimg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    eyeimg.addEventListener("click", shootHit);
    eyeball.appendChild(eyeimg);
    eyeball.setAttribute("class", "eyeball");
    eyeball.setAttribute("id", "right");
    eyeball.style.top = `${posY}px`;
    gamespace.appendChild(eyeball);
    const animEye = eyeball.animate(
        [
            { transform: `translateX(0vw)` },
            { transform: `translateX(100vw)` }
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards"
        }
    )
    eyeball.animationObject = animEye;
    animEye.onfinish = (function () {
        eyeball.remove();
    });
}

const eyeballleft = function (posY) {
    const eyeball = document.createElement("div");
    const eyeimg = document.createElement("img");
    eyeimg.setAttribute("src", "spritesWIP/EyeFinalLeft.gif");
    eyeimg.setAttribute("height", "200px");
    eyeimg.setAttribute("width", "200px");
    eyeimg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    eyeimg.addEventListener("click", shootHit);
    eyeball.appendChild(eyeimg);
    eyeball.setAttribute("class", "eyeball");
    eyeball.setAttribute("id", "left");
    eyeball.style.top = `${posY}px`;
    gamespace.appendChild(eyeball);
    const animEye = eyeball.animate(
        [
            { transform: `translateX(100vw)` },
            { transform: `translateX(0vw)` }
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards"
        }
    )
    eyeball.animationObject = animEye;
    animEye.onfinish = (function () {
        eyeball.remove();
    });
}