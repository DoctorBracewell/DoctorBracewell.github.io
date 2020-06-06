// Storage
if (typeof(Storage) !== "undefined") {
    
    window.onbeforeunload = closingCode;

    function closingCode(){
        for (let element of document.querySelectorAll(".form-input")) {
            localStorage.setItem(`CNT-${element.name}`, element.value)
        }   
        return null;
    }

    window.onload = openingCode;

    function openingCode() {
        if (localStorage.getItem("item-number")) localStorage.clear()
        Object.keys(localStorage).forEach(element => {
            if (element.includes("CNT-")) {
                document.querySelector(`*[id="${element.replace("CNT-", "")}"]`).value = localStorage[element];
            }
        });
        return null;
    }

} else {}

// Editors
const commandsOut = CodeMirror.fromTextArea(document.querySelector("#commandsOut"), {mode: "", theme: "lesser-dark", lineNumbers: true, lineWrapping: true});
const scriptsOut = CodeMirror.fromTextArea(document.querySelector("#scriptsOut"), {theme: "lesser-dark", lineNumbers: true, lineWrapping: true});


// Big boy function
function generateStuff() {



    async function generateCode() {
        let cmds = [], itemNum = document.querySelector("#item-number").value, x = document.querySelector("#stand").value.split(" ")[0], y = document.querySelector("#stand").value.split(" ")[1], z = document.querySelector("#stand").value.split(" ")[2], chest = document.querySelector("#chest").value.split(" ")

        if (parseInt(itemNum) > 1) {
            cmds.push("--- Counting CMDS ---\n")
            for (let i = 0; i <= parseInt(itemNum); i++) {
                cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=${i}${i !== parseInt(itemNum) ? `,score_thDungeonCounter=${i}` : ""}] {CustomName:"&a${i}&2/${itemNum}"}`)
            }
            cmds.push(`/execute @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=${itemNum}] ~ ~ ~ /fill x y z x y z redstone_block 0 replace gold_block 0`);
        } else {
            cmds.push("\n--- CMDS When Activated ---\n")
            cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] {CustomName:"&a1&2/1"}`)
        }

        cmds.push(`${parseInt(itemNum) > 1 ? `/execute @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=${itemNum}] ~ ~ ~ ` : ""}/setblock ${chest[0]} ${chest[1]} ${chest[2]} barrier`);
        
        
        if (parseInt(itemNum) > 1) {
            cmds.push("\n--- CMDS When Activated ---\n")
            cmds.push(`/fill ${parseInt(chest[0])+1} ${parseInt(chest[1])+1} ${parseInt(chest[2])} ${parseInt(chest[0])+6} ${parseInt(chest[1])+1} ${parseInt(chest[2])+1} diamond_block 0 replace gold_block 0`)
        } else {
            cmds.push("// \\/ Add small delay (1 repeater tick) before this command \\/")
        }

        cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z}] {CustomNameVisible:0b}`);

        cmds.push("\n--- Reset CMDS ---\n")
        if (parseInt(itemNum) > 1) {
            cmds.push(`/scoreboard players set @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] thDungeonCounter 0`);
            cmds.push(`/fill ${parseInt(chest[0])+1} ${parseInt(chest[1])+1} ${parseInt(chest[2])} ${parseInt(chest[0])+6} ${parseInt(chest[1])+1} ${parseInt(chest[2])+1} gold_block 0 replace diamond_block 0`)
        }

        cmds.push(`/setblock x y z gold_block`)
        cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z}] {CustomNameVisible:1b}`);
        cmds.push(`/clone ${chest[0]} ${parseInt(chest[1]) + 1} ${chest[2]} ${chest[0]} ${parseInt(chest[1]) + 1} ${chest[2]} ${chest[0]} ${chest[1]} ${chest[2]}`);
        cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] {CustomName:"&a0&2/${itemNum}"}`);

        commandsOut.getDoc().setValue(cmds.join("\n\n"));


        let scripts = ["--- onEnter ---\n"];

        scripts.push(`
    // Activated via Script Region (onEnter)
    // Script Region Armor Stand located @ 
    // Safe teleportation area located @ 

    var X = WYNNMOB;
    player.setData("at_test", true);

    X.setType("thom-invmob3x3");
    X.spawn(${parseInt(x) + 0.5}, ${parseInt(y) + 1}, ${parseInt(z) + 0.5});
    X.say("&0");
    X.setOnRightClickScript("${document.querySelector("#script-folder").value.slice(-1) === "/" ? document.querySelector("#script-folder").value : `${document.querySelector("#script-folder").value}/`}onRightClick");
    X.setOnlyVisibleToPlayer;
    X.setSpeed(0);
    X.setInvulnerable(true);

    while(player.getData("at_test", true)){ script.wait(50); }`
        );

        if (parseInt(itemNum) > 1) {
            scripts.push(`
    \n--- onRightClick ---\n
    // Activated via Script (onRightClick)
    // Script located @ ${document.querySelector("#script-folder").value.slice(-1) === "/" ? document.querySelector("#script-folder").value : `${document.querySelector("#script-folder").value}/`}onEnter

    // For multiple items
    if (player.getData("clickDoor", false)) {
        player.setData("clickDoor", true);
        player.execute("scoreboard players set @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=1] thDungeonCounter 0 {CustomName:"&a0&2/${itemNum}"}");
        player.execute("scoreboard players add @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] thDungeonCounter 0");
        while(player.takeItem(${chest[0]}, ${chest[1]}, ${chest[2]})){
            player.execute("scoreboard players add @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] thDungeonCounter 1");
            world.activateCommandBlock(${parseInt(chest[0]) + 1}, ${chest[1]}, ${chest[2]});
        }
        player.setData("clickDoor", false);
    }
        `)
        } else {
            scripts.push(`
    \n--- onRightClick ---\n
    // Activated via Script (onRightClick)
    // Script located @ ${document.querySelector("#script-folder").value.slice(-1) === "/" ? document.querySelector("#script-folder").value : `${document.querySelector("#script-folder").value}/`}onEnter

    if (player.takeItem(${chest[0]}, ${chest[1]}, ${chest[2]})){
        player.execute("fill x y z x y z redstone_block 0 replace gold_block 0");
    }    
            `)
        }

        scripts.push(`
    \n--- onLeave ---\n
    // Activated via Script Region (onLeave)
    // Script Region Armor Stand located @ 
    // Safe teleportation area located @ 

    player.removeData("at_test");
        `)

        
        scriptsOut.getDoc().setValue(scripts.join("\n\n"));
    }

    document.querySelector("#generateButton").innerHTML = "<div class='spinner-border'></div>";
    generateCode().then(() => {
        document.querySelector("#generateButton").innerHTML = "<span>Generate CMDS + Scripts</span>"
    })
}