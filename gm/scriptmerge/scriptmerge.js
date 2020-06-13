const scriptOne = CodeMirror.fromTextArea(document.querySelector("#scriptOne"), {theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
scriptTwo = CodeMirror.fromTextArea(document.querySelector("#scriptTwo"), {theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
scriptOut = CodeMirror.fromTextArea(document.querySelector("#scriptOut"), {theme: "lesser-dark", lineNumbers: true, lineWrapping: true});

function generateTimestamps(script) {
    let time = 0, finished = []

    for (let line of script.split("\n")) {
        if (/script\.wait\((\d+)\);/.test(line)) {
            time += parseInt(/\d+/.exec(line)[0]);
            continue;
        }
        finished.push({
            value: line,
            time: time
        });
        console.log(finished)
    }

    return finished;
}

function merge(one, two) {
    let sorted = [...one, ...two].sort((a, b) => a.time - b.time),
    output = sorted.reduce((a, b) => {
        if (a.find(i => i.time === b.time)) {
          a.find(i => i.time === b.time).lines.push(...b.lines)
        } else {
          a.push(b);
        }
        return a;
    },[]),
    finished = [],
    tracker = output.length > 1 ? output[1].time : 0;

    for (let i = 0; i < output.length; i++) {
        if (output[i].time !== 0) finished.push(`script.wait(${tracker});`);
        finished.push(...output[i].lines);
        tracker = (i === output.length - 1 ? 0 : (output[i + 1].time - output[i].time));
    }

    finished.shift();
    console.log(finished)
    return finished;
}

function mergeArray(array) {
    let finished = [], finishedIndex = 0;
    finished.push({
        lines: [array[0].value], 
        time: array[0].time
    })

    for (let i = 1; i < array.length; i++) {
        if (array[i].time == array[i - 1].time) {
            finished[finishedIndex].lines.push(array[i].value);
        } else {
            finished.push({
                lines: [array[i].value],
                time: array[i].time
            })
            finishedIndex++;
        }
    }

    return finished;
}

function generateMerged() {
    let firstScript = scriptOne.getValue(), secondScript = scriptTwo.getValue();
    let first = generateTimestamps(firstScript), second = generateTimestamps(secondScript);

    let merged = merge(mergeArray(first), mergeArray(second));

    scriptOut.getDoc().setValue(merged.join("\n"));
}

document.querySelector("#generateButton").addEventListener("click", () => {
    generateMerged()
});