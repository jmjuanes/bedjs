//Import dependencies
var fs = require('fs');

//Import the bed specification
var BED = require('../bed.json');

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
    //Line number
    var ln = i + 1;

    //Create the new object
    var obj = {};

    //Get the line
    var line = bed[i];

    //Check the line
    if(line === '' || line === ' '){ continue; }

    //Split the line by tab
    line = line.split('\t');

    //Check the line length
    if(line.length < 3)
    {
      //Show error
      console.log('ERROR: invalid line ' + ln + ' of your bed file. Skipping.');

      //Continue
      continue;
    }

    //Read all
    for(var j = 0; j < line.length; j++)
    {
      //Check for blank
      if(line[j] === ''){ break; }

      //Get the bed field
      var field = BED[j];

      //Add the item
      obj[field.id] = line[j];
    }

    //Change the start string to int
    obj.start = parseInt(obj.start);

    //Change the end string to int
    obj.end = parseInt(obj.end);

    //Check for negative values
    if(obj.end < 0 || obj.start < 0)
    {
      //Show error
      console.log('ERROR: negative regions are unsoported (at line ' + ln + ' of your bed file). Skipping region.');

      //Next region
      continue;
    }

    //Check the start and end position
    if(obj.end < obj.start)
    {
      //Show warning
      console.log('WARNING: end < start at line ' + ln + ' of your BED file. Inverting the positions...');

      //Save the start
      var aux = obj.start;

      //Save the new start
      obj.start = obj.end;

      //Save the new end
      obj.end = aux;
    }

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
