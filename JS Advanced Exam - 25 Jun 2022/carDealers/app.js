window.addEventListener("load", solve);

function solve() {

    let makeElement = document.getElementById('make');
    let modelElement = document.getElementById('model');
    let yearElement = document.getElementById('year');
    let fuelElement = document.getElementById('fuel');
    let originalCostElement = document.getElementById('original-cost');
    let sellingPriceElement = document.getElementById('selling-price');
    let publishButton = document.getElementById('publish');
    let tbodyElement = document.getElementById('table-body');
    let totalProfit = 0;



    publishButton.addEventListener('click', (e) => {
        e.preventDefault();

        let make = makeElement.value;
        let model = modelElement.value;
        let year = yearElement.value;
        let fuel = fuelElement.value;
        let cost = Number(originalCostElement.value);
        let price = Number(sellingPriceElement.value);

        if (make == '' || model == '' || year == '' || fuel == '' || cost == '' || price == '' || cost > price) {
            return;
        }

        makeElement.value = '';
        modelElement.value = '';
        yearElement.value = '';
        fuelElement.value = '';
        originalCostElement.value = '';
        sellingPriceElement.value = '';

        let rowTR = document.createElement('tr');
        rowTR.classList.add('row')
        let makeTD = document.createElement('td');
        makeTD.textContent = make;
        let modelTD = document.createElement('td');
        modelTD.textContent = model;
        let yearTD = document.createElement('td');
        yearTD.textContent = year;
        let fuelTD = document.createElement('td');
        fuelTD.textContent = fuel;
        let costTD = document.createElement('td');
        costTD.textContent = Number(cost);
        let priceTD = document.createElement('td');
        priceTD.textContent = Number(price);
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('action-btn', 'edit');
        editBtn.setAttribute('type', 'submit');
        let sellBtn = document.createElement('button');
        sellBtn.textContent = 'Sell';
        sellBtn.classList.add('action-btn', 'sell');
        sellBtn.setAttribute('type', 'submit');

        rowTR.appendChild(makeTD);
        rowTR.appendChild(modelTD);
        rowTR.appendChild(yearTD);
        rowTR.appendChild(fuelTD);
        rowTR.appendChild(costTD);
        rowTR.appendChild(priceTD);
        rowTR.appendChild(editBtn);
        rowTR.appendChild(sellBtn);

        tbodyElement.appendChild(rowTR);


        editBtn.addEventListener('click', (e) => {
            e.preventDefault();

            makeElement.value = make;
            modelElement.value = model;
            yearElement.value = year;
            fuelElement.value = fuel;
            originalCostElement.value = cost;
            sellingPriceElement.value = price;

            tbodyElement.removeChild(rowTR);

        })

        sellBtn.addEventListener('click', (e) => {
            e.preventDefault();

            tbodyElement.removeChild(rowTR);

            let carsList = document.getElementById('cars-list');
            let profit = document.getElementById('profit');
            let diff = Number(price - cost);

            let ulElement = document.createElement('ul');
            ulElement.id = 'car-list';
            let liElement = document.createElement('li');
            liElement.classList.add('each-list');
            let span1Element = document.createElement('span');
            span1Element.textContent = `${make} ${model}`;
            let span2Element = document.createElement('span');
            span2Element.textContent = `${year}`;
            let span3Element = document.createElement('span');
            span3Element.textContent = `${diff}`;
            liElement.appendChild(span1Element);
            liElement.appendChild(span2Element);
            liElement.appendChild(span3Element);
            ulElement.appendChild(liElement);
            carsList.appendChild(ulElement);

            yearElement.value = document.getElementById('year');
            fuelElement.value = document.getElementById('fuel');

            totalProfit += Number(diff);
            profit.textContent = totalProfit.toFixed(2);

        })

    })

}