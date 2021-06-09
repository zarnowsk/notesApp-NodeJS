const fs = require('fs')
const chalk = require('chalk')

// *** EXPORTS ***
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })

        console.log(chalk.inverse.green('New note added!'))
    } else {
        console.log(chalk.inverse.red('Note title taken!'))
    }

    saveNotes(notes)
}

const removeNote = (title) => {
    const notes = loadNotes()
    let updatedNotes = [];

    if (notes.some(note => note.title === title)) {
        updatedNotes = notes.filter(note => note.title !== title)
        console.log(chalk.inverse.green(`Note ${title} has been removed!`))
    } else {
        updatedNotes = notes
        console.log(chalk.inverse.red("Note with provided title doesn't exist!"))
    }

    saveNotes(updatedNotes)
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length > 0) {
        console.log(chalk.inverse.green(`Listing all notes\n`))

        notes.forEach(note => {
            console.log(chalk.green(note.title))
        })
    } else {
        console.log(chalk.inverse.red('No notes to list!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)

    if (noteToRead) {
        console.log(chalk.inverse.green(`Reading note ${title}`))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.inverse.red(`Note with such title doesn't exist!`))
    }
}

// *** HELPERS ***
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        // If file doesn't exist
        return []
    }
}

const saveNotes = (notesArr) => {
    const dataJSON = JSON.stringify(notesArr)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}