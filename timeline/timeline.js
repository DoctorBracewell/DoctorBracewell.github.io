fetch('https://drbracewell.co.uk/timeline/timeline-content.json')
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
        let leftRight = "left";
        for (let element in json) {
            // Query Parent
            let parent = document.querySelector(`#${json[element].parent}`);
            // Container
            let box = document.createElement("div");
            box.setAttribute("class", "info-container");
            // Circle;
            let circle = document.createElement("div");
            circle.setAttribute("class", `line-circle ${leftRight}`);
            // Div
            let div = document.createElement("div");
            // Span
            let span = document.createElement("span");
            let date = document.createTextNode(json[element].date);
            span.setAttribute("class", "center-text");
            // Paragraph
            let para = document.createElement("p");
            para.setAttribute("class", `info-text ${leftRight}`);
            para.setAttribute("id", `info-text ${element}`);
            // Text
            let text = document.createTextNode(json[element].content);

            // Gap
            let gap = document.createElement("div");
            gap.setAttribute("class", `custom-gap ${json[element].gap}`)

            // Join
            span.appendChild(date)
            para.appendChild(text)
            div.appendChild(span);
            div.appendChild(para);
            circle.appendChild(div);
            box.appendChild(circle);
            parent.appendChild(box);

            parent.appendChild(gap);

            if (leftRight === "left") {
                leftRight = "right";
            } else {
                leftRight = "left";
            }
        }

        let gaps = document.querySelectorAll(".custom-gap");
        for (let element of gaps) {
            let number = element.classList[1];
            element.style.paddingBottom = `${number}vh`
        }

        let dates = document.querySelectorAll(".line-circle div span");
        for (let element of dates) {
            element.style.fontSize = `${element.innerHTML.length > 7 ? "27" : "50"}px`
        }
    })

document.querySelector(".begin").addEventListener("click", () => {
    document.querySelector("#scroll-to").scrollIntoView({block: "start"});
});

window.onscroll = () => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

/*window.onload = () => {
    let time = 1600;
    let counter = 0;
    let interval = setInterval(() => {
        if (counter != (time + 2)) {
            document.querySelector("#count-up").innerHTML = counter;
            counter += 3;
        } else {
            document.querySelector("#count-up").innerHTML = time;
            clearInterval(interval);
            document.querySelector("#entire-content").style.display = "block";
            setTimeout(() => {
                document.querySelector(".fade-in").style.display = "none";
                document.querySelector("#bubble").style.animation = "bubble 3s ease 5s infinite;";
            }, 3000)
        }
    }, 1)
}*/
let easingFn = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

let countOptions = {
    useEasing: true,
    separator: ''
};

let count = new CountUp('count-up', 0, 1599, 0, 5, countOptions)

count.start(() => {
    setTimeout(() => {
        document.querySelector("#count-up").innerHTML = "1600";
        document.querySelector("#entire-content").style.display = "block";

        setTimeout(() => {
            document.querySelector(".fade-in").style.display = "none";
            document.querySelector("#bubble").style.animation = "bubble 3s ease 5s infinite;";
        }, 2500)
    }, 250)
})

