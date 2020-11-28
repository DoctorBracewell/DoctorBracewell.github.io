function toGavellian(text) {
    return text
    .split("")
    .map(character => character.charCodeAt(0) == 32 ? " " : String.fromCharCode((parseInt(character.charCodeAt(0)) + 9327)))
    .join("")
}

document.querySelector("#inputText").addEventListener("keyup", () => {
    document.querySelector("#outputText").innerHTML = toGavellian(document.querySelector("#inputText").value)
})
