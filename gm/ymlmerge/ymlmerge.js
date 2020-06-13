const editors = [moving = CodeMirror.fromTextArea(document.querySelector("#moving"), {mode: "yaml", theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
attacking = CodeMirror.fromTextArea(document.querySelector("#attacking"), {mode: "yaml", theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
idle1 = CodeMirror.fromTextArea(document.querySelector("#idle1"), {mode: "yaml", theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
idle2 = CodeMirror.fromTextArea(document.querySelector("#idle2"), {mode: "yaml", theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
idle3 = CodeMirror.fromTextArea(document.querySelector("#idle3"), {mode: "yaml", theme: "lesser-dark", lineNumbers: true, lineWrapping: true}),
output = CodeMirror.fromTextArea(document.querySelector("#output"), {mode: "yaml", theme: "lesser-dark", lineNumbers: true, lineWrapping: true})];


document.querySelector("#mergeButton").addEventListener("click", () => {
    try {
        merge()        
    }
    catch (e) {
        document.querySelector("#errors").style.display = "block";
        document.querySelector("#errors div").innerHTML = e.message;
    } 
})


function merge() {
    let search = [
        "  movingAnimation:",
        "  attackingAnimation:",
        "  idle1Animation:",
        "  idle2Animation:",
        "  idle3Animation:",
        "ArmourStand",
        "    type: SNOW",
        "      display-name:"
    ]
     
    const animationEnum = {moving: 0, attacking: 1, idle1: 2, idle2: 3, idle3: 4, armorStand: 5, snow: 6, displayName: 7}
    Object.freeze(animationEnum);
     
    let animations = [[]];
    let baseAnimation;
    let mergedAnimation = [];
    let activeAnimations = [false, false, false, false, false];
     
    let asCount = 0;
    let offset = 0;
    let foundSnow = true;
    let currentDisplayName = "";
    let copyFromDiffrentAnimation = false;
     


    for (let i = 0; i < 5; i++) {
        let a = editors[i].getDoc().getValue();
        if (a != "") {
            activeAnimations[i] = true;
            animations[i] = String(a).split("\n");
        }
      }
 
    if (activeAnimations[animationEnum.idle1]) {
        baseAnimation = animationEnum.idle1;
    } else if (activeAnimations[animationEnum.moving]) {
        baseAnimation = animationEnum.moving;
    } else if (activeAnimations[animationEnum.attacking]) {
        baseAnimation = animationEnum.attacking;
    } else if (activeAnimations[animationEnum.idle2]) {
        baseAnimation = animationEnum.idle2;
    } else if (activeAnimations[animationEnum.idle3]) {
        baseAnimation = animationEnum.idle3;
    }
   
    if (animations.length < 2) {
        throw new Error("Not enough animations found to continue. Make sure that there are at least two.")
    }

    for (let s of animations[baseAnimation]) {
        if (String(s).startsWith(search[animationEnum.armorStand])) {
            if (!foundSnow) {
                throw new Error("Armor stand " + asCount + " missing snow tag")
            } else {
                foundSnow = false;
            }
            asCount++;
        } else if (String(s).startsWith(search[animationEnum.snow])) {
            foundSnow = true;
            currentDisplayName = animations[baseAnimation][offset + 4];
        } else {
            for (let i = 0; i < 5; i++) {
                if (activeAnimations[i] && baseAnimation != i && String(s).startsWith(search[i])) {
                    copyFromDiffrentAnimation = true;
 
                    let foundStand = false;
 
                    for (var l of animations[i]) {
                        if (!foundStand) {
                            if (String(l).startsWith(String(currentDisplayName))) {
                                foundStand = true;
                            }
                        } else if (String(l).startsWith(search[i])) {
                            mergedAnimation.push(l);
                            break;
                        }
                    }

                    if (!foundStand && currentDisplayName != undefined) {
                        throw new Error("Armor stand with snow tag " + currentDisplayName.split(": ").pop() + " missing in " + inputIDs[i]);
                    }
                }
            }
        }
 
        if (!copyFromDiffrentAnimation) {
            mergedAnimation.push(s);
        } else { copyFromDiffrentAnimation = false; }
        offset++;
    };
 
    document.querySelector("#errors").setAttribute("style", "display: none !important");
    document.querySelector("#errors div").innerHTML = "";
    output.setValue(mergedAnimation.join("\n"));
}
 