function createCup(): void {
    let container: HTMLElement = document.querySelector('.cups');

    for (let i = 0; i < 8; i++) {
        const newCup = document.createElement('div');
        newCup.classList.add('cup', 'cup-small');

        const newParagraph = document.createElement('p');
        newParagraph.textContent = '250 ml';

        const newImage = document.createElement('img');
        newImage.setAttribute('src', 'img/waterdrop.png');
        newImage.setAttribute('alt', '');

        newCup.appendChild(newParagraph);
        newCup.appendChild(newImage);

        container.appendChild(newCup);
    }
}

createCup();

const smallCups: NodeListOf<Element> = document.querySelectorAll('.cup-small');
const listers: HTMLDivElement = document.querySelector('#listers');
const percentage: HTMLDivElement = document.querySelector('.percentage');
const remained: HTMLDivElement = document.querySelector('.remained');
const drops: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
const animationText: HTMLHeadingElement = document.querySelector('h2');

smallCups.forEach((cup: Element, index: number) => {
    cup.addEventListener('click', () => {
        highlightCups(index);
    });
});

function highlightCups(index: number): void {
    if (
        smallCups[index].classList.contains('full') &&
        !smallCups[index].nextElementSibling.classList.contains('full')
    ) {
        index--;
    }

    smallCups.forEach((cup: Element, index2: number) => {
        if (index2 <= index) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    drops.forEach((drop: HTMLImageElement, index2: number) => {
        if (index2 <= index) {
            drop.style.display = 'none';
        } else {
            drop.style.display = 'block';
        }
    });

    updateBigCup();
}

function updateBigCup(): void {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;

    if (fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = '0';
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups / totalCups) * 330}px`;
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = '0';
        animationText.classList.add('end');
    } else {
        remained.style.visibility = 'visible';
        listers.innerText = `${2 - (250 * fullCups) / 1000}L`;
        animationText.classList.remove('end');
    }
}
