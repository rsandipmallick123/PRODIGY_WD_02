document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');
    const resetButton = document.querySelector('.reset');
    const lapClearButton = document.querySelector('.lap-clear-button');
    const minElement = document.querySelector('.min');
    const secElement = document.querySelector('.sec');
    const msecElement = document.querySelector('.msec');
    const lapsContainer = document.querySelector('.laps');

    let interval;
    let running = false;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapClearButton.addEventListener('click', clearLaps);

    function startTimer() {
        if (!running) {
            running = true;
            interval = setInterval(updateTime, 10);
        }
    }

    function stopTimer() {
        if (running) {
            running = false;
            clearInterval(interval);
        }
    }

    function resetTimer() {
        stopTimer();
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
    }

    function updateTime() {
        milliseconds += 1;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds += 1;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }
        updateDisplay();
    }

    function updateDisplay() {
        minElement.textContent = pad(minutes) + ':';
        secElement.textContent = pad(seconds) + ':';
        msecElement.textContent = pad(milliseconds);
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function recordLap() {
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        const lapNumber = lapsContainer.children.length + 1;
        lapItem.innerHTML = `<span class="number">#${lapNumber}</span>
                             <span class="time-stamp">${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}</span>`;
        lapsContainer.appendChild(lapItem);
        lapClearButton.classList.remove('hidden');
    }

    function clearLaps() {
        lapsContainer.innerHTML = '';
        lapClearButton.classList.add('hidden');
    }

    // Adding a lap button functionality (optional)
    const lapButton = document.createElement('button');
    lapButton.classList.add('button');
    lapButton.textContent = 'Lap';
    lapButton.addEventListener('click', recordLap);
    document.querySelector('.button-wrapper').appendChild(lapButton);
});
