//Collapse object
var Collapse =
{
	//Collapse a bed object by region
	ByRegion: function(bed)
	{
		//Collapsed array
		var out = [];

		//Read all the bed objects
		 for(var i = 0; i < bed.length; i++)
		 {
			 //Get the bed object
			 var obj = bed[i];

			 //Check for inserted
			 var inserted = false;

			 //Read all the collapsed regions
			 for(var j = 0; j < out.length; j++)
			 {
				 //Check the chromosome
				 if(obj.chromosome !== out[j].chromosome){ continue; }

				 //Check the start position
				 if(obj.start > out[j].end){ continue; }

				 //Check the end position
				 if(obj.end < out[j].start){ continue; }

				 //Check the strand
				 if(typeof obj.strand !== 'undefined' && typeof out[j].strand !== 'undefined')
				 {
					 //Check the strands
					 if(obj.strand !== out[j].strand){ continue; }
				 }

				 //Update the start position
				 out[j].start = Math.min(out[j].start, obj.start);

				 //Update the end position
				 out[j].end = Math.max(out[j].end, obj.end);

				 //Update the names
				 if(typeof obj.name !== 'undefined')
				 {
					 //Check the out name
					 if(typeof out[j].name === 'undefined'){ out[j].name = []; }

					 //Check the index
					 if(out[j].name.indexOf(obj.name) === -1){ out[j].name.push(obj.name); };
				 }

				 //Set inserted as true
				 inserted = true;

				 //Exit loop
				 break;
			 }

			 //Check inserted
			 if(inserted === true){ continue; }

			 //Else, insert the region
			 out.push(obj);

			 //Get the last index
			 var last = out.length - 1;

			 //Update the name
			 if(out[last].name !== 'undefined'){ out[last].name = out[last].name.split(','); }
		 }

		 //Join all the regions names
		 for(var i = 0; i < out.length; i++)
		 {
			 //Check the name
			 if(typeof out[i].name === 'undefined'){ continue; }

			 //Update the names
			 out[i].name = out[i].name.join(',');
		 }

		 //Return the collapsed array
		 return out;
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
