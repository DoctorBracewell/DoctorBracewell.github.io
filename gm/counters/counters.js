// Cookies
if (localStorage.getItem('cookies') === null) {
    document.querySelector("#cookies-popup").style.display = "flex";
}
document.querySelector(".cookies-accept").addEventListener("click", () => {
    localStorage.setItem("cookies", true);
    document.querySelector("#cookies-popup").style.display = "none";
})

const commandsOut = CodeMirror.fromTextArea(document.querySelector("#commandsOut"), {mode: "", theme: "lesser-dark", lineNumbers: true, lineWrapping: true});
const scriptsOut = CodeMirror.fromTextArea(document.querySelector("#scriptsOut"), {theme: "lesser-dark", lineNumbers: true, lineWrapping: true});

function generateStuff() {
    let cmds = ["--- Counting CMDS ---\n"], itemNum = document.querySelector("#item-number").value, x = document.querySelector("#x-stand").value, y = document.querySelector("#y-stand").value, z = document.querySelector("#z-stand").value

    for (let i = 0; i <= parseInt(itemNum); i++) {
        cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=${i}${i !== parseInt(itemNum) ? `,score_thDungeonCounter=${i}` : ""}] {CustomName:"&a${i}&2/${itemNum}"}`)
    }
    cmds.push(`/execute @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=${itemNum}] ~ ~ ~ /fill x1 y1 z1 x2 y2 z2 redstone_block 0 replace gold_block 0`);
    cmds.push(`/execute @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=${itemNum}] ~ ~ ~ /setblock ${document.querySelector("#x-chest").value} ${document.querySelector("#y-chest").value} ${document.querySelector("#z-chest").value} barrier`);
    
    cmds.push("\n--- CMDS When Activated ---\n")
    cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z}] {CustomNameVisible:0b}`);
    cmds.push(`/fill ${x+1} ${y+1} ${z} ${x+6} ${y+1} ${z+1} diamond_block 0 replace gold_block 0`)

    cmds.push("\n--- Reset CMDS ---\n")
    cmds.push(`/entitydata @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z}] {CustomNameVisible:1b}`);
    cmds.push(`/clone ${document.querySelector("#x-chest").value} ${document.querySelector("#y-chest").value + 1} ${document.querySelector("#z-chest").value} ${document.querySelector("#x-chest").value} ${document.querySelector("#y-chest").value + 1} ${document.querySelector("#z-chest").value} ${document.querySelector("#x-chest").value} ${document.querySelector("#y-chest").value} ${document.querySelector("#z-chest").value}`);
    cmds.push(`/scoreboard players set @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] thDungeonCounter 0`);
    cmds.push(`/fill ${x+1} ${y+1} ${z} ${x+6} ${y+1} ${z+1} gold_block 0 replace diamond_block 0`)
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
X.spawn(${Math.sign(parseInt(document.querySelector("#x-stand").value)) ? parseInt(document.querySelector("#x-stand").value) + 0.5 : parseInt(document.querySelector("#x-stand").value) - 0.5}, ${parseInt(document.querySelector("#y-stand").value) + 1}, ${Math.sign(parseInt(document.querySelector("#z-stand").value)) ? parseInt(document.querySelector("#z-stand").value) + 0.5 : parseInt(document.querySelector("#z-stand").value) - 0.5});
X.say("&0");
X.setOnRightClickScript("${document.querySelector("#script-folder").value.slice(-1) === "/" ? document.querySelector("#script-folder").value : `${document.querySelector("#script-folder").value}/`}onRightClick");
X.setOnlyVisibleToPlayer;
X.setSpeed(0);
X.setInvulnerable(true);

while(player.getData("at_test", true)){ script.wait(50); }`
    );

    scripts.push(`
\n--- onRightClick ---\n
// Activated via Script (onRightClick)
// Script located @ ${document.querySelector("#script-folder").value.slice(-1) === "/" ? document.querySelector("#script-folder").value : `${document.querySelector("#script-folder").value}/`}onEnter

// For multiple items
if (player.getData("clickDoor", false)) {
    player.setData("clickDoor", true);
    player.execute("scoreboard players set @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter,score_thDungeonCounter_min=1] thDungeonCounter 0 {CustomName:"&a0&2/${itemNum}"}");
    player.execute("scoreboard players add @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] thDungeonCounter 0");
    while(player.takeItem(${document.querySelector("#x-chest").value}, ${document.querySelector("#y-chest").value}, ${document.querySelector("#z-chest").value})){
        player.execute("scoreboard players add @e[type=ArmorStand,r=1,x=${x},y=${y},z=${z},tag=thTestCounter] thDungeonCounter 1");
        world.activateCommandBlock(x, y, z);
    }
    player.setData("clickDoor", false);
}
    `)

    scripts.push(`
\n--- onLeave ---\n
// Activated via Script Region (onLeave)
// Script Region Armor Stand located @ 
// Safe teleportation area located @ 

player.removeData("at_test");
    `)

    
    scriptsOut.getDoc().setValue(scripts.join("\n\n"));
}