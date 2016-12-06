//Sequence object
var Sequence = {};

//Complementary bases
Sequence.bases =
{
  'N': 'N', 'n': 'n',
  'A': 'T', 'a': 't',
  'T': 'A', 't': 'a',
  'C': 'G', 'c': 'g',
  'G': 'C', 'g': 'c'
};

//Function to get the complementary base
Sequence.getCBase = function(b){ return Sequence.bases[b]; },

//Build the reverse complementary sequence
Sequence.complement = function(seq)
{
  //Reverse and get the complement sequence
  return seq.split('').reverse().map(Sequence.getCBase).join('');
};

//Exports to node
module.exports = Sequence;
