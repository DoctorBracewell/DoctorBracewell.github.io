function toWynnic(text) {
    return text
    .split("")
    .map(character => character.charCodeAt(0) == 32 ? " " : String.fromCharCode((parseInt(character.charCodeAt(0)) + 9275)))
    .join("")
}

document.querySelector("#inputText").addEventListener("keyup", () => {
    document.querySelector("#outputText").innerHTML = toWynnic(document.querySelector("#inputText").value)
})