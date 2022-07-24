function solve() {

    let creator = document.querySelector('#creator');
    let title = document.querySelector('#title');
    let category = document.querySelector('#category');
    let content = document.querySelector('#content');
    let postsSection = Array.from(document.getElementsByTagName('section'))[1];
    let archiveList = Array.from(document.getElementsByTagName('ol'))[0];
    let createBtn = Array.from(document.getElementsByTagName('button'))[0];

    createBtn.addEventListener('click', onCreate);

    let inputsArr = [creator, title, category, content];

    let allLiArr = [];

    function onCreate(ev) {
        ev.preventDefault();

        let newArticle = document.createElement('article');
        let newH1 = document.createElement('h1');
        newH1.textContent = title.value;
        let newP1 = document.createElement('p');
        newP1.textContent = 'Category: ';
        let newStrong1 = document.createElement('strong');
        newStrong1.textContent = category.value;
        newP1.appendChild(newStrong1);
        let newP2 = document.createElement('p');
        newP2.textContent = 'Creator: ';
        let newStrong2 = document.createElement('strong');
        newStrong2.textContent = creator.value;
        newP2.appendChild(newStrong2);
        let newP3 = document.createElement('p');
        newP3.textContent = content.value;
        let newDiv = document.createElement('div');
        newDiv.className = 'buttons';
        let newDeleteBtn = document.createElement('button');
        newDeleteBtn.textContent = 'Delete';
        newDeleteBtn.className = 'btn delete';
        newDeleteBtn.addEventListener('click', onDelete);
        let newArchiveBtn = document.createElement('button');
        newArchiveBtn.textContent = 'Archive';
        newArchiveBtn.className = 'btn archive';
        newArchiveBtn.addEventListener('click', onArchive);
        newDiv.appendChild(newDeleteBtn);
        newDiv.appendChild(newArchiveBtn);

        newArticle.appendChild(newH1);
        newArticle.appendChild(newP1);
        newArticle.appendChild(newP2);
        newArticle.appendChild(newP3);
        newArticle.appendChild(newDiv);
        postsSection.appendChild(newArticle);

        for (let element of inputsArr) {
            element.value = '';
        }
    }

    function onArchive(ev) {
        let parent = ev.target.parentElement.parentElement;
        let title = Array.from(parent.getElementsByTagName('h1'))[0];
        let newLi = document.createElement('li');
        newLi.textContent = title.textContent;
        allLiArr.push(newLi);
        allLiArr.sort((a, b) => a.textContent.localeCompare(b.textContent));
        archiveList.innerHTML = '';
        for (let element of allLiArr) {
            archiveList.appendChild(element);
        }
        parent.remove();
    }

    function onDelete(ev) {
        let parent = ev.target.parentElement.parentElement;
        parent.remove();
    }

}