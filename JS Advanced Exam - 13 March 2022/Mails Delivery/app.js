function solve() {

    let name = document.getElementById('recipientName');
    let title = document.getElementById('title');
    let message = document.getElementById('message');
    let addBtn = document.getElementById('add');
    let resetBtn = document.getElementById('reset');
    let mailsList = document.getElementById('list');
    let sentMailsList = document.getElementsByClassName('sent-list')[0];
    let deletedMailsList = document.getElementsByClassName('delete-list')[0];

    addBtn.addEventListener('click', onAdd);
    resetBtn.addEventListener('click', onReset);

    function onAdd(ev) {
        ev.preventDefault();
        if (name.value !== '' &&
            title.value !== '' &&
            message.value !== '') {
            let newLi = document.createElement('li');
            let newH4first = document.createElement('h4');
            newH4first.textContent = `Title: ${title.value}`;
            let newH4second = document.createElement('h4');
            newH4second.textContent = `Recipient Name: ${name.value}`;
            let newSpan = document.createElement('span');
            newSpan.textContent = message.value;
            let newDiv = document.createElement('div');
            newDiv.id = 'list-action';
            let newSendBtn = document.createElement('button');
            newSendBtn.textContent = 'Send';
            newSendBtn.type = 'submit';
            newSendBtn.id = 'send';
            let newDeleteBtn = document.createElement('button');
            newDeleteBtn.textContent = 'Delete';
            newDeleteBtn.type = 'submit';
            newDeleteBtn.id = 'delete';

            newSendBtn.addEventListener('click', onSend);
            newDeleteBtn.addEventListener('click', onDelete);

            newDiv.appendChild(newSendBtn);
            newDiv.appendChild(newDeleteBtn);
            newLi.appendChild(newH4first);
            newLi.appendChild(newH4second);
            newLi.appendChild(newSpan);
            newLi.appendChild(newDiv);
            mailsList.appendChild(newLi);

            name.value = '';
            title.value = '';
            message.value = '';
        }
    }

    function onReset(ev) {
        ev.preventDefault();
        name.value = '';
        title.value = '';
        message.value = '';
    }

    function onSend(ev) {
        let parentLi = ev.target.parentElement.parentElement;
        let title = parentLi.getElementsByTagName('h4')[0];
        let name = parentLi.getElementsByTagName('h4')[1];

        let newLi = document.createElement('li');
        let newSpanFirst = document.createElement('span');
        newSpanFirst.textContent = `To: ${name.textContent.slice(16)}`;
        let newSpanSecond = document.createElement('span');
        newSpanSecond.textContent = `Title: ${title.textContent.slice(7)}`;
        let newDiv = document.createElement('div');
        newDiv.classList.add('btn');
        let newDeleteBtn = document.createElement('button');
        newDeleteBtn.textContent = 'Delete';
        newDeleteBtn.type = 'submit';
        newDeleteBtn.classList.add('delete');

        newDeleteBtn.addEventListener('click', onDelete);

        newDiv.appendChild(newDeleteBtn);
        newLi.appendChild(newSpanFirst);
        newLi.appendChild(newSpanSecond);
        newLi.appendChild(newDiv);
        sentMailsList.appendChild(newLi);

        parentLi.remove();
    }

    function onDelete(ev) {
        let parentLi = ev.target.parentElement.parentElement;
        let title;
        let name;
        let newLi = document.createElement('li');
        let newSpanFirst = document.createElement('span');
        let newSpanSecond = document.createElement('span');
        if (parentLi.parentElement.hasAttribute('id')) {
            title = parentLi.getElementsByTagName('h4')[0];
            name = parentLi.getElementsByTagName('h4')[1];
            newSpanFirst.textContent = `To: ${name.textContent.slice(16)}`;
            newSpanSecond.textContent = `Title: ${title.textContent.slice(7)}`;
        } else {
            title = parentLi.getElementsByTagName('span')[1];
            name = parentLi.getElementsByTagName('span')[0];
            newSpanFirst.textContent = `To: ${name.textContent.slice(4)}`;
            newSpanSecond.textContent = `Title: ${title.textContent.slice(7)}`;
        }

        newLi.appendChild(newSpanFirst);
        newLi.appendChild(newSpanSecond);
        deletedMailsList.appendChild(newLi);

        parentLi.remove();
    }

}

solve()