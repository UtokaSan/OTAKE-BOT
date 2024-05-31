class Card {
    constructor(name, attack, defense, hp, attackProbability) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.attackProbability = attackProbability;
    }

    attackSuccess() {
        return Math.random() < this.attackProbability;
    }

    takeDamage(damage) {
        this.hp -= damage;
    }
}
module.exports = {
    Card,
}