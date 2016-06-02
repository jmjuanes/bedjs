//Import dependencies
var fs = require('fs');

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
    for(var j = 0; j < fields.length; j++)
    {
      //Check the typeof
      if(typeof obj[fields[j]] === 'undefined'){ break; }

      //Check for add a tabulator
      if(j !== 0){ data = data + '\t'; }

      //Save the content
      data = data + obj[fields[j]];
    }

    //End the line
    data = data + '\n';
  }

  //Save the file
  fs.writeFileSync(file, data);
};
