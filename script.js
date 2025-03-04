document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("countdown"); 
    const customTimeInput = document.getElementById("custom-time");
    const startButton = document.getElementById("start");
    const endButton = document.getElementById("end");
    const resetButton = document.getElementById("reset");
    const shortBreakButton = document.getElementById("shortBreak");
    const longBreakButton = document.getElementById("longBreak"); 

    let timer;
    let timeLeft = 1500; 
    let isRunning = false;

    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startTimer(duration) {
        if (isRunning) return;

        timeLeft = duration * 60;
        isRunning = true;
        updateDisplay();

        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                notifyUser("Time's up! Take a break.");
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimer() {
        stopTimer();
        timeLeft = customTimeInput.value ? customTimeInput.value * 60 : 1500;
        updateDisplay();
    }

    function notifyUser(message) {
        if (Notification.permission === "granted") {
            new Notification("Pomodoro Timer", { body: message });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Pomodoro Timer", { body: message });
                }
            });
        }
    }

    startButton.addEventListener("click", () => {
        let duration = customTimeInput.value || 25;
        startTimer(duration);
    });

    endButton.addEventListener("click", stopTimer);
    resetButton.addEventListener("click", resetTimer);
    shortBreakButton.addEventListener("click", () => startTimer(5));
    longBreakButton.addEventListener("click", () => startTimer(15));

    resetTimer();
});
