//Collapse object
var Collapse =
{
	//Collapse a bed object by region
	ByRegion: function(bed)
	{

	},

	//Collapse a bed object by name
	ByName: function(bed)
	{
		//Collapsed object
		var collapsed = { list: [], names: {} };

		//Read all the bed objects
		for(var i = 0; i < bed.length; i++)
		{
			//Get the bed object
			var obj = bed[i];

			//Check the name
			if(typeof obj.name === 'undefined')
			{
				//Show error
				console.log('ERROR: all bed objects must have a name if you want to collapse them by name...');

				//Exit
				return [];
			}

			//Find the name
			if(typeof collapsed.names[obj.name] === 'undefined')
			{
				//Save the region
				collapsed.list.push(obj);

				//Save the name and the index
				collapsed.names[obj.name] = collapsed.list.length - 1;

				//Next bed object
				continue;
			}

			//Get the output index
			var index = collapsed.names[obj.name];

			//Update the start position
			collapsed.list[index].start = Math.min(collapsed.list[index].start, obj.start);

			//Update the end position
			collapsed.list[index].end = Math.max(collapsed.list[index].end, obj.end);
		}

		//Return the new list
		return collapsed.list;
	}
};

//Exports to node
module.exports = Collapse;
