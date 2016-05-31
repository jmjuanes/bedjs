//Import bedJS
var bedJS = require('../index.js');

//Read the test file
var bed = bedJS.Read('./test.bed');

//Show the bed content
console.log('Bed in JSON:');
console.log(bed);

//Group the bed content by name
var group1 = bedJS.GroupByName(bed);

//Show the group
console.log('BED in groups: (1)');
console.log(group1);

//Save the group to a new file
bedJS.Write('./group.bed', group1);
