#! /usr/bin/env node

//Import dependencies
var getArgs = require('get-args');

//Import libs
var BedIndexFasta = require('./lib/index-fasta.js');
var BedGetFasta = require('./lib/get-fasta.js');

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
		BedIndexFasta(args.arguments[0]);
	},

	//GetFasta method
	GetFasta: function(args)
	{

	},

	//Spec method
	Spec: function(args)
	{

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
