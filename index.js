//bedJS - Converts a BED file into a JSON object
//BED Format: http://Mar2016.archive.ensembl.org/info/website/upload/bed.html

//Read a BED file
exports.Read = require('./lib/read.js');

//Save a BED file from object
exports.Write = require('./lib/write.js');

//Group bed regions by name
exports.GroupByName = require('./lib/group-by-name.js');
