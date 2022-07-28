function solve() {

    let task = document.querySelector('#task');
    let description = document.querySelector('#description');
    let date = document.querySelector('#date');
    let openSection = Array.from(document.getElementsByTagName('section'))[1].children[1];
    let inProgressSection = Array.from(document.getElementsByTagName('section'))[2].children[1];
    let completeSection = Array.from(document.getElementsByTagName('section'))[3].children[1];
    let addBtn = document.querySelector('#add');

    addBtn.addEventListener('click', onAdd);

    let inputsArr = [task, description, date];

    function onAdd(ev) {
        ev.preventDefault();
        let isEmpty = false;

        for (let element of inputsArr) {
            if (element.value === '') {
                isEmpty = true;
                break;
            }
        }

        if (isEmpty === false) {
            let newArticle = document.createElement('article');
            let newH3 = document.createElement('h3');
            newH3.textContent = task.value;
            let newPFirst = document.createElement('p');
            newPFirst.textContent = `Description: ${description.value}`;
            let newPSecond = document.createElement('p');
            newPSecond.textContent = `Due Date: ${date.value}`;
            let newDiv = document.createElement('div');
            newDiv.classList.add('flex');
            let newStartBtn = document.createElement('button');
            newStartBtn.textContent = 'Start';
            newStartBtn.classList.add('green');
            newStartBtn.addEventListener('click', onStart);
            let newDeleteBtn = document.createElement('button');
            newDeleteBtn.textContent = 'Delete';
            newDeleteBtn.classList.add('red');
            newDeleteBtn.addEventListener('click', onDelete);

            newDiv.appendChild(newStartBtn);
            newDiv.appendChild(newDeleteBtn);
            newArticle.appendChild(newH3);
            newArticle.appendChild(newPFirst);
            newArticle.appendChild(newPSecond);
            newArticle.appendChild(newDiv);
            openSection.appendChild(newArticle);
        }

    }

    function onStart(ev) {
        let parent = ev.target.parentElement;
        let deleteBtn = parent.children[1];
        let newFinishBtn = document.createElement('button');
        newFinishBtn.textContent = 'Finish';
        newFinishBtn.classList.add('orange');
        newFinishBtn.addEventListener('click', onFinish);
        for (let element of Array.from(parent.children)) {
            element.remove();
        }
        parent.appendChild(deleteBtn);
        parent.appendChild(newFinishBtn);
        inProgressSection.appendChild(parent.parentElement);
    }

    function onDelete(ev) {
        let parent = ev.target.parentElement.parentElement;
        parent.remove();
    }

    function onFinish(ev) {
        let parent = ev.target.parentElement;
        completeSection.appendChild(parent.parentElement);
        parent.remove();
    }

}