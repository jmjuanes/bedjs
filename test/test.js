//Import bedJS
var bedJS = require('../index.js');

//Test function
var Test =
{
	//Show bed file
	ShowBED: function(bed)
	{
		//Read the full file
		for(var i = 0; i < bed.length; i++)
		{
			//Show in console
			console.log(JSON.stringify(bed[i]));
		}
	},

	//Test read a file
	Read: function()
	{
		//Read the test file
		var bed = bedJS.Read('./test.bed');

		//Show the bed header
		console.log('>> Bed in JSON:');

		//Show the bed
		Test.ShowBED(bed);
	},

	//Test collapse by name
	CollapseByName: function()
	{
		//Read the test file
		var bed = bedJS.Read('./test.bed');

		//Collapse BED regions by name
		var collapsed = bedJS.Collapse.ByName(bed);

		//Show the collapsed regions
		console.log('>> Collapse BED by region name');

		//Show the bed
		Test.ShowBED(collapsed);
	},

	//Test collapse by region
	CollapseByRegion: function()
	{
		//Read the test file
		var bed = bedJS.Read('./test.bed');

		//Collapse BED regions by name
		var collapsed = bedJS.Collapse.ByRegion(bed);

		//Show the collapsed regions
		console.log('>> Collapse BED by region');

		//Show the bed
		Test.ShowBED(collapsed);
	},

	//Index a fasta file
	IndexFasta: function()
	{
		//Reference fasta
		var reference = './getfasta.fa';

		//Index the reference file
		bedJS.Fasta.Index(reference);
	},

	//Get from fasta file
	GetFasta: function()
	{
		//Reference fasta
		var reference = './getfasta.fa';

		//Bed with region
		var bed = './getfasta.bed';

		//Read the bed file
		var bedContent = bedJS.Read(bed);

		//Get fasta sequence
		var fasta = bedJS.Fasta.Get(reference, bedContent);

		//Show in console
		for(var i = 0; i < fasta.length; i++)
		{
			//Get the bed region
			var region = bedContent[i];

			//Show region
			console.log('Region:' + region.chromosome + ':' + region.start + '-' + region.end);

			//Show expected and generated
			console.log('Expected: ' + region.name + '   Generated: ' + fasta[i].sequence);
		}
	}

};

//Exports to node
module.exports = Test;
