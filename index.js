//BEDjs - Converts a BED file into a JSON object
//BED Format: https://genome.ucsc.edu/FAQ/FAQformat.html#format1

//Import dependencies
var fs = require('fs');

//BED fields list
var fields = ['chr','start','end','name','score','scoreRange','strand','thickStart','thickEnd',
'itemRgb','blockCount','blockSizes','blockStarts'];

//BED fields type
var fieldsT = ['str','int','int','str','int','str','str','int','int','str','int','str','str'];

//Read a BED file
function BEDRead(file)
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

    //Split the line by tab
    var split = bed[i].split('\t');

    //Read all
    for(var j = 0; j < split.length; j++)
    {
      //Check for blank
      if(split[j] === ''){ break; }

      //Add the item
      obj[fields[j]] = split[j];
    }

    //Check if the new object is not empty
    if(typeof obj.chr !== 'undefined')
    {
      //Change the start string to int
      obj.start = parseInt(obj.start);

      //Change the end string to int
      obj.end = parseInt(obj.end);

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
  }

  //Return the output
  return out;
}

//Save a BED file from object
function BEDSave(file, bed)
{
  //Initialize the data string
  var data = '';

  //Read all the bed object
  for(var i = 0; i < bed.length; i++)
  {
    //Save all the content
    for(var j = 0; j < fields.length; j++)
    {
      //Check the typeof
      if(typeof bed[i][fields[j]] === 'undefined'){ break; }

      //Check for add a tabulator
      if(j > 0){ data = data + '\t'; }

      //Save the content
      data = data + bed[i][fields[j]];
    }

    //End the line
    data = data + '\n';
  }

  //Save the file
  fs.writeFileSync(file, data);
}

//BED group regions with the same name
function BEDGroup(file)
{
  //Initialize the bed content
  var bed = file;

  //Check the typeof
  if(typeof file === 'string')
  {
    //The input is a file path, get the content
    bed = BEDRead(bed);
  }

  //New output
  var out = [];

  //Check if the name key exists
  if(typeof bed[0].name === 'undefined')
  {
    //Show error
    console.log('Error: no name key on the BED file');

    //Return empty array
    return [];
  }

  //Acutal chromosome and name
  var nchr = '', nname = '';

  //Actual index
  var k = -1;

  //Read all
  for(var i = 0; i < bed.length; i++)
  {
    //Check if chromosome and name is the same
    if(bed[i].chr === nchr && bed[i].name === nname)
    {
      //Change the region end
      out[k].end = bed[i].end;
    }
    else
    {
      //Increment the index
      k = k + 1;

      //Add the first element of the new region
      out.push(bed[i]);

      //Save the actual chromosome
      nchr = bed[i].chr;

      //Save the actual name
      nname = bed[i].name;
    }
  }

  //Return the new output
  return out;
}

//Exports to node
module.exports = { Read: BEDRead, Save: BEDSave, Group: BEDGroup };
