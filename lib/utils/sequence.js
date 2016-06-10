//Complement bases object
var Complement =
{
	'N': 'N', 'n': 'n',
	'A': 'T', 'a': 't',
	'T': 'A', 't': 'a',
	'C': 'G', 'c': 'g',
	'G': 'C', 'g': 'c'
};

//Function to return the complement base
function ComplementBase(a){ return Complement[a]; }

//Get the complement sequence
exports.Complement = function(seq)
{
	//Reverse and get the complement sequence
	return seq.split('').reverse().map(ComplementBase).join('');
};
