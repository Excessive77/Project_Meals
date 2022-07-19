const sorting = arrRatings => {
    let ratings = {};

    for (let i = 1; i <= 6; i++) {
        if (i === 6) {
            console.log(ratings);
        }
        for (let j = 0; j < arrRatings.length; j++) {
            if (arrRatings[j] === i) {
                ratings[i] = ratings[i]
                    ? (ratings[i] = ratings[i] + 1)
                    : (ratings[i] = 1);
            }
        }
    }

    let mathRatings = 0;
    let forRatings = 0;

    for (const rating in ratings) {
        const arrKeys = Object.keys(ratings);

        if (rating < 6) {
            mathRatings = mathRatings + arrKeys[rating] * ratings[rating];
            forRatings = forRatings + ratings[rating];
        }
    }

    const average = mathRatings / forRatings;

    return average;
};

module.exports = { sorting };
