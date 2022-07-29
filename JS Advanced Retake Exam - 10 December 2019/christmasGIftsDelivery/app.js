function solution() {

    let input = Array.from(document.getElementsByTagName('input'))[0];
    let listOfGifts = Array.from(document.getElementsByTagName('ul'))[0];
    let sentGifts = Array.from(document.getElementsByTagName('ul'))[1];
    let discardedGifts = Array.from(document.getElementsByTagName('ul'))[2];
    let addBtn = Array.from(document.getElementsByTagName('button'))[0];

    addBtn.addEventListener('click', onAdd);

    let giftsArr = [];

    function onAdd(ev) {
        let newLi = document.createElement('li');
        newLi.textContent = `${input.value}`;
        newLi.classList.add('gift');
        let newSendBtn = document.createElement('button');
        newSendBtn.textContent = 'Send';
        newSendBtn.classList.add('sendButton');
        newSendBtn.addEventListener('click', onSend);
        let newDiscardBtn = document.createElement('button');
        newDiscardBtn.textContent = 'Discard';
        newDiscardBtn.classList.add('discardButton');
        newDiscardBtn.addEventListener('click', onDiscard);

        newLi.appendChild(newSendBtn);
        newLi.appendChild(newDiscardBtn);

        giftsArr.push(newLi);

        giftsArr.sort((a, b) => a.textContent.localeCompare(b.textContent));

        for (let element of giftsArr) {
            listOfGifts.appendChild(element);
        }

        input.value = '';
    }

    function onSend(ev) {
        let currentLi = ev.target.parentElement;
        let index = giftsArr.indexOf(currentLi);
        giftsArr.splice(index, 1);
        for (let child of Array.from(currentLi.children)) {
            child.remove();
        }
        sentGifts.appendChild(currentLi);
    }

    function onDiscard(ev) {
        let currentLi = ev.target.parentElement;
        let index = giftsArr.indexOf(currentLi);
        giftsArr.splice(index, 1);
        for (let child of Array.from(currentLi.children)) {
            child.remove();
        }
        discardedGifts.appendChild(currentLi);
    }

}