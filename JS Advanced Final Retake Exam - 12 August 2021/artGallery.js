class ArtGallery {

    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = { 'picture': 200, 'photo': 50, 'item': 250 };
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle(model, name, quantity) {
        if (!this.possibleArticles.hasOwnProperty(model.toLowerCase())) {
            throw new Error('This article model is not included in this gallery!');
        }

        let isFound = false;
        let index;

        for (let element of this.listOfArticles) {
            if (element['name'] === name && element['model'] === model.toLowerCase()) {
                index = this.listOfArticles.indexOf(element);
                isFound = true;
                break;
            }
        }

        if (isFound === true) {
            this.listOfArticles[index]['quantity'] += Number(quantity);
        } else {
            this.listOfArticles.push({
                model: model,
                name: name,
                quantity: quantity
            })
        }

        return `Successfully added article ${name} with a new quantity- ${quantity}.`;
    }

    inviteGuest(name, personality) {
        let isFound = false;

        for (let element of this.guests) {
            if (element['name'] === name) {
                isFound = true;
                break;
            }
        }

        if (isFound === true) {
            throw new Error(`${name} has already been invited.`);
        } else {
            let startPoints;

            if (personality === 'Vip') {
                startPoints = 500;
            } else if (personality === 'Middle') {
                startPoints = 250;
            } else {
                startPoints = 50;
            }

            this.guests.push({
                name: name,
                points: startPoints,
                purchaseArticle: 0
            })

            return `You have successfully invited ${name}!`;
        }
    }

    buyArticle(model, articleName, guestName) {
        let isFoundArticle = false;
        let indexArticle;

        for (let element of this.listOfArticles) {
            if (element['name'] === articleName && element['model'].toLowerCase() === model) {
                indexArticle = this.listOfArticles.indexOf(element);
                isFoundArticle = true;
                break;
            }
        }

        if (isFoundArticle === false) {
            throw new Error('This article is not found.');
        }
        if (this.listOfArticles[indexArticle]['quantity'] === 0) {
            return `The ${this.listOfArticles[indexArticle]['name']} is not available.`;
        }

        let isFoundGuest = false;
        let indexGuest;

        for (let element of this.guests) {
            if (element['name'] === guestName) {
                indexGuest = this.guests.indexOf(element);
                isFoundGuest = true;
                break;
            }
        }

        if (isFoundGuest === false) {
            return 'This guest is not invited.';
        } else {
            let articleType = this.listOfArticles[indexArticle]['model'].toLowerCase();

            if (this.guests[indexGuest]['points'] >= this.possibleArticles[articleType]) {
                this.guests[indexGuest]['points'] -= this.possibleArticles[articleType];
                this.guests[indexGuest]['purchaseArticle']++;
                this.listOfArticles[indexArticle]['quantity']--;
                return `${guestName} successfully purchased the article worth ${this.possibleArticles[articleType]} points.`;
            } else {
                return `You need to more points to purchase the article.`;
            }
        }
    }

    showGalleryInfo(criteria) {
        let result = [];

        if (criteria === 'article') {
            result.push('Articles information:');
            for (let element of this.listOfArticles) {
                result.push(`${element['model'].toLowerCase()} - ${element['name']} - ${element['quantity']}`);
            }
        } else if (criteria === 'guest') {
            result.push('Guests information:');
            for (let element of this.guests) {
                result.push(`${element['name']} - ${element['purchaseArticle']}`);
            }
        }

        return result.join('\n');
    }

}

const artGallery = new ArtGallery('Curtis Mayfield');
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
console.log(artGallery.buyArticle('picture', 'Mona Liza', 'John'));
console.log(artGallery.buyArticle('item', 'Ancient vase', 'Peter'));
console.log(artGallery.buyArticle('item', 'Mona Liza', 'John'));


