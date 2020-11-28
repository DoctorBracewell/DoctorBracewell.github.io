// Cookies
if (localStorage.getItem('cookies') === null) {
    document.querySelector("#cookies-popup").style.display = "flex";
}
document.querySelector(".cookies-accept").addEventListener("click", () => {
    localStorage.setItem("cookies", true);
    document.querySelector("#cookies-popup").style.display = "none";
})