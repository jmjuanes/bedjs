//Import dependencies
var fs = require('fs');

//Import the bed specification
var BED = require('../bed.json');

//Module to write a bed file
module.exports = function(file, bed)
{
  //Initialize the file
  fs.writeFileSync(file, '', 'utf8');

  //Read all the bed objects
  for(var i = 0; i < bed.length; i++)
  {
    //Initialize the line
    var line = '';

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
      if(j !== 0){ line = line + '\t'; }

      //Save the content
      line = line + obj[field.id];
    }

    //Save the line to the file
    fs.appendFileSync(file, line + '\n', 'utf8');
  }

  //Exit
  return;
};
