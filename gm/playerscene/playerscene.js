// Cookies
if (localStorage.getItem('cookies') === null) {
    document.querySelector("#cookies-popup").style.display = "flex";
}
document.querySelector(".cookies-accept").addEventListener("click", () => {
    localStorage.setItem("cookies", true);
    document.querySelector("#cookies-popup").style.display = "none";
})


// Output editor
const outputEditor = CodeMirror.fromTextArea(document.querySelector("#scriptOutput"), {theme: "lesser-dark", lineNumbers: true, lineWrapping: true});

// Add new vertex
let control = 1;
function newVertex() {
    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "vertex-wrap");
    wrapper.setAttribute("id", `vertex-${control}`)
    wrapper.innerHTML = `
<div class="container-fluid border border-1 p-3 m-3 vertex-box" id="vertex-${control}">
    <div class="container-fluid p-0 mb-3 d-flex flex-row justify-content-between">
        <h4 class="d-inline m-0">Vertex ${control}</h4>
        <button class="btn btn-danger delete-button" id="delete${control}" onclick="deleteVertex(${control})"><i class="fas fa-times"></i></button>                   
    </div>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Cords:</span>
        </div>
        <input class="form-control bg-light cords" type="text" id="cords${control}" placeholder="X Y Z"/>
    </div>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Yaw & Pitch:</span>
        </div>
        <input class="form-control bg-light yawpitch" type="text" id="yawpitch${control}" placeholder="YAW PITCH"/>
    </div>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Time Taken (seconds):</span>
        </div>
        <input class="form-control bg-light time" type="text" id="time${control}" placeholder="Time between previous vertex and this one."/>
    </div>

    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">Script Snippet:</span>
        </div>
        <textarea class="form-control bg-light snippet" type="text" id="snippet${control}" placeholder="Executed when the player reaches the vertex."></textarea>
    </div>
</div>`

    document.querySelector(".path-vertices").appendChild(wrapper)
    control++;
}

// Save form data
if (typeof(Storage) !== "undefined") {
    
    window.onbeforeunload = closingCode;

    function closingCode(){
        localStorage.setItem("PS-vertices", control);

        for (let element of document.querySelectorAll("input.form-control, textarea.form-control")) {
            if (element.id === "invisibleFalse") continue;
            if (element.id === "invisibleTrue") {
                localStorage.setItem("PS-invisible", element.checked)
            }
            localStorage.setItem(`PS-${element.id}`, element.value)
        }   
        return null;
    }

    window.onload = openingCode;

    function openingCode() {
        if (localStorage.getItem("gamemode")) localStorage.clear()

        if (localStorage.getItem("PS-vertices") === null) {
            localStorage.setItem("PS-vertices", 1)
        }

        for (let i = 0; i < parseInt(localStorage.getItem("PS-vertices")) - 1; i++) {
            newVertex()
        }

        Object.keys(localStorage).forEach(element => {
            if (element === "PS-vertices") return;
            if (element === "PS-invisible") {
                if (localStorage.getItem(element) === "true") {
                    document.querySelector("#invisibleTrue").checked = true;
                    document.querySelector("#invisibleFalse").checked = false;
                } else {
                    document.querySelector("#invisibleFalse").checked = true;
                    document.querySelector("#invisibleTrue").checked = false;
                }
                return;
            }
            if (element.includes("PS-")) {
                document.querySelector(`#${element.replace("PS-", "")}`).value = localStorage.getItem(element)
            }
        });
        return null;
    }

} else {}

function deleteAll() {
    let saved = [
        "PS-gamemode",
        "PS-invisible",
        "PS-startSnippet",
        "PS-endSnippet"
    ],
    vertices = document.getElementsByClassName('vertex-box').length > 0 ? document.getElementsByClassName('vertex-box') : [];

    while (vertices[0]) {
        vertices[0].parentNode.removeChild(vertices[0])
    }

    for (let element in localStorage) {
        if (!element.includes("PS-")) continue;
        if (saved.includes(element)) continue;
        localStorage.removeItem(element)
    }

    control = 1;
}

function deleteVertex(number) {
    let vertex = document.querySelector(`#vertex${number}`)
    vertex.parentNode.removeChild(vertex);
    control--;
}

// \/ Generate script \/
class Vertex {
    constructor({x, y, z}, {yaw, pitch}, time, code) {
        this.cords = {};
        this.cords.x = x;
        this.cords.y = y;
        this.cords.z = z;

        this.view = {};
        this.view.yaw = yaw;
        this.view.pitch = pitch;

        this.time = time;
        this.code = code;
    }
}
function envelopeFunctions(code) {
    let starters = [
        `player.setGamemode(${document.querySelector("#gamemode").value});\n`, 
        (document.querySelector("#invisibleTrue").checked ? "player.setInvisible(true);\n" : ""), 
        (document.querySelector("#startSnippet").value ? `${document.querySelector("#startSnippet").value}\n` : "\n")
    ];

    let enders = [
        `player.setGamemode(2);\n`, 
        `player.setInvisible(false);\n`,
        (document.querySelector("#endSnippet").value ? `${document.querySelector("#endSnippet").value}\n` : "")
    ];

    return `${starters.join("")}\n${code}\n${enders.join("")}`
}

function loopVertices() {
    let vertexArray = [], first = document.querySelector(".vertex-box-1");
    vertexArray.push(new Vertex({
        x: first.querySelector("#cords0").value.split(" ")[0],
        y: first.querySelector("#cords0").value.split(" ")[1],
        z: first.querySelector("#cords0").value.split(" ")[2]
    }, {
        yaw: first.querySelector("#yawpitch0").value.split(" ")[0],
        pitch: first.querySelector("#yawpitch0").value.split(" ")[1]
    }));

    document.querySelectorAll(".vertex-box").forEach(i => {
        vertexArray.push(new Vertex({
            x: i.querySelector(".cords").value.split(" ")[0],
            y: i.querySelector(".cords").value.split(" ")[1],
            z: i.querySelector(".cords").value.split(" ")[2]
        }, {
            yaw: i.querySelector(".yawpitch").value.split(" ")[0],
            pitch: i.querySelector(".yawpitch").value.split(" ")[1],
        },
            i.querySelector(".time").value,
            i.querySelector(".snippet").value
        ));
    });

    return vertexArray;
}

function generatePath(vertexA, vertexB) {
    
    function objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
          result[key] = mapFn(object[key])
          return result
        }, {})
      }

    let distance = {
        x: 0 - (parseFloat(vertexA.cords.x) - parseFloat(vertexB.cords.x)),
        y: 0 - (parseFloat(vertexA.cords.y) - parseFloat(vertexB.cords.y)),
        z: 0 - (parseFloat(vertexA.cords.z) - parseFloat(vertexB.cords.z)),
        yaw: 0 - (parseFloat(vertexA.view.yaw) - parseFloat(vertexB.view.yaw)),
        pitch: 0 - (parseFloat(vertexA.view.pitch) - parseFloat(vertexB.view.pitch))
    },
    perBlock = objectMap(distance, (value) => {
        return (value / (parseInt(vertexB.time * 25)))
    }),
    tracker = {
        x: parseFloat(vertexA.cords.x),
        y: parseFloat(vertexA.cords.y),
        z: parseFloat(vertexA.cords.z),
        yaw: parseFloat(vertexA.view.yaw),
        pitch: parseFloat(vertexA.view.pitch)
    },
    finishedCode = ""

    for (let i = 0; i <= (parseInt(vertexB.time) * 25); i++) {
        finishedCode += `player.execute("tp @s ${(tracker.x).toFixed(3)} ${(tracker.y).toFixed(3)} ${(tracker.z).toFixed(3)} ${(tracker.yaw).toFixed(1)} ${(tracker.pitch).toFixed(1)}");\nscript.wait(1);\n`

        tracker.x += perBlock.x;
        tracker.y += perBlock.y;
        tracker.z += perBlock.z;
        tracker.yaw += perBlock.yaw;
        tracker.pitch += perBlock.pitch;
    }

    return `${finishedCode}\n${vertexB.code}\n`
}

function generateCode() {
    let vertices = loopVertices();
    let code = []

    for (let i = 0; i < vertices.length - 1; i++) {
        code.push(generatePath(vertices[i], vertices[i + 1]))
    }

    outputEditor.getDoc().setValue(envelopeFunctions(code.join("\n")));
}