//Import dependencies
var fs = require('fs');
var path = require('path');
var pstat = require('pstat');

//Import utils
var GetLine = require('./utils/get-line.js');
var Sequence = require('./utils/sequence.js');

//Import bed functions
var bedRead = require('./read.js');
var bedRegion = require('./region.js');

//Fasta object
var Fasta =
{
	//Get sequence from a fasta file
	Get: function(fasta, bed, opt)
	{
		//Check the options
		if(typeof opt === 'undefined'){ var opt = {}; }

		//Check the strand specific
		if(typeof opt.strand === 'undefined'){ opt.strand = false; }

		//Generate the index file
		var index = fasta + '.json';

		//Check the fasta file
		if(pstat.isFileSync(fasta) === false)
		{
			//Show error
			console.error('Fasta file ' + fasta + ' doesn\'t exists');

			//Return empty
			return [];
		}

		//Check the index file
		if(pstat.isFileSync(index) === false)
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
			//Region number
			var rn = i + 1;

			//Get the region
			var region = bedContent[i];

			//Sequence object
			var obj = { head: '', sequence: '' };

			//Add the sequence head
			obj.head = bedRegion.toString(region, { addStrand: false });

			//Get the chromosome info
			var chr = indexContent.chromosomes[region.chromosome];

			//Get the start increments
			var start_inc = Math.floor((region.start - 1)/chr.bases);

			//Calculate the end increments
			var end_inc = Math.floor((region.end - 1)/chr.bases);;

			//Get the start line
			var start = chr.start + region.start + start_inc;

			//Get the end file
			var end = chr.start + region.end + end_inc;

			//Check the end
			if(chr.end <= end)
			{
				//Show warning
				console.log('WARNING: end of the feature at line ' + rn + ' exceeds the reference length...');

				//Update the end
				end = chr.end - 1;
			}

			//Get the region length
			var length = end - start;

			//Check the length
			if(length === 0)
			{
				//Show warning
				console.log('WARNING: feature at line ' + rn + ' has length 0. Skipping feature.');

				//Save an empty region
				out.push(obj);

				//Next region
				continue;
			}

			//Create the buffer
			var buff = new Buffer(length);

			//Get the line
			var bytesRead = fs.readSync(fastaFd, buff, 0, length, start);

			//Convert the sequence
			obj.sequence = buff.toString('utf8').replace(/\n/g, '');

			//Check for strand
			if(opt.strand === true)
			{
				//Update the sequence head
				obj.head = bedRegion.toString(region, { addStrand: true });

				//Get the complement sequence
				obj.sequence = Sequence.Complement(obj.sequence);
			}

			//Save the sequence object
			out.push(obj);
		}

		//Close the fasta file
		fs.closeSync(fastaFd);

		//Return the sequences
		return out;
	},

	//Index a fasta file
	Index: function(file)
	{
		//Check the file
		if(pstat.isFileSync(file) === false)
		{
			//Show error and exit
			return console.error('Error: file ' + file + ' doesn\'t exists...');
		}

		//Initialize the index file
		var index = { chromosomes: {}, length: 0 };

		//Save the file name
		index.file = path.basename(file);

		//Open the fasta file
		var fileFd = fs.openSync(file, 'r');

		//Initialize the line count
		var count = 0;

		//Initialize the line
		var line = null;

		//Iitialize the line in utf8
		var lineStr = '';

		//Actual position
		var position = 0;

		//Actual chromosome
		var chr = '';

		//First line
		var first = true;

		//Read the full file
		while(true)
		{
			//Get the line
			line = GetLine(fileFd, position);

			//Check for exit
			if(line === false){ break; }

			//Convert the line to utf8
			lineStr = line.toString('utf8');

			//Check for empty line
			if(line.length === 0)
			{
				//Check the actual chromosome
				if(chr !== '')
				{
					//Save the chromosome end
					index.chromosomes[chr].end = position;
				}

				//Reset the chromosome
				chr = '';

				//Check the first line
				first = true;
			}

			//Check the first character
			else if(lineStr.charAt(0) === '>')
			{
				//Check the actual chromosome
				if(chr !== '')
				{
					//Save the chromosome end
					index.chromosomes[chr].end = position;
				}

				//Get the chromosome
				chr = lineStr.split(' ')[0].replace('>', '');

				//Initialize the chromosome object
				index.chromosomes[chr] = { start: 0, bases: 0, end: 0, length: 0, head: '' };

				//Save the head
				index.chromosomes[chr].head = lineStr;

				//Save the start
				index.chromosomes[chr].start = position + line.length + 1;

				//Set first line as true
				first = true;

				//Show in console
				console.log('Indexing chromosome ' + chr.replace('chr', '') + '...');
			}

			//Check the code
			else if(first === true)
			{
				//Save the number of bases per line
				index.chromosomes[chr].bases = line.length;

				//Set first as false
				first = false;
			}

			//Increment the line counter
			count = count + 1;

			//Increment the position
			position = position + line.length + 1;
		}

		//Check the actual chromosome
		if(chr !== '')
		{
			//Save the chromosome end
			index.chromosomes[chr].end = position;
		}

		//Update hte number of lines
		index.length = count;

		//Save the json file
		fs.writeFileSync(file + '.json', JSON.stringify(index), 'utf8');

		//Show in console
		console.log('Done!');
		console.log('Index file saved as "' + file + '.json"');

		//Exit
		return true;
	}
};

//Exports to node
module.exports = Fasta;
