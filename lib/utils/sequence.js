//Complementary bases
var complementary_bases =
{
  'N': 'N', 'n': 'n',
  'A': 'T', 'a': 't',
  'T': 'A', 't': 'a',
  'C': 'G', 'c': 'g',
  'G': 'C', 'g': 'c'
};

//Sequence object
var Sequence = {};

//Build the reverse complementary sequence
Sequence.complement = function(seq)
{
  //Split and reverse the sequence
  seq = seq.split('').reverse();

  //Get the complementary bases
  seq = seq.map(function(b){ return complementary_bases[b]; });

  //Join the sequence again and return
  return seq.join('');
};

//Build the reverse sequence
Sequence.reverse = function(seq)
{
  //Return the reverse sequence
  return seq.split('').reverse().join('');
};

//Exports to node
module.exports = Sequence;
