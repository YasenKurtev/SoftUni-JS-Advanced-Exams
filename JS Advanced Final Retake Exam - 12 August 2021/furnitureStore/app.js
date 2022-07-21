window.addEventListener('load', solve);

function solve() {

    let model = document.querySelector('#model');
    let year = document.querySelector('#year');
    let description = document.querySelector('#description');
    let price = document.querySelector('#price');
    let addBtn = document.querySelector('#add');
    let furnitureList = document.querySelector('#furniture-list');
    let totalPrice = document.querySelector('td.total-price');

    let sum = 0;

    addBtn.addEventListener('click', onAdd);

    let inputsArr = [model, year, description, price];

    function onAdd(ev) {
        ev.preventDefault();
        let isCorrect = true;

        for (let input of inputsArr) {
            if (input.value === '') {
                isCorrect = false;
                break;
            }
        }

        if (year.value < 0 || price < 0) {
            isCorrect = false;
        }

        if (isCorrect === true) {
            let newTrInfo = document.createElement('tr');
            newTrInfo.classList.add('info');
            let newTd1 = document.createElement('td');
            newTd1.textContent = model.value;
            let newTd2 = document.createElement('td');
            newTd2.textContent = Number(price.value).toFixed(2);
            let newTdButtons = document.createElement('td');
            let newMoreBtn = document.createElement('button');
            newMoreBtn.textContent = 'More Info';
            newMoreBtn.classList.add('moreBtn');
            let newBuyBtn = document.createElement('button');
            newBuyBtn.textContent = 'Buy it';
            newBuyBtn.classList.add('buyBtn');
            let newTrHidden = document.createElement('tr');
            newTrHidden.classList.add('hide');
            newTrHidden.style.display = 'none';
            let newTd3 = document.createElement('td');
            newTd3.textContent = `Year: ${year.value}`;
            let newTd4 = document.createElement('td');
            newTd4.colSpan = '3';
            newTd4.textContent = `Description: ${description.value}`;

            newMoreBtn.addEventListener('click', onMore);
            newBuyBtn.addEventListener('click', onBuy);

            newTdButtons.appendChild(newMoreBtn);
            newTdButtons.appendChild(newBuyBtn);
            newTrInfo.appendChild(newTd1);
            newTrInfo.appendChild(newTd2);
            newTrInfo.appendChild(newTdButtons);
            newTrHidden.appendChild(newTd3);
            newTrHidden.appendChild(newTd4);
            furnitureList.appendChild(newTrInfo);
            furnitureList.appendChild(newTrHidden);

            for (let input of inputsArr) {
                input.value = '';
            }
        }
    }

    function onMore(ev) {
        let infoTr = ev.target.parentElement.parentElement;
        let allTr = Array.from(furnitureList.children);
        let index = allTr.indexOf(infoTr);
        if (allTr[index + 1].style.display === 'none') {
            ev.target.textContent = 'Less Info';
            allTr[index + 1].style.display = 'contents';
        } else if (allTr[index + 1].style.display === 'contents') {
            ev.target.textContent = 'More Info';
            allTr[index + 1].style.display = 'none';
        }
    }

    function onBuy(ev) {
        let infoTr = ev.target.parentElement.parentElement;
        let allTr = Array.from(furnitureList.children);
        let index = allTr.indexOf(infoTr);
        let price = Array.from(infoTr.getElementsByTagName('td'))[1];
        sum += Number(price.textContent);
        totalPrice.textContent = sum.toFixed(2);
        infoTr.remove();
        allTr[index + 1].remove();
    }

}