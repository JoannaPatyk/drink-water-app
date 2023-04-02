function create_cup(): void {
    let container: HTMLElement = document.querySelector('.cups');

    for (let i = 0; i < 8; i++) {
        const newElement = document.createElement('div');
        newElement.classList.add('cup', 'cup-small');

        const newParagraph = document.createElement('p');
        newParagraph.textContent = '250 ml';

        const newImage = document.createElement('img');
        newImage.setAttribute('src', 'img/waterdrop.png');
        newImage.setAttribute('alt', '');

        newElement.appendChild(newParagraph);
        newElement.appendChild(newImage);

        container.appendChild(newElement);
    }
}

create_cup();

const small_cups: NodeListOf<Element> = document.querySelectorAll('.cup-small');
console.log(small_cups);
const listers: HTMLDivElement = document.querySelector('#listers');
const percentage: HTMLDivElement = document.querySelector('.percentage');
const remained: HTMLDivElement = document.querySelector('.remained');
const drops: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
const animationText: HTMLHeadingElement = document.querySelector('h2');

small_cups.forEach((cup: Element, index: number) => {
    cup.addEventListener('click', () => {
        highlight_cups(index);
    });
});

function highlight_cups(index: number): void {
    if (
        small_cups[index].classList.contains('full') &&
        !small_cups[index].nextElementSibling.classList.contains('full')
    ) {
        index--;
    }

    small_cups.forEach((cup: Element, index2: number) => {
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

    update_big_cup();
}

function update_big_cup(): void {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = small_cups.length;

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
