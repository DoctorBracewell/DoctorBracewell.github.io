let change = () => {
    let bgcolour = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    document.body.style.backgroundColor = bgcolour;
}
change()
setInterval(change, 2000);