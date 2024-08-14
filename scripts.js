let count = 0;
let history = [count];
let historyIndex = 0;

const progressBar = document.getElementById('progress-bar');
const countInput = document.getElementById('count-input');

document.getElementById('subtract-btn').addEventListener('click', subtract);
document.getElementById('add-btn').addEventListener('click', add);
document.getElementById('undo-btn').addEventListener('click', undo);
document.getElementById('redo-btn').addEventListener('click', redo);

progressBar.addEventListener('click', (e) => {
  const width = progressBar.offsetWidth;
  const clickX = e.offsetX;
  const newCount = Math.round((clickX / width) * 150);
  count = newCount;
  history.push(count);
  historyIndex++;
  updateUI();
});

countInput.addEventListener('input', (e) => {
  const userInput = parseInt(e.target.value);
  count = Math.min(userInput, 150);
  history.push(count);
  historyIndex++;
  updateUI();
});

function subtract() {
  if (count > 0) {
    count--;
    history.push(count);
    historyIndex++;
    updateUI();
  }
}

function add() {
  if (count < 150) {
    count++;
    history.push(count);
    historyIndex++;
    updateUI();
  }
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    count = history[historyIndex];
    updateUI();
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    count = history[historyIndex];
    updateUI();
  }
}

function updateUI() {
  countInput.value = count;
  const progressBarFill = document.createElement('div');
  progressBarFill.className = 'progress-bar-fill';
  progressBarFill.style.width = (count / 150) * 100 + '%';
  progressBar.innerHTML = '';
  progressBar.appendChild(progressBarFill);
}
