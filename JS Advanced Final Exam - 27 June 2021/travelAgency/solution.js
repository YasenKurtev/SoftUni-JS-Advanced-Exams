window.addEventListener('load', solution);

function solution() {

    let name = document.querySelector('#fname');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let address = document.querySelector('#address');
    let code = document.querySelector('#code');
    let submitBtn = document.querySelector('#submitBTN');
    let editBtn = document.querySelector('#editBTN');
    let continueBtn = document.querySelector('#continueBTN');
    let infoPreview = document.querySelector('#infoPreview');
    let mainDiv = document.querySelector('#block');

    let inputsArr = [name, email, phone, address, code];
    let textArr = ['Full Name:', 'Email:', 'Phone Number:', 'Address:', 'Postal Code:'];

    submitBtn.addEventListener('click', onSubmit);
    editBtn.addEventListener('click', onEdit);
    continueBtn.addEventListener('click', onContinue);

    function onSubmit(ev) {
        ev.preventDefault();

        if (name.value !== '' && email.value !== '') {
            for (let i = 0; i < inputsArr.length; i++) {
                let newLi = document.createElement('li');
                newLi.textContent = `${textArr[i]} ${inputsArr[i].value}`;
                infoPreview.appendChild(newLi);
            }

            submitBtn.disabled = true;
            editBtn.disabled = false;
            continueBtn.disabled = false;

            for (let element of inputsArr) {
                element.value = '';
            }
        }

    }

    function onEdit(ev) {
        let values = Array.from(document.querySelectorAll('li'));
        for (let i = 0; i < inputsArr.length; i++) {
            inputsArr[i].value = values[i].textContent.split(': ')[1];
        }
        for (let element of values) {
            element.remove();
        }
        submitBtn.disabled = false;
        editBtn.disabled = true;
        continueBtn.disabled = true;
    }

    function onContinue(ev) {
        mainDiv.innerHTML = '';
        let newH3 = document.createElement('h3');
        newH3.textContent = 'Thank you for your reservation!';
        mainDiv.appendChild(newH3);
    }

}