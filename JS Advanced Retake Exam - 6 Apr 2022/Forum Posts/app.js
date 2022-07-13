window.addEventListener("load", solve);

function solve() {

    let titleInput = document.getElementById('post-title');
    let categoryInput = document.getElementById('post-category');
    let contentInput = document.getElementById('post-content');
    let reviewList = document.getElementById('review-list');
    let publishedList = document.getElementById('published-list');
    let publishBtn = document.getElementById('publish-btn');
    let clearBtn = document.getElementById('clear-btn');

    publishBtn.addEventListener('click', onPublish);
    clearBtn.addEventListener('click', onClear);

    function onPublish(ev) {
        if (titleInput.vaue !== '' &&
            categoryInput.value !== '' &&
            contentInput.value !== '') {

            let newLi = document.createElement('li');
            newLi.classList.add('rpost');
            let newArticle = document.createElement('article');
            let newH4 = document.createElement('h4');
            newH4.textContent = titleInput.value;
            let newP1 = document.createElement('p');
            newP1.textContent = `Category: ${categoryInput.value}`;
            let newP2 = document.createElement('p');
            newP2.textContent = `Content: ${contentInput.value}`;
            let newEditBtn = document.createElement('button');
            newEditBtn.textContent = 'Edit';
            newEditBtn.classList.add('action-btn', 'edit');
            let newApproveBtn = document.createElement('button');
            newApproveBtn.textContent = 'Approve';
            newApproveBtn.classList.add('action-btn', 'approve');

            newEditBtn.addEventListener('click', onEdit);
            newApproveBtn.addEventListener('click', onApprove);

            newArticle.appendChild(newH4);
            newArticle.appendChild(newP1);
            newArticle.appendChild(newP2);
            newLi.appendChild(newArticle);
            newLi.appendChild(newEditBtn);
            newLi.appendChild(newApproveBtn);
            reviewList.appendChild(newLi);

            titleInput.value = '';
            categoryInput.value = '';
            contentInput.value = '';
        }

    }

    function onEdit(ev) {
        let title = ev.target.parentElement.getElementsByTagName('h4')[0];
        let category = ev.target.parentElement.getElementsByTagName('p')[0];
        let content = ev.target.parentElement.getElementsByTagName('p')[1];
        titleInput.value = title.textContent;
        categoryInput.value = category.textContent.slice(10);
        contentInput.value = content.textContent.slice(9);
        ev.target.parentElement.remove();
    }

    function onApprove(ev) {
        let edinBtn = ev.target.parentElement.getElementsByTagName('button')[0];
        let approveBtn = ev.target.parentElement.getElementsByTagName('button')[1];
        publishedList.appendChild(ev.target.parentElement);
        edinBtn.remove();
        approveBtn.remove();
    }

    function onClear(ev) {
        let listElements = publishedList.children;
        while (listElements.length > 0) {
            listElements[0].remove();
        }
    }

}