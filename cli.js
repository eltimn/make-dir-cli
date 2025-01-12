#!/usr/bin/env node

import meow from 'meow';
import makeDir from 'make-dir';

const cli = meow(`
	Usage
	  $ make-dir <directory> …

	Options
	  --mode  Directory permissions

	Examples
	  $ make-dir unicorn/awesome foo/bar
	  $ make-dir rainbow --mode=0666
`, {
	flags: {
		mode: {
			type: 'string'
		}
	},
	importMeta: import.meta
});

const {input: directories} = cli;

if (directories.length === 0) {
	console.error('Specify at least one path');
	process.exit(1);
}

const options = {};

if (cli.flags.mode) {
	options.mode = Number.parseInt(cli.flags.mode, 8);
}

for (const directory of directories) {
	makeDir.sync(directory, options);
}
