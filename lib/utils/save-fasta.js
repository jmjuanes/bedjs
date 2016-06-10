//Import dependencies
var fs = require('fs');

//Module to save a fasta file
module.exports = function(file, fasta)
{
	//Check the fasta object
	if(Array.isArray(fasta) === false){ fasta = [ fasta ]; }

	//Initialize the file
	fs.writeFileSync(file, '', 'utf8');

	//Read all fasta sequences
	for(var i = 0; i < fasta.length; i++)
	{
		//Get the fasta block
		var block = fasta[i];

		//Add the head
		fs.appendFileSync(file, '>' + block.head + '\n', 'utf8');

		//Add the sequence
		fs.appendFileSync(file, block.sequence + '\n', 'utf8');
	}
};
