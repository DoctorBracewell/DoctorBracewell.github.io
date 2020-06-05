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
    wrapper.setAttribute("class", "vertex-wrap vertex-box");
    wrapper.setAttribute("id", `vertex-${control}`)
    wrapper.innerHTML = `
<div class="delete">
    <a class="delete-button" id="delete-${control}" onclick="deleteVertex(${control})"><i class="fas fa-times"></i></a>
</div>

<div class="vertex-title">
    <p>Vertex ${control}</p>
</div>

<div class="cords">
    <label>X: 
        <input name="x${control}" class="x form-input" type="number" />
    </label>
    <label>Y: 
        <input name="y${control}" class="y form-input" type="number" />
    </label>
    <label>Z: 
        <input name="z${control}" class="z form-input" type="number" />
    </label>
</div>

<div class="yaw-pitch">
    <label>Yaw (side-to-side): 
        <input name="yaw${control}" class="yaw form-input" type="number" />
    </label>
    <label>Pitch (up-and-down): 
        <input name="pitch${control}" class="pitch form-input" type="number" />
    </label>
</div>

<div class="time-control">
    <label>Total Time (seconds):
        <input name="time${control}" class="total-time form-input" type="number" />
    </label>
</div>

<div class="vertex-snippet-wrap">
    <label>Script snippet (executed when the player reaches the vertex):
        <textarea name="snippet${control}" class="vertex-snippet form-input"></textarea>
    </label>
</div>`

    document.querySelector(".path-vertices").appendChild(wrapper)
    control++;
}

// Save form data
if (typeof(Storage) !== "undefined") {
    
    window.onbeforeunload = closingCode;

    function closingCode(){
        localStorage.setItem("vertices", control);

        for (let element of  document.querySelectorAll(".form-input")) {
            localStorage.setItem(element.name, element.value)
        }   
        return null;
    }

    window.onload = openingCode;

    function openingCode() {
        if (localStorage.getItem("vertices") === null) {
            localStorage.setItem("vertices", 1)
        }

        for (let i = 0; i < parseInt(localStorage.getItem("vertices")) - 1; i++) {
            newVertex()
        }

        Object.keys(localStorage).forEach(element => {
            if (element === "cookies" || element === "vertices") return;
            document.querySelector(`*[name="${element}"]`).value = localStorage[element];
        });
        return null;
    }

} else {}

function deleteAll() {
    let saved = {
        cookies: localStorage.getItem("cookies"),
        gamemode: localStorage.getItem("gamemode"),
        invisible: localStorage.getItem("invisible"),
        startSnippet: localStorage.getItem("startSnippet"),
        endSnippet: localStorage.getItem("endSnippet")
    },
    vertices = document.getElementsByClassName('vertex-box').length > 0 ? document.getElementsByClassName('vertex-box') : [];

    while (vertices[0]) {
        vertices[0].parentNode.removeChild(vertices[0])
    }

    localStorage.clear();
    for (let i in saved) {
        localStorage.setItem(i, saved[i])
    }

    control = 1;
}

function deleteVertex(number) {
    let vertex = document.querySelector(`#vertex-${number}`)
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
        (document.querySelector("#invisible").checked ? "player.setInvisible(true);\n" : ""), 
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
        x: first.querySelector(".x").value,
        y: first.querySelector(".y").value,
        z: first.querySelector(".z").value,
    }, {
        yaw: first.querySelector(".yaw").value,
        pitch: first.querySelector(".pitch").value
    }));

    document.querySelectorAll(".vertex-box").forEach(i => {
        vertexArray.push(new Vertex({
            x: i.querySelector(".x").value,
            y: i.querySelector(".y").value,
            z: i.querySelector(".z").value,
        }, {
            yaw: i.querySelector(".yaw").value,
            pitch: i.querySelector(".pitch").value
        },
            i.querySelector(".total-time").value,
            i.querySelector(".vertex-snippet").value
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
        x: 0 - (parseInt(vertexA.cords.x) - parseInt(vertexB.cords.x)),
        y: 0 - (parseInt(vertexA.cords.y) - parseInt(vertexB.cords.y)),
        z: 0 - (parseInt(vertexA.cords.z) - parseInt(vertexB.cords.z)),
        yaw: 0 - (parseInt(vertexA.view.yaw) - parseInt(vertexB.view.yaw)),
        pitch: 0 - (parseInt(vertexA.view.pitch) - parseInt(vertexB.view.pitch))
    },
    perBlock = objectMap(distance, (value) => {
        return (value / (parseInt(vertexB.time * 25)))
    }),
    tracker = {
        x: parseInt(vertexA.cords.x),
        y: parseInt(vertexA.cords.y),
        z: parseInt(vertexA.cords.z),
        yaw: parseInt(vertexA.view.yaw),
        pitch: parseInt(vertexA.view.pitch)
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