//Import dependencies
var fs = require('fs');
var pStat = require('stattic-pstat');

//Import utils
var Sequence = require('./utils/sequence.js');

//Import bed functions
var bedRead = require('./read.js');

//Get sequence from a fasta file
module.exports = function(fasta, bed, opt)
{
	//Check the options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check the strand specific
	if(typeof opt.strand === 'undefined'){ opt.strand = false; }

	//Check the 1based
	if(typeof opt.based === 'undefined'){ opt.based = 0; }

	//Generate the index file
	var index = fasta + '.json';

	//Check the fasta file
	if(pStat.isFile(fasta) === false)
	{
		//Show error
		console.error('Fasta file ' + fasta + ' doesn\'t exists');

		//Return empty
		return [];
	}

	//Check the index file
	if(pStat.isFile(index) === false)
	{
		//Show error
		console.error('Index file for fasta file ' + fasta + ' doesn\'t exists. Have you indexed it?');

		//Return empty
		return [];
	}

	//Bed content
	var bedContent = (typeof bed === 'string') ? bedRead(bed) : bed;

	//Fasta index content
	var indexContent = fs.readFileSync(index, 'utf8');

	//Parse the index file
	indexContent = JSON.parse(indexContent);

	//Open the fasta file
	var fastaFd = fs.openSync(fasta, 'r');

	//Output object
	var out = [];

	//Get all bed regions
	for(var i = 0; i < bedContent.length; i++)
	{
		//Get the region
		var region = bedContent[i];

		//Get the chromosome info
		var chr = indexContent.chromosomes['chr' + region.chromosome];

		//Get the start increments
		var start_inc = Math.floor((region.start - 1)/chr.bases);

		//Calculate the end increments
		var end_inc = Math.floor((region.end - 1)/chr.bases);;

		//Get the start line
		var start = chr.start + region.start + start_inc - opt.based;

		//Get the end file
		var end = chr.start + region.end + end_inc;

		//Get the region length
		var length = end - start;

		//Create the buffer
		var buff = new Buffer(length);

		//Get the line
		var bytesRead = fs.readSync(fastaFd, buff, 0, length, start);

		//Convert the sequence
		var seq = buff.toString('utf8').replace(/\n/g, '');

		//Check for strand
		if(opt.strand === true)
		{
			//Get the complement sequence
			seq = Sequence.Complement(seq);
		}

		//Save the sequence
		out.push(seq);
	}

	//Close the fasta file
	fs.closeSync(fastaFd);

	//Return the sequences
	return out;
};
