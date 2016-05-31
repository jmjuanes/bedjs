# bedJS

[![npm](https://img.shields.io/npm/v/bedjs.svg?style=flat-square)](https://www.npmjs.com/package/bedjs)
[![npm](https://img.shields.io/npm/dt/bedjs.svg?style=flat-square)](https://www.npmjs.com/package/bedjs)

Manage BED (Browser Extensible Data) files with Node.JS (Bioinformatics). Read more about the BED format [here](http://Mar2016.archive.ensembl.org/info/website/upload/bed.html).

## Install

Use NPM for install the package:

```
npm install bedjs
```

## Usage

### bedJS.Read(file)

Read a BED file. Returns an array with a object per line of the BED file. Each column of the BED file will be saved with the format `key:value`:

| KEY | Description | Type |
|-----|-------------|------|
| chromosome | Chromosome name | String |
| start | Start position of the feature | Integer |
| end | End position of the feature | Integer |
| name | Name of the line | String |
| score | Score between 0 and 1000 | Integer |
| strand | Strand of the feature ('+' or '-') | String |
| thickStart | Start position at which the feature is drawn thickly | Integer |
| thickEnd | End position at which the feature is drawn thickly | Integer |
| itemRgb | RGB value in format R,G,B | String |
| blockCount | The number of blocks (exons) in the BED line | Integer |
| blockSizes | A comma-separated list of the block sizes | String |
| blockStarts | A comma-separated list of block starts | String |

```javascript
//example.bed:
/*
1	6579260	6579725	PLEKHG5
1	10292069	10292214	KIF1B
1	33282660	33282997	YARS
1	156084621	156085204	LMNA
*/

//Import the BED package
var bedJS = require('bedjs');

//Read the bed file
var bed = bedJS.Read('example.bed');

//Output:
/*
[
  { chromosome: '1', start: 6579260, end: 6579725, name: 'PLEKHG5' },
  { chromosome: '1', start: 10292069, end: 10292214, name: 'KIF1B' },
  { chromosome: '1', start: 33282660, end: 33282997, name: 'YARS' },
  { chromosome: '1', start: 156084621, end: 156085204, name: 'LMNA' }
]
*/
```

### bedJS.Save(file, object)

Save an array with the previous format to a file.

```javascript
bedJS.Save('newFile.bed', bed); //Save to a file
```
