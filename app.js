const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./note.js');

yargs.command({
    command: 'add',
    description: 'Add a new note.',
    builder:{
        title: {
            describe: "Title of new note",
            demandOption: true,
            type: 'string',
        },
        body: {
            description: "body of new note.",
            demandOption: true,
            type: 'string',
        }
    },
})

yargs.command({
    command: 'remove',
    description: "Remove a note.",
    builder: {
        title: {
            describe: "Title of note to be remnoved.",
            demandOption: true,
            type: 'string'
        }
    },

})

yargs.command({
    command: 'read',
    description: 'Read a note.',
    builder: {
        title: {
            describe: "Title of the note to be read",
            demandOption: true,
            type: 'string'
        }
    },
})

yargs.command({
    command: "list",
    description: "List all the Notes",
})

yargs.parse();

const argv = yargs.argv;
const command = argv._[0];

if(command==='add')
{
    notes.createNote(argv.title, argv.body);
}
else if(command === 'remove'){
    notes.removeNote(argv.title);
}
else if(command === 'list'){
    notes.listAllNotes();
}
else if(command === 'read'){
    notes.readNote(argv.title);
}
else{
    console.log(chalk.bgRes.black(' ** Command not recognised!!! ** '));
}
