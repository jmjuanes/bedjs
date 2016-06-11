//Import dependencies
var IndexFasta = require('../lib/index-fasta.js');
var GetFasta = require('../lib/get-fasta.js');
var Read = require('../lib/read.js');

//Reference fasta
var reference = './getfasta.fa';

//Bed with region
var bed = './getfasta.bed';

//Indes the reference file
IndexFasta(reference);

//Get fasta sequence
var fasta = GetFasta(reference, bed);

//Read the bed file
var bedContent = Read(bed);

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
