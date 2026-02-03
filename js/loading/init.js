setTimeout(() => {
    fileLoads.isInitJS = true; //for file handling in fileTester.js
}, 10);

const tryRunning = {
    start() {
        try {
            simulation.startGame()
        } catch (error) {
            let text = `Uncaught ${error.name} in startGame(): `;
            text += error.message;
            text += "\nReload the page to try again.";
            document.body.style.backgroundColor = "white";
            favIcon.href = 'img/Error.png';
            document.title = "n-mod: UNCAUGHT ERROR";
            //document.body.innerHTML = text;
            startBtn.style.cursor = "not-allowed"
            console.error(error)
            window.alert(text)
        }
    },
    training() {
        try {
            simulation.startGame(false, true)
        } catch (error) {
            let text = `Uncaught ${error.name} in startTraining(): `;
            text += error.message;
            text += "\nReload the page to try again.";
            document.body.style.backgroundColor = "white";
            favIcon.href = 'img/Error.png';
            document.title = "n-mod: UNCAUGHT ERROR";
            //document.body.innerHTML = text;
            trainBtn.style.cursor = "not-allowed"
            console.error(error)
            window.alert(text)
        }
    },
    experiment() {
        try {
            build.openExperimentMenu()
        } catch (error) {
            let text = `Uncaught ${error.name} in openExperimentMenu(): `;
            text += error.message;
            text += "\nReload the page to try again.";
            document.body.style.backgroundColor = "white";
            favIcon.href = 'img/Error.png';
            document.title = "n-mod: UNCAUGHT ERROR";
            //document.body.innerHTML = text;
            experimentBtn.style.cursor = "not-allowed"
            console.error(error)
            window.alert(text)
        }
    }
}

document.getElementById('save-file').addEventListener('mousedown', function () {
    const jsonString = JSON.stringify(localSettings, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'localSettings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
});

document.getElementById('load-file').addEventListener('mousedown', function () {
    document.getElementById('file-import').click();
});

async function fetchTodoText() {
    try {
        const res = await fetch('todo.txt', { cache: 'no-cache', credentials: 'same-origin' });
        if (!res.ok) {
            throw new Error(' HTTP error! status: ' + res.status);
        } else {
            const todoText = await res.text();
            document.getElementById('todo-iframe').innerHTML = `<pre style="font-size: 70%;width: 792px;height:256px;overflow: auto;">${todoText}</pre>`;
        }
    } catch (err) {
        console.warn('Err loading todo.txt:', err);
        document.getElementById('todo-iframe').innerHTML = `<iframe id="todo-file" style="font-size: 70%;width: 792px;height:256px;overflow: hidden;"
                            src="todo.txt"></iframe>`;
    }
}