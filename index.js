//Exports to node
module.exports =
{
  //Read a BED file
  Read: require('./lib/read.js'),

  //Save to a BED file
  Write: require('./lib/write.js'),

  //Work with fasta files
  Fasta: require('./lib/fasta.js'),

  //Collapse bed files
  Collapse: require('./lib/collapse.js')
};
