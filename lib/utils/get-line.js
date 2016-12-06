//Import dependencies
var fs = require('fs');

//Define the default read chunk
var readChunk = 1024;

//Define the line break
var endl = 0x0a;

//Module to read a line from a file descriptor.
module.exports = function(fd, start)
{
  //Create the buffer
  var buff = new Buffer(readChunk);

  //Get the chunk
  var bytesRead = fs.readSync(fd, buff, 0, readChunk, start);

  //Check the length
  if(bytesRead === 0){ return false; }

  //Get the line end
  var index = buff.indexOf(endl);

  //Slice the buffer
  buff = (index === -1) ? buff.slice(0, bytesRead) : buff.slice(0, index);

  //Return the buffer
  return buff;
};
