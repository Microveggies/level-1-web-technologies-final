const gamespace = document.getElementById("engine");
const gameUI = document.getElementById("UI");
const bulletimg = document.getElementById("bulletsimg");
const UIscore = document.getElementsByClassName("score")[0];
const UItime = document.getElementsByClassName("timer")[0];
const clickSound = document.getElementById("clickSound");

let frames = 0;
let frames2 = 0;
let frames3 = 0;
let frames4 = 0;
let score = parseInt(localStorage.getItem("score"));
let enemiesShot = parseInt(localStorage.getItem(`enemiesShot`));
let shots = parseInt(localStorage.getItem(`shots`));
let friendsShot = parseInt(localStorage.getItem(`friendsShot`));
let bullets = 5;
let seconds = 60;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const bgsoundstatus = localStorage.getItem("soundEnabled");

window.addEventListener("load", function (e) {
    const bgsound = document.getElementById("bgsound")
    bgsound.currentTime = 35;
    if (bgsoundstatus == "false") {
        bgsound.pause();
    } else {
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
    frames2++;
    frames3++;
    frames4++;
    if (frames > 100) {
        let randomInt = Math.floor(Math.random() * 2) + 1;
        if (randomInt == 1) {
            eyeballright(Math.floor(Math.random() * (windowWidth * 0.8)));
        } else if (randomInt == 2) {
            eyeballleft(Math.floor(Math.random() * (windowHeight * 0.8)));
        }
        frames = 0;
    }
    if (frames2 > 150) {
        let randomInt = Math.floor(Math.random() * 2) + 1;
        if (randomInt == 1) {
            batRight(Math.floor(Math.random() * 2));
        } else if (randomInt == 2) {
            batLeft(Math.floor(Math.random() * 2));
        }
        frames2 = 0;
    }
    if (frames3 > 300) {
        let randomInt = Math.floor(Math.random() * 2) + 1;
        if (randomInt == 1) {
            eyeballfriendlyright();
        } else if (randomInt == 2) {
            eyeballfriendlyleft(Math.floor(Math.random() * (windowHeight * 0.8)));
        }
        frames3 = 0;
    }
    if (frames4 > 500) {
        let randomInt = Math.floor(Math.random() * 2) + 1;
        if (randomInt == 1) {
            tentright(Math.floor(Math.random() * (windowWidth * 0.5)));
        } else if (randomInt == 2) {
            tentleft(Math.floor(Math.random() * windowWidth));
        }
        frames4 = 0;
    }
    window.requestAnimationFrame(gamerun)
}
window.requestAnimationFrame(gamerun)

const endlevel = function () {
    localStorage.setItem(`enemiesShot`, enemiesShot);
    localStorage.setItem(`score`, score);
    localStorage.setItem(`shots`, shots);
    localStorage.setItem(`friendsShot`, friendsShot);
    localStorage.setItem(`soundEnabled`, bgsoundstatus);
    window.location.href = `endscreen.html`;
}

gamespace.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() !== 'img' || !event.target.classList.contains('eyeimg')) {
        if (bullets > 0) {
            bulletMiss();
        }
    }
});
gamespace.addEventListener('click', function (event) {
    if (event.target.classList.contains('eyeimg') || event.target.classList.contains('batImg')) {
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
        shots += 1;
        if (bgsoundstatus === "true") {
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
    const eyeimg = e.target;
    const target = e.target.parentNode;
    if (target.classList.contains('eyeball') && !target.hasAttribute('data-shot') && eyeimg.getAttribute("friendly") !== "true") {
        if (bullets > 0) {
            if (bgsoundstatus === "true") {
                clickSound.pause();
                clickSound.currentTime = 0;
                clickSound.play();
            }
            score += 100 * 3;
            enemiesShot += 1;
            bulletimg.src = `spritesWIP/bullet${bullets}.png`;
            target.setAttribute('data-shot', true);
            if (target.animationObject) {
                target.animationObject.pause();
            }
            setTimeout(() => {
                e.target.remove();
            }, 1500);
            if (target.id == "left") {
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
        }
    } else if (target.classList.contains('bat') && !target.hasAttribute('data-shot')) {
        if (target.classList.contains('bat') && !target.hasAttribute('data-shot')) {
            if (bullets > 0) {
                score += 200*2;
                enemiesShot +=1;
                bulletimg.src = `spritesWIP/bullet${bullets}.png`;
                target.setAttribute('data-shot', true);
                if (target.animationObject) {
                    target.animationObject.pause();
                }
                setTimeout(() => {
                    let currentTransform = getComputedStyle(target).transform;

                    let keyframes = [
                        { transform: currentTransform + 'translateY(300vw)' }
                    ];
                    let animBat = target.animate(keyframes, {
                        duration: 2000, 
                        easing: "linear", 
                        fill: "forwards" 
                    });
                    target.animationObject = animBat;
                    animBat.onfinish = (function () {
                        bat.remove();
                    });
                }, 1100);
                const batImg = e.target;
                if (target.id == "left") {
                    const tempImg = new Image();
                    tempImg.onload = function () {
                        batImg.src = this.src;
                    };
                    tempImg.src = `spritesWIP/batSpriteDeathLeft.gif`
                    setTimeout(() => {
                        tempImg.src = `spritesWIP/batSpriteDeathLeft.png`
                    },1000)
                } else {
                    const tempImg = new Image();
                    tempImg.onload = function () {
                        batImg.src = this.src;
                    };
                    tempImg.src = `spritesWIP/batSpriteDeath.gif`
                    setTimeout(() => {
                        tempImg.src = `spritesWIP/batSpriteDeath.png`
                    },1000)
                }
            } else {
                bulletMiss();
            }
    } 
    } else if (target.classList.contains('eyeball') && eyeimg.hasAttribute("friendly")) {
        if (bullets > 0) {
            friendsShot += 1;
            score -= 500 * 3;
            bulletimg.src = `spritesWIP/bullet${bullets}.png`;
            target.setAttribute('data-shot', true);
            if (target.animationObject) {
                target.animationObject.pause();
            }
            setTimeout(() => {
                eyeimg.remove();
            }, 1500);
            if (target.id == "left") {
                const tempImg = new Image();
                tempImg.onload = function () {
                    eyeimg.src = this.src;
                };
                tempImg.src = `spritesWIP/EyeDeathFriendlyLeft.gif`;
            } else {
                const tempImg = new Image();
                tempImg.onload = function () {
                    eyeimg.src = this.src;
                };
                tempImg.src = `spritesWIP/EyeDeathFriendlyRight.gif`;
            }
        }
    } else if (target.classList.contains('tentacle') && !target.hasAttribute('data-shot')) {
        if (target.classList.contains('tentacle') && !target.hasAttribute('data-shot')) {
            if (bullets > 0) {
                score += 500 * 3;
                enemiesShot += 1;
                bulletimg.src = `spritesWIP/bullet${bullets}.png`;
                target.setAttribute('data-shot', true);
                if (target.animationObject) {
                    target.animationObject.pause();
                }
                setTimeout(() => {
                    e.target.remove();
                }, 2000);
                const tentImg = e.target;
                if (target.id == "left") {
                    const tempImg = new Image();
                    tempImg.onload = function () {
        
                        tentImg.src = this.src;
                    };
                    tempImg.src = `spriteWIP/tentdeathleft.gif`;
                } else {
                    const tempImg = new Image();
                    tempImg.onload = function () {
                        
                        tentImg.src = this.src;
                    };
                    tempImg.src = `spritesWIP/tentdeath.gif`;
                }
            }
        }
    } else {
        bulletMiss();
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
            duration: 1500,
            easing: "linear",
            fill: "forwards"
        }
    )
    eyeball.animationObject = animEye;
    animEye.onfinish = (function () {
        eyeball.remove();
    });
}

const batRight = function (posY) {
    let initYPos = 0;
    let yChange = 0;
    if (posY == 1) {
        initYPos = windowHeight * 0.3
    }
    else {
        initYPos = windowHeight * 0.6
    }
    yChange = initYPos + 10;

    const bat = document.createElement("div");
    const batImg = document.createElement("img");

    bat.setAttribute("initY", initYPos);
    bat.setAttribute("yChange", yChange);
    batImg.setAttribute("src", "spritesWIP/batSprite.gif");
    batImg.setAttribute("height", "200px");
    batImg.setAttribute("width", "200px");
    batImg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    batImg.addEventListener("click", shootHit);
    bat.appendChild(batImg);
    bat.setAttribute("class", "bat");
    bat.setAttribute("id", "right");
    bat.style.top = `${posY}px`;
    gamespace.appendChild(bat);

    let keyframes = [
        { transform: 'translateX(0vw)' },
        { transform: `translate(25vw, ${initYPos + 100}px)` },
        { transform: `translate(50vw, ${initYPos - 100}px)` },
        { transform: `translate(75vw, ${initYPos + 200}px)` },
        { transform: `translate(100vw, ${initYPos - 100}px)` },
        { transform: 'translate(125vw, 0px)' }
    ];

    let animBat = bat.animate(keyframes, {
        duration: 3000,
        easing: "linear",
        fill: "forwards"
    });
    bat.animationObject = animBat;
    animBat.onfinish = (function () {
        bat.remove();
    });
}

const batLeft = function (posY) {
    let initYPos = 0;
    let yChange = 0;
    if (posY == 1) {
        initYPos = windowHeight * 0.2;
        console.log(initYPos);
    }
    else {
        initYPos = windowHeight * 0.4;
        console.log(initYPos);
    }
    yChange = initYPos + 10;

    const bat = document.createElement("div");
    const batImg = document.createElement("img");

    batImg.setAttribute("initY", initYPos)
    batImg.setAttribute("src", "spritesWIP/batSpriteLeft.gif");
    batImg.setAttribute("height", "200px");
    batImg.setAttribute("width", "200px");
    batImg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    batImg.addEventListener("click", shootHit);
    bat.appendChild(batImg);
    bat.setAttribute("class", "bat");
    bat.setAttribute("id", "left");
    bat.style.top = `${initYPos}px`;
    gamespace.appendChild(bat);

    let keyframes = [
        { transform: 'translateX(125vw)' },
        { transform: `translate(100vw, ${initYPos + 100}px)` },
        { transform: `translate(75vw, ${initYPos - 100}px)` },
        { transform: `translate(50vw, ${initYPos + 100}px)` },
        { transform: `translate(25vw, ${initYPos - 100}px)` },
        { transform: 'translate(0vw, 0px)' }
    ];

    let animBat = bat.animate(keyframes, {
        duration: 3000,
        easing: "linear",
        fill: "forwards"
    });
    bat.animationObject = animBat;
    animBat.onfinish = (function () {
        bat.remove();
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
            duration: 1500,
            easing: "linear",
            fill: "forwards"
        }
    )
    eyeball.animationObject = animEye;
    animEye.onfinish = (function () {
        eyeball.remove();
    });
}

const eyeballfriendlyleft = function (posY) {
    const eyeball = document.createElement("div");
    const eyeimg = document.createElement("img");
    eyeimg.setAttribute("src", "spritesWIP/EyeFriendlyLeft.gif");
    eyeimg.setAttribute("height", "200px");
    eyeimg.setAttribute("width", "200px");
    eyeimg.setAttribute("friendly", true);
    eyeimg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    eyeimg.addEventListener("click", shootHit);
    console.log(eyeimg);
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
            duration: 1500,
            easing: "linear",
            fill: "forwards"
        }
    )
    eyeball.animationObject = animEye;
    animEye.onfinish = (function () {
        eyeball.remove();
    });
}

const eyeballfriendlyright = function (posY) {
    const eyeball = document.createElement("div");
    const eyeimg = document.createElement("img");
    eyeimg.setAttribute("src", "spritesWIP/EyeFriendly.gif");
    eyeimg.setAttribute("height", "200px");
    eyeimg.setAttribute("width", "200px");
    eyeimg.setAttribute("friendly", true);
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
            { transform: `translateX(110vw)` }
        ],
        {
            duration: 1500,
            easing: "linear",
            fill: "forwards"
        }
    )
    eyeball.animationObject = animEye;
    animEye.onfinish = (function () {
        eyeball.remove();
    });
}

const tentright = function (posx) {
    const tentacle = document.createElement("div");
    const tentimg = document.createElement("img");
    tentimg.setAttribute("src", "spritesWIP/tentacleright.gif");
    tentimg.setAttribute("height", "400px");
    tentimg.setAttribute("width", "128px");
    tentimg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    tentimg.addEventListener("click", shootHit);
    tentacle.appendChild(tentimg);
    tentacle.setAttribute("class", "tentacle");
    tentacle.setAttribute("id", "right");
    tentacle.style.left = `${posx}px`;
    gamespace.appendChild(tentacle);

    const animTent = tentacle.animate(
        [
            { transform: `translateY(300vw)` },
            { transform: `translateY(17vw)` },
            { transform: `translate(100vw,17vw)` }
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards"
        }
    );
    tentacle.animationObject = animTent;
    animTent.onfinish = (function () {
        tentacle.remove();
    });
}

const tentleft = function (posx) {
    const tentacle = document.createElement("div");
    const tentimg = document.createElement("img");
    tentimg.setAttribute("src", "spritesWIP/tentacleleft.gif");
    tentimg.setAttribute("height", "400px");
    tentimg.setAttribute("width", "128px");
    tentimg.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });
    tentimg.addEventListener("click", shootHit);
    tentacle.appendChild(tentimg);
    tentacle.setAttribute("class", "tentacle");
    tentacle.setAttribute("id", "right");
    tentacle.style.left = `${posx}px`;
    gamespace.appendChild(tentacle);

    const animTent = tentacle.animate(
        [
            { transform: `translateY(300vw)` },
            { transform: `translateY(17vw)` },
            { transform: `translate(-100vw,17vw)` }
        ],
        {
            duration: 2000,
            easing: "linear",
            fill: "forwards"
        }
    );
    tentacle.animationObject = animTent;
    animTent.onfinish = (function () {
        tentacle.remove();
    });
}