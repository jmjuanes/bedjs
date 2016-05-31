//bedJS - Converts a BED file into a JSON object
//BED Format: http://Mar2016.archive.ensembl.org/info/website/upload/bed.html

//Import dependencies
var fs = require('fs');

//BED fields list
var fields = ['chromosome','start','end','name','score','strand','thickStart','thickEnd',
'itemRgb','blockCount','blockSizes','blockStarts'];

//Read a BED file
exports.Read = function(file)
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

//Save a BED file from object
exports.Write = function(file, bed)
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

//BED group regions with the same name
exports.GroupByName = function(bed)
{
  //New output
  var out = [];

  //Names
  var names = {};

  //Read all the bed objects
  for(var i = 0; i < bed.length; i++)
  {
    //Get the bed object
    var obj = bed[i];

    //Get the bed name
    var name = obj.name;

    //Check the name
    if(typeof name === 'undefined')
    {
      //Show error
      console.error('All bed objects must have a name...');

      //Exit
      return [];
    }

    //Find the name
    if(typeof names[name] === 'undefined')
    {
      //Save the region
      out.push(obj);

      //Save the name and the index
      names[name] = out.length - 1;

      //Next bed object
      continue;
    }

    //Get the output index
    var index = names[name];

    //Update the start position
    out[index].start = Math.min(out[index].start, obj.start);

    //Update the end position
    out[index].end = Math.max(out[index].end, obj.end);
  }

  //Return the new object
  return out;
};
