class SmartHike {

    constructor(username) {
        this.username = username;
        this.goals = {};
        this.listOfHikes = [];
        this.resources = 100;
    }

    addGoal(peak, altitude) {
        if (this.goals.hasOwnProperty(peak)) {
            return `${peak} has already been added to your goals`;
        } else {
            this.goals[peak] = altitude;
            return `You have successfully added a new goal - ${peak}`;
        }
    }

    hike(peak, time, difficultyLevel) {
        if (!this.goals.hasOwnProperty(peak)) {
            throw new Error(`${peak} is not in your current goals`);
        }
        if (this.resources === 0) {
            throw new Error("You don't have enough resources to start the hike");
        }
        let diff = this.resources - Number(time) * 10;
        if (diff < 0) {
            return "You don't have enough resources to complete the hike";
        }
        this.resources -= Number(time) * 10;
        this.listOfHikes.push({
            'peak': peak,
            'time': time,
            'difficultyLevel': difficultyLevel
        });
        return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
    }

    rest(time) {
        this.resources += Number(time) * 10;
        if (this.resources >= 100) {
            this.resources = 100;
            return `Your resources are fully recharged. Time for hiking!`;
        } else {
            return `You have rested for ${time} hours and gained ${Number(time) * 10}% resources`;
        }
    }

    showRecord(criteria) {
        if (this.listOfHikes.length === 0) {
            return `${this.username} has not done any hiking yet`;
        }
        if (criteria === 'hard') {
            let filteredHikes = this.listOfHikes.filter(x => x['difficultyLevel'] === 'hard');
            if (filteredHikes.length === 0) {
                return `${this.username} has not done any ${criteria} hiking yet`
            }
            let sortedHikes = filteredHikes.sort((a, b) => Number(a['time']) - Number(b['time']));
            return `${this.username}'s best ${criteria} hike is ${sortedHikes[0]['peak']} peak, for ${sortedHikes[0]['time']} hours`;
        } else if (criteria === 'easy') {
            let filteredHikes = this.listOfHikes.filter(x => x['difficultyLevel'] === 'easy');
            if (filteredHikes.length === 0) {
                return `${this.username} has not done any ${criteria} hiking yet`
            }
            let sortedHikes = filteredHikes.sort((a, b) => Number(a['time']) - Number(b['time']));
            return `${this.username}'s best ${criteria} hike is ${sortedHikes[0]['peak']} peak, for ${sortedHikes[0]['time']} hours`;
        } else if (criteria === 'all') {
            let result = ['All hiking records:'];
            for (let hike of this.listOfHikes) {
                result.push(`${this.username} hiked ${hike['peak']} for ${hike['time']} hours`);
            }
            return result.join('\n');
        }
    }

}

const user = new SmartHike('Vili');
user.addGoal('Musala', 2925);
user.hike('Musala', 8, 'hard');
console.log(user.showRecord('easy'));
user.addGoal('Vihren', 2914);
user.hike('Vihren', 4, 'hard');
console.log(user.showRecord('hard'));
user.addGoal('Rui', 1706);
user.hike('Rui', 3, 'easy');
console.log(user.showRecord('all'));




