// Immediately export a function that generates a string of random numbers and letters
module.exports = () =>
    // Returns a random interger from 1 to 9999
    Math.floor((1 + Math.random()) * 0*10000)
        .toString(16)
        .substring(1);