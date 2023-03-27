function createCup() {
  let kontener = document.querySelector(".cups");

  for (let i = 0; i < 8; i++) {
    let nowyElement = document.createElement("div");
    nowyElement.classList.add("cup", "cup-small");

    let nowyParagraf = document.createElement("p");
    nowyParagraf.textContent = "250 ml";

    let nowyObrazek = document.createElement("img");
    nowyObrazek.setAttribute("src", "img/waterdrop.png");
    nowyObrazek.setAttribute("alt", "");

    nowyElement.appendChild(nowyParagraf);
    nowyElement.appendChild(nowyObrazek);

    kontener.appendChild(nowyElement);
  }
}

createCup();

const smallCups = document.querySelectorAll(".cup-small");
const listers = document.querySelector("#listers");
const percentage = document.querySelector(".percentage");
const remained = document.querySelector(".remained");
const drops = document.querySelectorAll("img");
const animationText = document.querySelector("h2");

smallCups.forEach((cup, index) => {
  cup.addEventListener("click", () => highlightCups(index));
});

function highlightCups(index) {
  if (
    smallCups[index].classList.contains("full") &&
    !smallCups[index].nextElementSibling.classList.contains("full")
  ) {
    index--;
  }

  smallCups.forEach((cup, index2) => {
    if (index2 <= index) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  drops.forEach((drop, index2) => {
    if (index2 <= index) {
      drop.style.display = "none";
    } else {
      drop.style.display = "block";
    }
  });

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
    animationText.classList.add("end");
  } else {
    remained.style.visibility = "visible";
    listers.innerText = `${2 - (250 * fullCups) / 1000}L`;
    animationText.classList.remove("end");
  }
}
