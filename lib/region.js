//Parse a region
exports.Parse = function(regions)
{
	//Split the regions by comma
	regions = regions.split(',');

	//Output array
	var out = [];

	//Read all the regions
	for(var i = 0; i <regions.length; i++)
	{
		//Split the region by ':'
		var str = regions[i].split(':');

		//Generate the region object
		var region = {};

		//Save the chromosome
		region.chromosome = str[0];

		//Save the start
		region.start = str[1].split('-')[0];

		//Save the end
		region.end = str[1].split('-')[1];

		//Check for strand
		if(str.length > 2)
		{
			//Save the strand
			region.strand = (str[2] === '-1' || str[2] === '-') ? '-' : '+';

			//Save the score
			region.score = 0;

			//Save the region name
			region.name = 'REGION' + i;
		}

		//Check for undefined end
		if(typeof region.end === 'undefined'){ region.end = region.start; }

		//Parse the start position
		region.start = parseInt(region.start);

		//Parse the end position
		region.end = parseInt(region.end);

		//Check the start and end position
		if(region.start > region.end)
		{
			//Create the aux variable
			var aux = region.start;

			//Save the start
			region.start = region.end;

			//Save the end
			region.end = aux;
		}

		//Add the region
		out.push(region);
	}

	//Return the list
	return out;
};

//Convert a region object to string
exports.toString = function(regions, opt)
{
	//Check for array
	if(Array.isArray(regions) === false){ regions = [ regions ]; }

	//Check the options
	if(typeof opt === 'undefined'){ var opt = {}; }

	//Check the add strand option
	if(typeof opt.addStrand === 'undefined'){ opt.addStrand = true; }

	//Output list
	var out = [];

	//Read all the regions
	for(var i = 0; i < regions.length; i++)
	{
		//Get the region
		var region = regions[i];

		//Generate the string
		var str = region.chromosome + ':' + region.start + '-' + region.end;

		//Check the strand
		if(typeof region.strand !== 'undefined' && opt.addStrand === true)
		{
			//Add the strand
			str = str + ':' + ((region.strand === '-') ? '-1' : '1');
		}

		//Save the region in string format
		out.push(str);
	}

	//Return the region
	return out;
};
