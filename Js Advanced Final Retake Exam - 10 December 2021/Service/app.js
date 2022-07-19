window.addEventListener('load', solve);

function solve() {

    let productType = document.querySelector('#type-product');
    let description = document.querySelector('#description');
    let name = document.querySelector('#client-name');
    let phone = document.querySelector('#client-phone');
    let receivedOrders = document.querySelector('#received-orders');
    let completedOrders = document.querySelector('#completed-orders');
    let sendBtn = Array.from(document.getElementsByTagName('button'))[0];
    let clearBtn = Array.from(document.getElementsByTagName('button'))[1];

    let inputsArr = [description, name, phone];

    sendBtn.addEventListener('click', onSend);
    clearBtn.addEventListener('click', onClear);

    function onSend(ev) {
        ev.preventDefault();
        let isEmpty = false;

        for (let element of inputsArr) {
            if (element.value === '') {
                isEmpty = true;
                break;
            }
        }

        if (isEmpty === false) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('container');
            let newH2 = document.createElement('h2');
            newH2.textContent = `Product type for repair: ${productType.value}`;
            let newH3 = document.createElement('h3');
            newH3.textContent = `Client information: ${name.value}, ${phone.value}`;
            let newH4 = document.createElement('h4');
            newH4.textContent = `Description of the problem: ${description.value}`;
            let newStartBtn = document.createElement('button');
            newStartBtn.textContent = 'Start repair';
            newStartBtn.classList.add('start-btn');
            newStartBtn.addEventListener('click', onStart);
            let newFinishBtn = document.createElement('button');
            newFinishBtn.textContent = 'Finish repair';
            newFinishBtn.classList.add('finish-btn');
            newFinishBtn.disabled = true;
            newFinishBtn.addEventListener('click', onFinish);

            newDiv.appendChild(newH2);
            newDiv.appendChild(newH3);
            newDiv.appendChild(newH4);
            newDiv.appendChild(newStartBtn);
            newDiv.appendChild(newFinishBtn);
            receivedOrders.appendChild(newDiv);

            for (let element of inputsArr) {
                element.value = '';
            }

        }

    }

    function onStart(ev) {
        let parent = ev.target.parentElement;
        let startBtn = Array.from(parent.getElementsByTagName('button'))[0];
        let finishBtn = Array.from(parent.getElementsByTagName('button'))[1];
        startBtn.disabled = true;
        finishBtn.disabled = false;
    }

    function onFinish(ev) {
        let parent = ev.target.parentElement;
        let startBtn = Array.from(parent.getElementsByTagName('button'))[0];
        let finishBtn = Array.from(parent.getElementsByTagName('button'))[1];
        startBtn.remove();
        finishBtn.remove();
        completedOrders.appendChild(parent);
    }

    function onClear(ev) {
        let parent = ev.target.parentElement;
        let orders = Array.from(parent.querySelectorAll('div.container'));
        for (let order of orders) {
            order.remove();
        }
    }

}