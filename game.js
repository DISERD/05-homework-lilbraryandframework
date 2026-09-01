const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z'];
let currentKeyIndex = 0;

const keyElement = document.getElementById('key');
const newGameBtn = document.getElementById('new-game-btn');


function updateKeyDisplay() {
  if (currentKeyIndex < keys.length) {
    keyElement.textContent = keys[currentKeyIndex].toUpperCase();
  } else {
    keyElement.textContent = "Перемога!";
    if (typeof PNotify !== 'undefined') {
      PNotify.success({ text: "Вітаємо! Ви пройшли всі клавіші!" });
    }
  }
}

window.addEventListener('keydown', (event) => {
  if (currentKeyIndex >= keys.length) return;

  const pressedKey = event.key.toLowerCase();
  const targetKey = keys[currentKeyIndex];

  if (pressedKey === targetKey) {
    currentKeyIndex += 1;
    if (typeof PNotify !== 'undefined') {
      PNotify.success({ text: `Правильно! Клавіша "${targetKey.toUpperCase()}" натиснута.` });
    }
    updateKeyDisplay();
  } else {
    if (typeof PNotify !== 'undefined') {
      PNotify.error({ text: `Помилка! Ви натиснули "${event.key}", а потрібно "${targetKey.toUpperCase()}".` });
    }
  }
});

window.addEventListener('keypress', (event) => {
  event.preventDefault();
});

newGameBtn.addEventListener('click', (e) => {
  e.target.blur(); 
  window.focus();

  currentKeyIndex = Math.floor(Math.random() * keys.length);
  updateKeyDisplay();
  if (typeof PNotify !== 'undefined') {
    PNotify.info({ text: 'Гру перезапущено з новою клавішею!' });
  }
});

updateKeyDisplay();