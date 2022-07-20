class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = { 'child': 150, "student": 300, 'collegian': 500 };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!this.priceForTheCamp.hasOwnProperty(condition)) {
            throw new Error('Unsuccessful registration at the camp.');
        }
        for (let person of this.listOfParticipants) {
            if (person['name'] === name) {
                return `The ${name} is already registered at the camp.`;
            }
        }
        if (this.priceForTheCamp[condition] > money) {
            return 'The money is not enough to pay the stay at the camp.';
        }
        this.listOfParticipants.push({
            name: name,
            condition: condition,
            power: 100,
            wins: 0
        })

        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        let isFound = false;
        let index;

        for (let person of this.listOfParticipants) {
            if (person['name'] === name) {
                isFound = true;
                index = this.listOfParticipants.indexOf(person);
                break;
            }
        }

        if (isFound === false) {
            throw new Error(`The ${name} is not registered in the camp.`);
        } else {
            this.listOfParticipants.splice(index, 1);
            return `The ${name} removed successfully.`;
        }
    }

    timeToPlay(type, participant1, participant2) {
        if (type === 'Battleship') {
            let isFound = false;
            for (let person of this.listOfParticipants) {
                if (person['name'] === participant1) {
                    person['power'] += 20;
                    isFound = true;
                    return `The ${participant1} successfully completed the game ${type}.`;
                }
            }
            if (isFound === false) {
                throw new Error(`Invalid entered name/s.`);
            }
        }

        if (type === 'WaterBalloonFights') {
            let index1;
            let index2;
            let isFound1 = false;
            let isFound2 = false;
            let condition1;
            let condition2;
            for (let person of this.listOfParticipants) {
                if (person['name'] === participant1) {
                    index1 = this.listOfParticipants.indexOf(person);
                    isFound1 = true;
                    condition1 = person['condition'];
                }
                if (person['name'] === participant2) {
                    index2 = this.listOfParticipants.indexOf(person);
                    isFound2 = true;
                    condition2 = person['condition'];
                }
            }
            if (isFound1 === false || isFound2 === false) {
                throw new Error(`Invalid entered name/s.`);
            }
            if (condition1 !== condition2) {
                throw new Error('Choose players with equal condition.');
            }
            if (this.listOfParticipants[index1]['power'] > this.listOfParticipants[index2]['power']) {
                this.listOfParticipants[index1]['wins']++;
                return `The ${participant1} is winner in the game ${type}.`;
            } else if (this.listOfParticipants[index1]['power'] < this.listOfParticipants[index2]['power']) {
                this.listOfParticipants[index2]['wins']++;
                return `The ${participant2} is winner in the game ${type}.`;
            } else {
                return `There is no winner.`;
            }
        }
    }

    toString() {
        let result = [`${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`];

        let sorted = this.listOfParticipants.sort((a, b) => b['wins'] - a['wins']);

        for (let person of sorted) {
            result.push(`${person['name']} - ${person['condition']} - ${person['power']} - ${person['wins']}`);
        }

        return result.join('\n');
    }

}