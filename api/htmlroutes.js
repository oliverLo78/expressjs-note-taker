const router = require('router').Router();
const htmlroutes = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Set the port 
const PORT = 3001;


// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 * Function to write data to the JSON file given a destination and some content
 * @param {string} destination The file you want to write to.
 * @param {object} content The content you want to write to the file
 * @returns {void} Nothing
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
}
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 3), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

