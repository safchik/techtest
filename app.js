const fs = require('fs');

function loadData() {
    const jsonData = fs.readFileSync('./Data/Students/students.json', 'utf8');
    return JSON.parse(jsonData);
}


const data = loadData();
console.log(data);

