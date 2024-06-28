let min = 0, sec = 0, msec = 0;
let interval;
let laps = [];

const minSpan = document.querySelector('.min');
const secSpan = document.querySelector('.sec');
const msecSpan = document.querySelector('.msec');
const lapList = document.getElementById('lap-list');

document.getElementById('reset').addEventListener('click', reset);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('restart').addEventListener('click', restart);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('clear-laps').addEventListener('click', clearLaps);

function start() {
    stop(); // Stop any existing interval
    interval = setInterval(run, 10); // Run every 10ms
}

function run() {
    msec++;
    if (msec >= 100) {
        msec = 0;
        sec++;
    }
    if (sec >= 60) {
        sec = 0;
        min++;
    }
    displayTime();
}

function stop() {
    clearInterval(interval);
}

function reset() {
    stop();
    min = 0;
    sec = 0;
    msec = 0;
    displayTime();
    laps = [];
    displayLaps();
}

function restart() {
    reset();
    start();
}

function recordLap() {
    laps.push(formatTime(min, sec, msec));
    displayLaps();
}

function clearLaps() {
    laps = [];
    displayLaps();
}

function displayTime() {
    minSpan.textContent = formatNumber(min) + ":";
    secSpan.textContent = formatNumber(sec) + ":";
    msecSpan.textContent = formatNumber(msec);
}

function displayLaps() {
    lapList.innerHTML = laps.map((lap, index) => `
        <li class="lap-item">
            <span class="number">${formatNumber(index + 1)}</span>
            <span class="time-stamp">${lap}</span>
        </li>
    `).join('');
}

function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

function formatTime(min, sec, msec) {
    return `${formatNumber(min)}:${formatNumber(sec)}:${formatNumber(msec)}`;
}

start(); 
