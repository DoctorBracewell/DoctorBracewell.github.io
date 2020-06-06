
var spellsActive = false
var newLine = "\r\n";
new Clipboard('#copyButton');
var spellNumber = 0;



function generateYaml() {
    //important stuff
    $("#endYaml").slideUp()
    var endYaml = ""

    function intToFloat(num, decPlaces) {
        return num + '.' + Array(decPlaces + 1).join('0');
    }

    //set variables
    var yamlName = document.getElementById("yamlName").value;

    var mobType = document.getElementById("mobType").value;
    var mobTag = document.getElementById("mobTag").value;
    var chestName = document.getElementById("chestName").value;

    var attack = document.getElementById("attack").value;

    var level = document.getElementById("level").value;
    var health = document.getElementById("health").value;
    var regen = document.getElementById("regen").value;

    var minXP = document.getElementById("minXP").value;
    var maxXP = document.getElementById("maxXP").value;
    var minDam = document.getElementById("minDam").value;
    var maxDam = document.getElementById("maxDam").value;

    var attackRate = document.getElementById("attackRate").value;

    var projectile = document.getElementById("projectile").value;
    var projectileSpeed = document.getElementById("projectileSpeed").value;

    var loot = document.getElementById("loot").value;
    var speed = document.getElementById("speed").value;
    var vision = document.getElementById("vision").value;

    var vanished = document.getElementById("vanished").value;
    var burning = document.getElementById("burning").value;
    var baby = document.getElementById("baby").value;
    var bigcollider = document.getElementById("bigcollider").value;

    var spawnId = document.getElementById("spawnid").value;
    var maxSpawn = document.getElementById("maxspawn").value;
    var susKnock = document.getElementById("susknock").value;

    var hurtSound = document.getElementById("soundHurt").value;
    var hurtSoundL = hurtSound.length;
    var hurtSoundR = hurtSound.slice(7, (hurtSoundL - 4));
    var hurtSoundPitch = document.getElementById("soundHurtPitch").value;
    if (hurtSoundPitch < 0.5) {
        hurtSoundPitch = 0.5;
    } else if (hurtSoundPitch > 2) {
        hurtSoundPitch = 2;
    }

    var deathSound = document.getElementById("soundDeath").value;
    var deathSoundL = deathSound.length;
    var deathSoundR = deathSound.slice(7, (deathSoundL - 4));
    var deathSoundPitch = document.getElementById("soundDeathPitch").value;
    if (deathSoundPitch < 0.5) {
        deathSoundPitch = 0.5;
    } else if (deathSoundPitch > 2) {
        deathSoundPitch = 2;
    }

    var randomSound = document.getElementById("soundRandom").value;
    var randomSoundL = randomSound.length;
    var randomSoundR = randomSound.slice(7, (randomSoundL - 4));
    var randomSoundPitch = document.getElementById("soundRandomPitch").value;
    if (randomSoundPitch < 0.5) {
        randomSoundPitch = 0.5;
    } else if (randomSoundPitch > 2) {
        randomSoundPitch = 2;
    }

    var waterDam = document.getElementById("waterDam").value;
    var earthDam = document.getElementById("earthDam").value;
    var fireDam = document.getElementById("fireDam").value;
    var thunderDam = document.getElementById("thunderDam").value;
    var airDam = document.getElementById("airDam").value;

    var waterDef = document.getElementById("waterDef").value;
    var earthDef = document.getElementById("earthDef").value;
    var fireDef = document.getElementById("fireDef").value;
    var thunderDef = document.getElementById("thunderDef").value;
    var airDef = document.getElementById("airDef").value;

    var yamlTitle = 'Put this as the name of the file:<br />' + '<strong>' + yamlName + '.' + mobType + '.yml</strong>';

    //generate yaml
    var endYaml =
        'tag: \'' + mobTag + '\'' + newLine +
        'chestName: ' + chestName + newLine +
        'attack: ' + attack + newLine +
        'level: ' + level + newLine +
        'health: ' + intToFloat(health, 1) + newLine +
        'regen: ' + intToFloat(regen, 1) + newLine +
        'minXP: ' + minXP + newLine +
        'maxXP: ' + maxXP + newLine +
        'minDam: ' + intToFloat(minDam, 1) + newLine +
        'maxDam: ' + intToFloat(maxDam, 1) + newLine +
        'attackRate: ' + attackRate + newLine +
        'projectile: ' + projectile + newLine +
        'projectileSpeed: ' + projectileSpeed + newLine +
        'lootMultiplier: ' + loot + newLine +
        'speed: ' + speed + newLine +
        'vision: ' + vision + newLine +
        'vanished: ' + vanished + newLine +
        'boss: false' + newLine +
        'burning: ' + burning + newLine +
        'baby: ' + baby + newLine +
        'bigCollider: ' + bigcollider + newLine +
        'projectileToMob: false' + newLine +
        'spawnedID: \'' + spawnId + '\'' + newLine +
        'maxSpawned: ' + maxSpawn + newLine +
        'sustainedKnockback: ' + susKnock + newLine;

    //test for spells
    if (spellsActive === true) {
        endYaml += 'spells: true' + newLine
        var spellsComplete = 'spell: \''
        var spellsCool = 'spellCooldown: '
        var spellsDam = 'damage: '
        var spellCheck = 0;
        for (allSpells = 0; allSpells < spellNumber; allSpells++) {
            var multipleSpell = $("#sselect" + spellCheck).val();
            spellsComplete += multipleSpell + ', '

            var multipleCool = $("#scool" + spellCheck).val();
            spellsCool += multipleCool + ', '

            var multipleDam = $("#sdam" + spellCheck).val();
            spellsDam += multipleDam + ', '

            spellCheck++
        }
        spellsComplete = spellsComplete.substring(0, spellsComplete.length - 1);
        spellsComplete = spellsComplete.substring(0, spellsComplete.length - 1);
        spellsComplete += '\'' + newLine

        spellsCool = spellsCool.substring(0, spellsCool.length - 1);
        spellsCool = spellsCool.substring(0, spellsCool.length - 1);
        spellsCool += newLine

        spellsDam = spellsDam.substring(0, spellsDam.length - 1);
        spellsDam = spellsDam.substring(0, spellsDam.length - 1);
        spellsDam += newLine

        endYaml += spellsComplete;
        endYaml += spellsCool;
        endYaml += spellsDam;
    } else {
        endYaml +=
            'spells: false' + newLine +
            'spell: \'null\'' + newLine +
            'spellCooldown: 20' + newLine +
            'damage: 0' + newLine
    }

    endYaml +=
        "soundHurt: '" + hurtSoundR + ":" + hurtSoundPitch + "'" + newLine +
        "soundDeath: '" + deathSoundR + ":" + deathSoundPitch + "'" + newLine +
        "soundRandom: '" + randomSoundR + ":" + randomSoundPitch + "'" + newLine

    if (waterDam != "") {
        endYaml += "waterDamage: " + waterDam + newLine;
    }
    if (earthDam != "") {
        endYaml += "earthDamage: " + earthDam + newLine;
    }
    if (fireDam != "") {
        endYaml += "fireDamage: " + fireDam + newLine;
    }
    if (thunderDam != "") {
        endYaml += "thunderDamage: " + thunderDam + newLine;
    }
    if (airDam != "") {
        endYaml += "airDamage: " + airDam + newLine;
    }

    if (waterDef != "") {
        endYaml += "waterDefense: " + waterDef + newLine;
    }
    if (earthDef != "") {
        endYaml += "earthDefense: " + earthDef + newLine;
    }
    if (fireDef != "") {
        endYaml += "fireDefense: " + fireDef + newLine;
    }
    if (thunderDef != "") {
        endYaml += "thunderDefense: " + thunderDef + newLine;
    }
    if (airDef != "") {
        endYaml += "airDefense: " + airDef + newLine;
    }


    if (document.getElementById("mobType").value === 'standmob') {
        endYaml += "file: " + $("#amob").val();
    } else if (document.getElementById("mobType").value === 'arrow') {
        endYaml += "critical: " + $("#arrowCrit").val();
    } else if (document.getElementById("mobType").value === 'bat') {
        endYaml += "flying: " + $("#batFly").val();
    } else if (document.getElementById("mobType").value === 'blaze') {
        endYaml += "burning: " + $("#blazeBurn").val();
    } else if (document.getElementById("mobType").value === 'creeper') {
        endYaml += "powered: " + $("#creeperCharge").val() + newLine;
        endYaml += "ignited: " + $("#creeperIgnite").val();
    } else if (document.getElementById("mobType").value === 'enderman') {
        endYaml += "aggressive: " + $("#endermanAggro").val();
    } else if (document.getElementById("mobType").value === 'fallingblock') {
        endYaml += "block: " + $("#fallingBlockId").val() + newLine;
        endYaml += "blockdamage: " + $("#fallingBlockDam").val();
    } else if (document.getElementById("mobType").value === 'horse') {
        endYaml += "color: " + $("#horseColour").val() + newLine;
        endYaml += "style: " + $("#horseStyle").val() + newLine;
        endYaml += "carryingChest: " + $("#horseChest").val() + newLine;
        endYaml += "mouthOpen: " + $("#horseMouth").val() + newLine;
        endYaml += "rearing: " + $("#horseRear").val() + newLine;
        endYaml += "saddled: " + $("#horseSaddle").val();
    } else if (document.getElementById("mobType").value === 'player') {
        endYaml += "skin: \"" + $("#playerSkin").val() + "\"";
    } else if (document.getElementById("mobType").value === 'item') {
        endYaml += "item: " + $("#itemId").val() + newLine;
        endYaml += "itemdamage: " + $("#itemDam").val();
    } else if (document.getElementById("mobType").value === 'ocelot') {
        endYaml += "type: " + $("#catType").val() + newLine;
        endYaml += "sitting: " + $("#catSit").val() + newLine;
        endYaml += "tamed: " + $("#catTame").val();
    } else if (document.getElementById("mobType").value === 'pig') {
        endYaml += "saddled: " + $("#pigSaddle").val();
    } else if (document.getElementById("mobType").value === 'potion') {
        endYaml += "potionid: " + $("#potionId").val();
    } else if (document.getElementById("mobType").value === 'sheep') {
        endYaml += "sheared: " + $("#sheepShear").val() + newLine;
        endYaml += "color: " + $("#sheepColour").val();
    } else if (document.getElementById("mobType").value === 'skeleton') {
        endYaml += "stray: " + $("#stray").val();
    } else if (document.getElementById("mobType").value === 'slime') {
        endYaml += "size: " + $("#slimeSize").val();
    } else if (document.getElementById("mobType").value === 'villager') {
        endYaml += "profession: " + $("#villager").val();
    } else if (document.getElementById("mobType").value === 'witherskull') {
        endYaml += "blue: " + $("#witherSkull").val();
    } else if (document.getElementById("mobType").value === 'wolf') {
        endYaml += "angry: " + $("#wolfAnger").val() + newLine;
        endYaml += "sitting: " + $("#wolfSit").val() + newLine;
        endYaml += "tame: " + $("#wolfTame").val() + newLine;
        endYaml += "color: " + $("#wolfColour").val();
    } else if (document.getElementById("mobType").value === 'zombie') {
        endYaml += "villager: " + $("#zombieVillager").val() + newLine;
        endYaml += "husk: " + $("#husk").val();
    }
    document.getElementById("customTag").innerHTML = '<span style="background-color: #cecece;"' + yamlTitle + '</span>';
    document.getElementById("copyEnd").innerHTML = endYaml
    $("#endYaml").slideDown()

    setTimeout(function() {
        window.scrollBy({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        });
    }, 500);
}

function hideStuff() {
    $("#endYaml").hide()
    $("#amobP").hide()
    $("#arrowCritP").hide()
    $("#batFlyP").hide()
    $("#blazeBurnP").hide()
    $("#creeperChargeP").hide()
    $("#creeperIgniteP").hide()
    $("#endermanAggroP").hide()
    $("#fallingBlockIdP").hide()
    $("#fallingBlockDamP").hide()
    $("#horseColourP").hide()
    $("#horseStyleP").hide()
    $("#horseChestP").hide()
    $("#horseMouthP").hide()
    $("#horseRearP").hide()
    $("#horseSaddleP").hide()
    $("#playerSkinP").hide()
    $("#itemIdP").hide()
    $("#itemDamP").hide()
    $("#catTypeP").hide()
    $("#catSitP").hide()
    $("#catTamedP").hide()
    $("#pigSaddleP").hide()
    $("#sheepShearP").hide()
    $("#sheepColourP").hide()
    $("#potionIdP").hide()
    $("#strayP").hide()
    $("#slimeSizeP").hide()
    $("#villagerP").hide()
    $("#witherSkullP").hide()
    $("#wolfAngerP").hide()
    $("#wolfSitP").hide()
    $("#wolfTameP").hide()
    $("#wolfColourP").hide()
    $("#zombieVillagerP").hide()
    $("#huskP").hide()
    $('#elementDam').hide();
    $('#elementDef').hide();
}

function mobTypeChange() {
    hideStuff()
    if (document.getElementById("mobType").value === 'standmob') {
        $("#amobP").slideDown()
    } else if (document.getElementById("mobType").value === 'arrow') {
        $("#arrowCritP").slideDown()
    } else if (document.getElementById("mobType").value === 'bat') {
        $("#batFlyP").slideDown()
    } else if (document.getElementById("mobType").value === 'blaze') {
        $("#blazeBurnP").slideDown()
    } else if (document.getElementById("mobType").value === 'creeper') {
        $("#creeperChargeP").slideDown()
        $("#creeperIgniteP").slideDown()
    } else if (document.getElementById("mobType").value === 'enderman') {
        $("#endermanAggroP").slideDown()
    } else if (document.getElementById("mobType").value === 'fallingblock') {
        $("#fallingBlockIdP").slideDown()
        $("#fallingBlockDamP").slideDown()
    } else if (document.getElementById("mobType").value === 'horse') {
        $("#horseColourP").slideDown()
        $("#horseStyleP").slideDown()
        $("#horseChestP").slideDown()
        $("#horseMouthP").slideDown()
        $("#horseRearP").slideDown()
        $("#horseSaddleP").slideDown()
    } else if (document.getElementById("mobType").value === 'player') {
        $("#playerSkinP").slideDown()
    } else if (document.getElementById("mobType").value === 'item') {
        $("#itemIdP").slideDown()
        $("#itemDamP").slideDown()
    } else if (document.getElementById("mobType").value === 'ocelot') {
        $("#catTypeP").slideDown()
        $("#catSitP").slideDown()
        $("#catTamedP").slideDown()
    } else if (document.getElementById("mobType").value === 'pig') {
        $("#pigSaddleP").slideDown()
    } else if (document.getElementById("mobType").value === 'potion') {
        $("#potionIdP").slideDown()
    } else if (document.getElementById("mobType").value === 'sheep') {
        $("#sheepShearP").slideDown()
        $("#sheepColourP").slideDown()
    } else if (document.getElementById("mobType").value === 'skeleton') {
        $("#strayP").slideDown()
    } else if (document.getElementById("mobType").value === 'slime') {
        $("#slimeSizeP").slideDown()
    } else if (document.getElementById("mobType").value === 'villager') {
        $("#villagerP").slideDown()
    } else if (document.getElementById("mobType").value === 'witherskull') {
        $("#witherSkullP").slideDown()
    } else if (document.getElementById("mobType").value === 'wolf') {
        $("#wolfAngerP").slideDown()
        $("#wolfSitP").slideDown()
        $("#wolfTameP").slideDown()
        $("#wolfColourP").slideDown()
    } else if (document.getElementById("mobType").value === 'zombie') {
        $("#zombieVillagerP").slideDown()
        $("#huskP").slideDown()
    }
}

function createSpell() {
    spells.insertAdjacentHTML('beforeend', '<div class="spellContainer' + (spellNumber) + '"><p><label for="spell' + (spellNumber) + '"><strong>Spell ' + (spellNumber + 1) + '</strong> <select id="sselect' + (spellNumber) + '" name="spell' + (spellNumber) + '"></label><option value="ARROW_STORM">Arrow Storm</option><option value="HEAVY_ARROW_STORM">Heavy Arrow Storm</option><option value="CHARGE">Charge</option><option value="HEAVY_CHARGE">Heavy Charge</option><option value="FLAME_THROWER">Flame Thrower</option><option value="HEAVY_FLAME_THROWER">Heavy Flame Thrower</option><option value="HEAL">Heal</option><option value="HEAVY_HEAL">Heavy Heal</option><option value="METEOR">Meteor</option><option value="MULTIHIT">Multihit</option><option value="HEAVY_MULTIHIT">Heavy Multihit</option><option value="PULL">Pull</option><option value="HEAVY_PULL">Heavy Pull</option><option value="PUSH">Push</option><option value="HEAVY_PUSH">Heavy Push</option><option value="SELF_DESTRUCT">Self Destruct</option><option value="SLOWNESS">Slowness</option><option value="HEAVY_SLOWNESS">Heavy Slowness</option><option value="SPIDERWEB">Spiderweb</option><option value="TELEPORT">Teleport</option><option value="HEAVY_TELEPORT">Heavy Teleport</option><option value="VANISH">Vanish</option><option value="HEAVY_VANISH">Heavy Vanish</option><option value="WEAKNESS">Weakness</option><option value="HEAVY_WEAKNESS">Heavy Weakness</option></select></p><p><label><strong>Cooldown ' + (spellNumber + 1) + '</strong> <input autocomplete="off" type="number" value="20" id="scool' + (spellNumber) + '"></label></p><p><label><strong>Damage ' + (spellNumber + 1) + '</strong> <input autocomplete="off" type="number" value="0" id="sdam' + (spellNumber) + '"></label></p><br /></div>');
    
    spellNumber += 1;
    spellsActive = true
}

function playHurt() {
    var soundFile = document.getElementById("soundHurt").value;
    var playRate = document.getElementById("soundHurtPitch").value;
    if (playRate < 0.5) {
        playRate = 0.5;
    } else if (playRate > 2) {
        playRate = 2;
    }
    window.audio = new Audio(soundFile);
    audio.pitchShift;
    audio.playbackRate = playRate;
    audio.play();
}

function playDeath() {
    var soundFile = document.getElementById("soundDeath").value;
    var playRate = document.getElementById("soundDeathPitch").value;
    if (playRate < 0.5) {
        playRate = 0.5;
    } else if (playRate > 2) {
        playRate = 2;
    }
    window.audio = new Audio(soundFile);
    audio.mozPreservesPitch = false;
    audio.webkitPreservesPitch = false;
    audio.playbackRate = playRate;
    audio.play();
}

function playRandom() {
    var soundFile = document.getElementById("soundRandom").value;
    var playRate = document.getElementById("soundRandomPitch").value;
    if (playRate < 0.5) {
        playRate = 0.5;
    } else if (playRate > 2) {
        playRate = 2;
    }
    window.audio = new Audio(soundFile);
    audio.mozPreservesPitch = false;
    audio.webkitPreservesPitch = false;
    audio.playbackRate = playRate;
    audio.play();
}

hideStuff();
$("#amobP").show();
