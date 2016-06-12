# bedJS

[![npm](https://img.shields.io/npm/v/bedjs.svg?style=flat-square)](https://www.npmjs.com/package/bedjs)
[![npm](https://img.shields.io/npm/dt/bedjs.svg?style=flat-square)](https://www.npmjs.com/package/bedjs)

Manage BED (Browser Extensible Data) files with Node.JS (Bioinformatics).

## Install

Use NPM to install the package:

```
npm install bedjs
```

## Overview

### About the BED file format

A BED file is a tab delimited containing one feature of interest per line. Each line must contain at least the three first fields listed below:

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

You can read more about the BED format [here](http://Mar2016.archive.ensembl.org/info/website/upload/bed.html).

### The BED object

This tool will convert each line of a BED file in one JavaScript object, where each column of the BED file will be saved with the format `key=value`. The `key` attribute will be one of the previous table.

Example of a BED file:

```
1	6579260	6579725	PLEKHG5
1	10292069	10292214	KIF1B
1	33282660	33282997	YARS
1	156084621	156085204	LMNA
```

The previous BED file converted to a BED object will be:

```javascript
[
  { chromosome: '1', start: 6579260, end: 6579725, name: 'PLEKHG5' },
  { chromosome: '1', start: 10292069, end: 10292214, name: 'KIF1B' },
  { chromosome: '1', start: 33282660, end: 33282997, name: 'YARS' },
  { chromosome: '1', start: 156084621, end: 156085204, name: 'LMNA' }
]
```

## API

Include the package in your JavaScript code using:

```javascript
var bedJS = require('bedjs');
```

### bedJS.Read(file)

Read a BED file. Returns an array with one BED object for each line of the BED file.

```javascript
var bed = bedJS.Read('example.bed');
```

### bedJS.Write(file, bed)

Save an array with BED objects to a BED file.

```javascript
bedJS.Write('newfile.bed', bed);
```

### bedJS.Collapse

A class to combine all BED objects into a new object. The following combining methods are available:

#### bedJS.Collapse.ByRegion(bed)

Combines all BED objects with overlapping features into a new BED object. This method only combines all features that have the same chromosome and the same strand.

Example of a BED object:

```javascript
[
  { "chromosome": "2", "start": 500, "end": 600, "name": "REGION1", "score": 0, "strand": "+" },
  { "chromosome": "2", "start": 550, "end": 700, "name": "REGION2", "score": 0, "strand": "+" },
  { "chromosome": "2", "start": 500, "end": 700, "name": "REGION3", "score": 0, "strand": "-" }
]
```

If now we run:

```javascript
var bed2 = bedJS.Collapse.ByRegion(bed);
```

This will return the following array:

```javascript
[
  { "chromosome": "2", "start": 500, "end": 700, "name": "REGION1,REGION2", "score": 0, "strand": "+" },
  { "chromosome": "2", "start": 500, "end": 700, "name": "REGION3", "score": 0, "strand": "-" }
]
```

#### bedJS.Collapse.ByName(bed)

Combines all BED objects that have the same feature `name`. The output object will have the minimum start position and the maximum end position of all objects combined.

Example of a BED object:

```javascript
[
  { "chromosome": "2", "start": 500, "end": 600, "name": "REGION1", "score": 0, "strand": "+" },
  { "chromosome": "2", "start": 700, "end": 800, "name": "REGION1", "score": 0, "strand": "+" },
  { "chromosome": "2", "start": 500, "end": 700, "name": "REGION2", "score": 0, "strand": "-" }
]
```

If now we run:

```javascript
var bed2 = bedJS.Collapse.ByName(bed);
```

This will return the following array:

```javascript
[
  { "chromosome": "2", "start": 500, "end": 800, "name": "REGION1", "score": 0, "strand": "+" },
  { "chromosome": "2", "start": 500, "end": 700, "name": "REGION3", "score": 0, "strand": "-" }
]
```

## License

&copy; [MIT LICENSE](./LICENSE) Jose M. Juanes.
