const smallCups = document.querySelectorAll(".cup-small")
const listers = document.querySelector("#listers")
const percentage = document.querySelector(".percentage")
const remained = document.querySelector(".remained")
const drops = document.querySelectorAll("img")
const animation = document.querySelector("h2")

smallCups.forEach((cup, index) => {
    cup.addEventListener("click", () => highlightCups(index))
})

function highlightCups(index) {

    if (smallCups[index].classList.contains("full") && !smallCups[index].nextElementSibling.classList.contains(
        "full")) {
        index--;
    }

    smallCups.forEach((cup, index2) => {
        if (index2 <= index) {
            cup.classList.add("full");
        } else {
            cup.classList.remove("full");
        }
    })

    drops.forEach((drop, index2) => {
        if (index2 <= index) {
            drop.style.display = "none";
        } else {
            drop.style.display = "block";
        }
    })

    updateBigCup();
}

function updateBigCup() {

    const fullCups = document.querySelectorAll(".cup-small.full").length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.visibility = "hidden";
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = "visible";
        percentage.style.height = `${(fullCups / totalCups) * 330}px`;
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = "hidden";
        remained.style.height = 0;
        animation.classList.add("end");
    } else {
        remained.style.visibility = "visible";
        listers.innerText = `${(2 - (250 * fullCups) / 1000)}L`;
        animation.classList.remove("end");
    }

}