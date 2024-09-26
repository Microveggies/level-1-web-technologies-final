let soundOn = localStorage.getItem("soundEnabled");
let bgsound = document.getElementById("bgsound");

function getStoredScoreAndEnemiesShot() {
    const storedScore = localStorage.getItem('score');
    const storedEnemiesShot = localStorage.getItem('enemiesShot');
    const storedfriendsShot = localStorage.getItem('friendsShot');
    const storedShot = localStorage.getItem('shots');
    const scorelbl = document.getElementById("score");
    scorelbl.textContent = `Final Score: ${storedScore}`;
    const enemylbl = document.getElementById("enemiesShot");
    enemylbl.textContent = `Enemies Shot: ${storedEnemiesShot}`;
    const friendlbl = document.getElementById("friendsShot");
    friendlbl.textContent = `Friendly's Shot: ${storedfriendsShot}`;
    const shotslbl = document.getElementById("Shot");
    shotslbl.textContent = `Shots Fired: ${storedShot}`;
    return { score: storedScore};
}

function updateHighScoreList(highScores) {
    const highScoreList = document.getElementById('highScoreList');
    highScoreList.innerHTML = '';
    highScores.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.initials}: Score - ${entry.score}pts`;
        highScoreList.appendChild(listItem);
    });
}
function qualifiesForHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    return highScores.length < 5 || score > highScores[4].score;
}

function recordHighScore(score) {
    if (qualifiesForHighScore(score)) {
        const initialsInput = document.getElementById('initialsInput');
        const initials = initialsInput.value.trim().toUpperCase();

        if (initials.length === 3) {
            const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            highScores.push({ initials: initials, score: parseInt(score)});
            highScores.sort((a, b) => b.score - a.score); 
            const updatedHighScores = highScores.slice(0, 5); 
            localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
            updateHighScoreList(updatedHighScores);
            initialsInput.value = '';
        } else {
            alert("Please enter exactly 3 characters for your initials.");
        }
    }
}

window.addEventListener('load', function () {
    const { score} = getStoredScoreAndEnemiesShot();
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    updateHighScoreList(highScores);
    document.getElementById('submitButton').addEventListener('click', function() {
        recordHighScore(score);
    });
});

const run = function(){
    console.log(soundOn);
    if(soundOn === "false"){
        bgsound.pause();
    }else{
        bgsound.play();
    }
    window.requestAnimationFrame(run)
}
window.requestAnimationFrame(run)