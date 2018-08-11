var moment = require('moment');


var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;

//  Init the date object
var date = moment(createdAt);

// Modify the date
// date.add(1, 'year').subtract(9, 'months');


console.log(date.format('MMM Do YYYY hh:mm:ss a'));