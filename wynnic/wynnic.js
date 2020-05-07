document.querySelector("#inputText").addEventListener("keyup", () => {
    document.querySelector("#outputText").innerHTML = document.querySelector("#inputText").value
    .split("")
    .map(character => 
        String.fromCharCode((parseInt(character.charCodeAt(0)) + 9275)))
    .join("")
})