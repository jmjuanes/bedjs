//Import dependencies
var fs = require('fs');
var readl = require('readl');
var pstat = require('pstat');

//Import the bed specification
var BED = require('../bed.json');

//Read a bed file
module.exports = function(file, opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Check the max fields option
  opt.maxFields = (typeof opt.maxFields === 'undefined') ? BED.length : Math.max(opt.maxFields, 3);

  //Check if file exists
  if(pstat.isFileSync(file) === false){ return []; }

  //Output array
  var out = [];

  //Read the bed file
  readl(file, { encoding: 'utf8' }, function(line, count)
  {
    //Check the line
    if(line.replace(/\s/g, '') === ''){ return true; }

    //Create the new object
    var obj = {};

    //Split the line by tab
    line = line.split('\t');

    //Check the line length
    if(line.length < 3)
    {
      //Show error
      console.log('ERROR: invalid line ' + ln + ' of your bed file. Skipping.');

      //Continue
      return true;
    }

    //Read all the fields
    for(var j = 0; j < line.length; j++)
    {
      //Check the max field
      if(j >= opt.maxFields){ break; }

      //Check for empty filed
      if(line[j] === ''){ break; }

      //Add the item
      obj[BED[j].id] = line[j];
    }

    //Change the start string to int
    obj.start = parseInt(obj.start);

    //Change the end string to int
    obj.end = parseInt(obj.end);

    //Check for negative values
    if(obj.end < 0 || obj.start < 0)
    {
      //Show error
      console.log('ERROR: negative regions are unsoported (at line ' + count + ' of your bed file). Skipping region.');

      //Next region
      return true;
    }

    //Check the start and end position
    if(obj.end < obj.start)
    {
      //Show warning
      console.log('WARNING: end < start at line ' + count + ' of your BED file. Inverting the positions...');

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
  });

  //Return the output
  return out;
};
