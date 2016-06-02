//Import dependencies
var fs = require('fs');

//Read a bed file
module.exports = function(file)
{
  //Output object
  var out = [];

  //Read the file syncr
  var bed = fs.readFileSync(file, 'utf8');

  //Replace the \r
  bed = bed.replace(/\r/g, '');

  //Split the file by line
  bed = bed.split('\n');

  //Read all items
  for(var i = 0; i < bed.length; i++)
  {
    //Create the new object
    var obj = {};

    //Get the line
    var line = bed[i];

    //Check the line
    if(line === '' || line === ' '){ continue; }

    //Split the line by tab
    line = line.split('\t');

    //Read all
    for(var j = 0; j < line.length; j++)
    {
      //Check for blank
      if(line[j] === ''){ break; }

      //Add the item
      obj[fields[j]] = line[j];
    }

    //Change the start string to int
    if(typeof obj.start !== 'undefined'){ obj.start = parseInt(obj.start); };

    //Change the end string to int
    if(typeof obj.end !== 'undefined'){ obj.end = parseInt(obj.end); };

    //Change the score
    if(typeof obj.score !== 'undefined'){ obj.score = parseInt(obj.score); };

    //Change the thickStart
    if(typeof obj.thickStart !== 'undefined'){ obj.thickStart = parseInt(obj.thickStart); }

    //Change the thickEnd
    if(typeof obj.thickEnd !== 'undefined'){ obj.thickEnd = parseInt(obj.thickEnd); }

    //Change blockCount
    if(typeof obj.blockCount !== 'undefined'){ obj.blockCount = parseInt(obj.blockCount); }

    //Push the new object
    out.push(obj);
  }

  //Return the output
  return out;
};
