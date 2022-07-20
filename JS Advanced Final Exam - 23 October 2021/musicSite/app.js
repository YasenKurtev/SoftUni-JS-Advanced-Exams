window.addEventListener('load', solve);

function solve() {

    let genre = document.querySelector('#genre');
    let name = document.querySelector('#name');
    let author = document.querySelector('#author');
    let date = document.querySelector('#date');
    let addBtn = document.querySelector('#add-btn');
    let songsCollection = document.querySelector('div.all-hits-container');
    let savedHits = document.querySelector('div.saved-container');
    let likes = Array.from(document.getElementsByTagName('p'))[1];

    let likesCount = 0;

    addBtn.addEventListener('click', onAdd);

    let inputArr = [genre, name, author, date];

    function onAdd(ev) {
        ev.preventDefault();
        let isEmpty = false;

        for (let element of inputArr) {
            if (element.value === '') {
                isEmpty = true;
                break;
            }
        }

        if (isEmpty === false) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('hits-info');
            let newImg = document.createElement('img');
            newImg.src = './static/img/img.png';
            let newH2Genre = document.createElement('h2');
            newH2Genre.textContent = `Genre: ${genre.value}`;
            let newH2Name = document.createElement('h2');
            newH2Name.textContent = `Name: ${name.value}`;
            let newH2Author = document.createElement('h2');
            newH2Author.textContent = `Author: ${author.value}`;
            let newH3Date = document.createElement('h3');
            newH3Date.textContent = `Date: ${date.value}`;
            let newBtnSave = document.createElement('button');
            newBtnSave.textContent = 'Save song';
            newBtnSave.classList.add('save-btn');
            let newBtnLike = document.createElement('button');
            newBtnLike.textContent = 'Like song';
            newBtnLike.classList.add('like-btn');
            let newBtnDelete = document.createElement('button');
            newBtnDelete.textContent = 'Delete';
            newBtnDelete.classList.add('delete-btn');

            newBtnSave.addEventListener('click', onSave);
            newBtnLike.addEventListener('click', onLike);
            newBtnDelete.addEventListener('click', onDelete);

            newDiv.appendChild(newImg);
            newDiv.appendChild(newH2Genre);
            newDiv.appendChild(newH2Name);
            newDiv.appendChild(newH2Author);
            newDiv.appendChild(newH3Date);
            newDiv.appendChild(newBtnSave);
            newDiv.appendChild(newBtnLike);
            newDiv.appendChild(newBtnDelete);
            songsCollection.appendChild(newDiv);

            for (let element of inputArr) {
                element.value = '';
            }
        }

        function onSave(ev) {
            let parent = ev.target.parentElement;
            let saveBtn = parent.getElementsByTagName('button')[0];
            let likeBtn = parent.getElementsByTagName('button')[1];
            savedHits.appendChild(parent);
            saveBtn.remove();
            likeBtn.remove();
        }

        function onLike(ev) {
            likesCount++;
            likes.textContent = `Total Likes: ${likesCount}`;
            ev.target.disabled = true;
        }

        function onDelete(ev) {
            ev.target.parentElement.remove();
        }

    }

}