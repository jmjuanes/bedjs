//Import dependencies
var fs = require('fs');
var path = require('path');
var pStat = require('stattic-pstat');

//Import utils
var GetLine = require('./utils/get-line.js');

//Index a fasta file
module.exports = function(file)
{
	//Check the file
	if(pStat.isFile(file) === false)
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
			chr = 'chr' + lineStr.split(' ')[0].replace('>', '').replace('chr', '');

			//Initialize the chromosome object
			index.chromosomes[chr] = { start: 0, bases: 0, end: 0, length: 0, head: '' };

			//Save the head
			index.chromosomes[chr].head = lineStr;

			//Save the start
			index.chromosomes[chr].start = position + line.length + 1;

			//Set first line as true
			first = true;
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

	//Exit
	return true;
};
