for (let element of document.querySelectorAll(".navbar-link")) {
    element.addEventListener("click", () => {
        document.querySelector(`#${element.innerHTML}`).scrollIntoView({block: "start"});
    });
}

if (localStorage.getItem('cookies') === null) {
    document.querySelector("#cookies-popup").style.display = "flex";
}

document.querySelector(".cookies-accept").addEventListener("click", () => {
    localStorage.setItem("cookies", true);
    document.querySelector("#cookies-popup").style.display = "none";
})