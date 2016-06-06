#! /usr/bin/env node

//Import dependencies
var getArgs = require('get-args');

//Import libs
var bedIndexFasta = require('./lib/index-fasta.js');
var bedGetFasta = require('./lib/get-fasta.js');
var bedRegion = require('./lib/region.js');

//Import utils
var SaveFasta = require('./lib/utils/save-fasta.js');

//Client object
var Client =
{
	//Commands
	commands: require('./config/commands.json'),

	//Init function
	Init: function(args)
	{
		//Get the command
		var command = (args.command === '') ? 'help' : args.command;

		//Check the command
		if(typeof Client.commands[command] === 'undefined')
		{
			//Show error
			console.log('ERROR: unknow command ' + command);
			console.log('Use "bedjs help" to display the list with all the commands.');

			//Exit
			return ;
		}

		//Get the command function
		var fun = Client.commands[command].run;

		//Run the command
		Client[fun](args);
	},

	//IndexFasta method
	IndexFasta: function(args)
	{
		//Check the file name
		if(args.arguments.length === 0)
		{
			//Show error
			return console.error('ERROR: use "bedjs help index" to get more information');
		}

		//Index the fasta file
		bedIndexFasta(args.arguments[0]);
	},

	//GetFasta method
	GetFasta: function(args)
	{
		//Options object
		var opt = { strand: false, based: 0 };

		//Get the options object
		var options = args.options;

		//Check the strand
		if(typeof options.strand !== 'undefined'){ opt.strand = true; }

		//Check the pased coordinate
		if(typeof options.based !== 'undefined')
		{
			//Get the value
			var v = parseInt(options.based);

			//Check for not a number
			if(isNaN(v) === true || (v !== 0 && v !== 1))
			{
				//Show error in console
				return console.log('ERROR: invalid based coordinate system "' + options.based + '". Use 0 or 1.');
			}

			//Save the value
			opt.based = v;
		}

		//Check the fasta file
		if(typeof options.fa === 'undefined')
		{
			//Show error
			return console.log('ERROR: you must specify the reference fasta file.');
		}

		//Save the fasta file path
		var fasta = options.fa;

		//Check the bed file or region
		if(typeof options.bed === 'undefined' && typeof options.region === 'undefined')
		{
			//Show error
			return console.log('Error: you must specify a region or a bed file.');
		}

		//Check the bed
		if(typeof options.bed !== 'undefined')
		{
			//SAve the bed file path
			var bed = options.bed;
		}
		else
		{
			//Parse the region
			var bed = bedRegion.Parse(options.region);
		}

		//Get the sequence
		var seq = bedGetFasta(fasta, bed, opt);

		//Check the output file
		if(typeof options.out !== 'undefined')
		{
			//Save to a file
			return SaveFasta(options.out, seq);
		}

		//Read all sequences
		for(var i = 0; i < seq.length; i++)
		{
			//Get the sequence
			var s = seq[i];

			//Add a line break
			console.log('');

			//Display the head
			console.log('>' + s.head);

			//Display the sequence
			console.log(s.sequence);
		}

		//Add a line break
		console.log('');
	},

	//Spec method
	Spec: function(args)
	{
		//Import the bed specification
		var bed = require('./config/bed.json');

		//Show line blank
		console.log('');

		//Show the bed description
		console.log('A BED file is a tab delimited containing one feature of interest per line.');
		console.log('Each line must contain at least the three first fields listed below:');

		//Read all the bed fields
		for(var i = 0; i < bed.length; i++)
		{
			//Get the field
			var field = bed[i];

			//Get the space
			var space = '';

			//Add the spaces
			for(var k = field.id.length; k < 15; k++){ space = space + ' '; }

			//Show the option
			console.log('   ' + field.id + space + field.description);
		}

		//Show line blank
		console.log('');
	},

	//Help function
	Help: function(args)
	{
		//Display a line break
		console.log('');

		//Check the arguments
		if(args.arguments.length === 0)
		{
			//Show the full list
			Client.HelpFull();
		}
		else
		{
			//Get the first argument
			var command = args.arguments[0];

			//Check on the list
			if(typeof Client.commands[command] === 'undefined')
			{
				//Display the full help
				Client.HelpFull();
			}
			else
			{
				//Run the specific help
				Client.HelpCommand(Client.commands[command].index);
			}
		}

		//Blank space
		console.log('');
	},

	//Display the help for a specific command
	HelpCommand: function(index)
	{
		//Import the help config
		var help = require('./config/help.json')[index];

		//Display the usage
		console.log('Usage:        ' + help.usage);

		//Display the command description
		console.log('Description:  ' + help.description);

		//Check for no options
		if(help.options.length === 0){ return; }

		//Display a line break
		console.log('');

		//Display the options
		console.log('Options: ');

		//Read the full options list
		for(var i = 0; i < help.options.length; i++)
		{
			//Get the option
			var opt = help.options[i];

			//Get the space
			var space = '';

			//Add the spaces
			for(var k = opt.option.length; k < 15; k++){ space = space + ' '; }

			//Show the option
			console.log('   ' + opt.option + space + opt.description);
		}
	},

	//Display the full help
	HelpFull: function()
	{
		//Import the package info
		var pkg = require('./package.json');

		//Import the help config
		var help = require('./config/help.json');

		//Display the bedjs info
		console.log('bedJS v' + pkg.version);

		//Dsiplay the bedjs description
		console.log(pkg.description);

		//Display the homepage
		console.log(pkg.homepage);

		//Display a line break
		console.log('');

		//Commands available
		console.log('Commands available with the CLI:\n');

		//Read the full commands list
		for(var i = 0; i < help.length; i++)
		{
			//Get the command
			var co = help[i];

			//Get the space
			var space = '';

			//Add the spaces
			for(var k = co.command.length; k < 15; k++){ space = space + ' '; }

			//Show the command info
			console.log('   ' + co.command + space + co.description);
		}
	}
};

//Run the init function
Client.Init(getArgs());
