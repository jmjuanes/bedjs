//Module to group bed regions by name
module.exports = function(bed)
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
