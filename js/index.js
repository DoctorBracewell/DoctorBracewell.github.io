$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}
function change() {
    var bgcolour = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    document.body.style.backgroundColor = bgcolour;
}
change()
setInterval(change, 2000);
setInterval(function() {
    let currentColour = $("body").css("backgroundColor");
    document.querySelector("#display").innerHTML = currentColour;
}, 1)