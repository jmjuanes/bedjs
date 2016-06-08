//Import dependencies
var fs = require('fs');

//Import the bed specification
var BED = require('../config/bed.json');

//Module to write a bed file
module.exports = function(file, bed)
{
  //Initialize the data string
  var data = '';

  //Read all the bed objects
  for(var i = 0; i < bed.length; i++)
  {
    //Get the object
    var obj = bed[i];

    //Save all the content
    for(var j = 0; j < BED.length; j++)
    {
      //Get the field
      var field = BED[j];

      //Check the typeof
      if(typeof obj[field.id] === 'undefined'){ break; }

      //Check for add a tabulator
      if(j !== 0){ data = data + '\t'; }

      //Save the content
      data = data + obj[field.id];
    }

    //End the line
    data = data + '\n';
  }

  //Save the file
  fs.writeFileSync(file, data);
};
