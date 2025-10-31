// utils/validationHelper.js

function validateRating(pRating) {
    return pRating >= 1 && pRating <= 5;
}

module.exports = {
    validateRating
};
