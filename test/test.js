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
	}

};

//Exports to node
module.exports = Test;
