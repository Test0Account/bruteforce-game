const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
let memory = [];
let tickRate = 5;
let score = parseInt(localStorage.getItem("score")) || 0;

document.getElementById("score").textContent = score;

let targetWord = "";
let botStart, playerStart;

function startBot() {
  targetWord = document.getElementById("wordInput").value;
  if (!targetWord) return alert("Enter a word!");

  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  memory = [];

  let result = "";
  let i = 0;
  const botResultEl = document.getElementById("botResult");
  botStart = Date.now();

  const interval = setInterval(() => {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (letter === targetWord[i]) {
      result += letter;
      i++;
    }

    botResultEl.textContent = result;

    if (result === targetWord) {
      clearInterval(interval);
      const totalTime = ((Date.now() - botStart) / 1000).toFixed(2);
      document.getElementById("botTime").textContent = totalTime;
      setTimeout(startPlayer, 1000);
    }
  }, tickRate);
}

function startPlayer() {
  document.getElementById("gameArea").style.display = "none";
  document.getElementById("playerTurn").style.display = "block";
  const input = document.getElementById("playerInput");
  input.value = "";
  input.focus();
  playerStart = Date.now();

  input.addEventListener("keydown", function onKey(e) {
    if (e.key === "Enter") {
      input.removeEventListener("keydown", onKey);
      submitPlayer();
    }
  });
}

function submitPlayer() {
  const userTyped = document.getElementById("playerInput").value;
  const time = ((Date.now() - playerStart) / 1000).toFixed(2);
  document.getElementById("playerTime").textContent = time;

  const botTime = parseFloat(document.getElementById("botTime").textContent);
  document.getElementById("playerTurn").style.display = "none";
  document.getElementById("resultArea").style.display = "block";

  if (userTyped === targetWord && parseFloat(time) < botTime) {
    score++;
    localStorage.setItem("score", score);
    document.getElementById("resultMsg").textContent = "🔥 You win! +1 point!";
  } else {
    document.getElementById("resultMsg").textContent = "💀 You lose! Try again!";
  }

  document.getElementById("score").textContent = score;
}

function resetGame() {
  document.getElementById("resultArea").style.display = "none";
  document.getElementById("mainMenu").style.display = "block";
}
