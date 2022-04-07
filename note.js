const fs = require('fs');
const chalk = require('chalk');
const val = require('validator');

let notesPresent = () =>{
    try{
        let notedata = fs.readFileSync('NotesData.json');
        return JSON.parse(notedata);
    }catch(e){
        return [];
    }
};

let writeNote = (notedata) =>{
    fs.writeFileSync('NotesData.json', JSON.stringify(notedata));
};

let createNote = (title, body) => {
    let note = {
        title,
        body
    };

    let notedata = notesPresent();
    let duplicateNote = notedata.filter((note) => note.title === title);

    if(duplicateNote.length === 0){
        notedata.push(note);
        writeNote(notedata);
        console.log(chalk.bgGreen.black('New Note Created.'));
    }
    else{
        console.log(chalk.bgRed.black('Title already taken!'));
    }
};

let removeNote = (title) => {
    let notedata = notesPresent();
    let requiredNote = '';
    for(let i of notedata){
        if(i.title === title){
            requiredNote = i;
            break;
        }
    }

    if(requiredNote.length === 0){
        console.log(chalk.bgRed.black('Note not found!'));
    }
    else{
        console.log(chalk.bgGreen.black('Note removed!!'));
    }

    writeNote(requiredNote);
};

let listAllNotes =() =>{
    let notesdata = notesPresent();

    if(notesdata.length == 0){
        console.log(chalk.bgRed.black('No notes present, Please add the note first.'));
    }
    else{
        console.log(chalk.bgBlue.black('------All Notes title------'));
        for(let i of notesdata){
            console.log(chalk.bgWhite.black(' ',i.title,' '));
        }
    }
};

let readNote = (title) =>{
    let notesdata = notesPresent();

    let foundNote ='';
    for(let i of notesdata){
        if(i.title === title){
            foundNote = i;
            break;
        }
    }

    if(foundNote.length == 0)
    {
        console.log(chalk.bgRed.black(' Note not found'));
    }
    else{
        console.log(chalk.bgBlue.black('-------Note found--------'));
        console.log(chalk.bgYellow.black(`  Title: ${foundNote.title}  `));
        console.log(chalk.bgWhite.black(` Body: ${foundNote.body}  `));
    }
};

module.exports ={
    createNote,
    notesPresent,
    writeNote,
    listAllNotes,
    removeNote,
    readNote
};