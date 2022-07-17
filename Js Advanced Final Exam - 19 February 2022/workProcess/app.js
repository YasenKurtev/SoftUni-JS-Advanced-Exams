function solve() {

    let firstName = document.querySelector('#fname');
    let lastName = document.querySelector('#lname');
    let email = document.querySelector('#email');
    let birthDate = document.querySelector('#birth');
    let position = document.querySelector('#position');
    let salary = document.querySelector('#salary');
    let hireBtn = document.querySelector('#add-worker');
    let table = document.querySelector('#tbody');
    let budget = document.querySelector('#sum');

    let salarySum = 0;

    let infoArr = [firstName, lastName, email, birthDate, position, salary];

    hireBtn.addEventListener('click', onHire);

    function onHire(ev) {
        ev.preventDefault();
        let isEmpty = false;

        for (let element of infoArr) {
            if (element.value === '') {
                isEmpty = true;
                break;
            }
        }

        if (isEmpty === false) {
            let newTr = document.createElement('tr');
            let newFiredBtn = document.createElement('button');
            newFiredBtn.classList.add('fired');
            newFiredBtn.textContent = 'Fired';
            newFiredBtn.addEventListener('click', onFire);
            let newEditBtn = document.createElement('button');
            newEditBtn.classList.add('edit');
            newEditBtn.textContent = 'Edit';
            newEditBtn.addEventListener('click', onEdit);

            salarySum += Number(salary.value);

            for (let element of infoArr) {
                let newTd = document.createElement('td');
                newTd.textContent = element.value;
                newTr.appendChild(newTd);
                element.value = '';
            }

            let newTd = document.createElement('td');
            newTd.appendChild(newFiredBtn);
            newTd.appendChild(newEditBtn);
            newTr.appendChild(newTd);
            table.appendChild(newTr);

            budget.textContent = salarySum.toFixed(2);
        }

    }

    function onFire(ev) {
        let parent = ev.target.parentElement.parentElement;
        let salary = Array.from(parent.getElementsByTagName('td'))[5];
        salarySum -= Number(salary.textContent);
        budget.textContent = salarySum.toFixed(2);
        parent.remove();
    }

    function onEdit(ev) {
        let parent = ev.target.parentElement.parentElement;
        let currentTds = Array.from(parent.getElementsByTagName('td'));
        currentTds.pop();
        for (let i = 0; i < currentTds.length; i++) {
            infoArr[i].value = currentTds[i].textContent;
        }
        salarySum -= Number(currentTds[5].textContent);
        budget.textContent = salarySum.toFixed(2);
        parent.remove();
    }

}

solve()