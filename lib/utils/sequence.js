//Sequence object
var Sequence =
{
	//Complementary bases
	bases:
	{
		'N': 'N', 'n': 'n',
		'A': 'T', 'a': 't',
		'T': 'A', 't': 'a',
		'C': 'G', 'c': 'g',
		'G': 'C', 'g': 'c'
	},

	//Function to get the complementary base
	GetCBase: function(b){ return Sequence.bases[b]; },

	//Build the reverse complementary sequence
	Complement: function(seq)
	{
		//Reverse and get the complement sequence
		return seq.split('').reverse().map(Sequence.GetCBase).join('');
	}
};

//Exports to node
module.exports = Sequence;
