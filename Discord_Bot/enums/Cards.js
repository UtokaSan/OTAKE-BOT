const Character = Object.freeze( {
    common : {
        attack: Math.floor(Math.random() * (14 - 1) + 1),
        pv: Math.floor(Math.random() * (14 - 1) + 1),
        price: Math.floor(Math.random() * (80 - 40) + 40)
    },
    legendary : {
        attack: Math.floor(Math.random() * (20 - 14) + 14),
        pv: Math.floor(Math.random() * (20 - 14) + 14),
        price: Math.floor(Math.random() * (1000 - 800) + 800)
    }
});

module.exports = {
    Character,
}