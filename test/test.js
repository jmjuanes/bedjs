//Import bedJS
var bedJS = require('../index.js');

//Test object
var Test = {};

//Show bed file
Test.showBED = function(bed)
{
  //Read the full file
  for(var i = 0; i < bed.length; i++)
  {
    //Show in console
    console.log(JSON.stringify(bed[i]));
  }

  //Exit
  return;
};

//Test read a file
Test.read = function()
{
  //Read the test file
  var bed = bedJS.Read('./test.bed');

  //Show the bed header
  console.log('>> Bed in JSON:');

  //Show the bed
  Test.showBED(bed);

  //Exit
  return;
};

//Test collapse by name
Test.collapseByName = function()
{
  //Read the test file
  var bed = bedJS.Read('./test.bed');

  //Collapse BED regions by name
  var collapsed = bedJS.Collapse.ByName(bed);

  //Show the collapsed regions
  console.log('>> Collapse BED by region name');

  //Show the bed
  Test.showBED(collapsed);

  //Exit
  return;
};

//Test collapse by region
Test.collapseByRegion = function()
{
  //Read the test file
  var bed = bedJS.Read('./test.bed');

  //Collapse BED regions by name
  var collapsed = bedJS.Collapse.ByRegion(bed);

  //Show the collapsed regions
  console.log('>> Collapse BED by region');

  //Show the bed
  Test.showBED(collapsed);

  //Exit
  return;
};

//Index a fasta file
Test.indexFasta = function()
{
  //Reference fasta
  var reference = './getfasta.fa';

  //Index the reference file
  bedJS.Fasta.Index(reference);

  //Exit
  return;
},

//Get from fasta file
Test.getFasta = function()
{
  //Reference fasta
  var reference = './getfasta.fa';

  //Bed with region
  var bed = './getfasta.bed';

  //Read the bed file
  var bedContent = bedJS.Read(bed);

  //Get fasta sequence
  var fasta = bedJS.Fasta.Get(reference, bedContent);

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

  //Exit
  return;
};

//Exports to node
module.exports = Test;
