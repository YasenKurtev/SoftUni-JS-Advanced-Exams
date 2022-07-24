class Story {

    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
        this.commentId = 1;
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length === 1) {
            return `${this._likes[0]} likes this story!`;
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this story!`;
        }
    }

    like(username) {
        if (this._likes.includes(username)) {
            throw new Error('You can\'t like the same story twice!');
        }
        if (this.creator === username) {
            throw new Error('You can\'t like your own story!');
        }
        this._likes.push(username);

        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        if (!this._likes.includes(username)) {
            throw new Error('You can\'t dislike this story!');
        } else {
            let index = this._likes.indexOf(username);
            this._likes.splice(index, 1);

            return `${username} disliked ${this.title}`;
        }
    }

    comment(username, content, id) {
        let isFound = false;
        let commentIndex;

        for (let comment of this._comments) {
            if (comment['Id'] === id) {
                isFound = true;
                commentIndex = this._comments.indexOf(comment);
                break;
            }
        }

        if (id === undefined) {
            isFound = false;
        }

        if (isFound === false) {
            this._comments.push({
                Id: this.commentId,
                Username: username,
                Content: content,
                Replies: []
            })

            this.commentId++;

            return `${username} commented on ${this.title}`;
        } else {
            let replies = this._comments[commentIndex]['Replies'];
            let currentReplyId;

            if (replies.length === 0) {
                currentReplyId = Number(this._comments[commentIndex]['Id']) + 0.1;
            } else {
                let lastReplyId = replies[replies.length - 1]['Id'];
                currentReplyId = (Number(lastReplyId) + Number(0.1)).toFixed(1);
            }
            this._comments[commentIndex]['Replies'].push({
                Id: currentReplyId,
                Username: username,
                Content: content
            })

            return 'You replied successfully';
        }
    }

    toString(sortingType) {
        if (sortingType === 'asc') {
            this._comments.sort((a, b) => a['Id'] - b['Id']);
            for (let comment of this._comments) {
                comment['Replies'].sort((a, b) => a['Id'] - b['Id']);
            }
        } else if (sortingType === 'desc') {
            this._comments.sort((a, b) => b['Id'] - a['Id']);
            for (let comment of this._comments) {
                comment['Replies'].sort((a, b) => b['Id'] - a['Id']);
            }
        } else if (sortingType === 'username') {
            this._comments.sort((a, b) => a['Username'].localeCompare(b['Username']));
            for (let comment of this._comments) {
                comment['Replies'].sort((a, b) => a['Username'].localeCompare(b['Username']));
            }
        }

        let result = [`Title: ${this.title}`, `Creator: ${this.creator}`, `Likes: ${this._likes.length}`, `Comments:`];

        for (let comment of this._comments) {
            result.push(`-- ${comment['Id']}. ${comment['Username']}: ${comment['Content']}`);
            for (let reply of comment['Replies']) {
                result.push(`--- ${reply['Id']}. ${reply['Username']}: ${reply['Content']}`);
            }
        }

        return result.join('\n');
    }

}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));