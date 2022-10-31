// VARS
const maxLength = 5
const maxTries = 6
let word = ''
let tries = 1

let solution = allWords[allWords.length * Math.random() | 0].toLowerCase()
let noAccentSolution = noAccents(solution)
let noAccentsWords = allWords.map(x => noAccents(x))

let rowCharacters = {
    correct: [],
    present: [],
    wrong: []
}

// console.dir(solution)

// INPUT
document.addEventListener('keydown', (event) => {
    
    if (event.key === 'Enter') {
        submit()
    }
    else if (event.key === 'Backspace') {
        remove()
    }
    else {
        add(event.key)
    }
})

// SUBMIT THE WORD

const submit = () => {
    if (word.length !== maxLength) return
    
    if(!noAccentsWords.includes(noAccents(word))) {
        xShake(row())
        return
    }

    findCharactersInRow()
    tileReveal(row())
    highlightCharacters(row())

    setTimeout(() => {
		results()
	}, 1500)
}

// ADDING CHARACTERS

const add = (character) => {
    if (word.length >= maxLength) return

    // only letters
    if (/^\p{L}$/u.test(character)) {
        word = word + character
        word = word.toLowerCase()

        let tile = currentTile()
        tile.innerHTML = character

        bounceIn(tile)
 }
}

// REMOVING CHARACTERS

const remove = () => {
    if (word.length <= 0) return

    let tile = currentTile()
    tile.innerHTML = ''
    tile.className = 'tile'


    word = word.slice(0, -1)
}

// UPDATING TILES

const currentTile = () => {
    return row().querySelector(':nth-child(' + word.length + ')')
}

// CURRENT ROW

const row = () => {
    return document.querySelector('.row:nth-child(' + tries + ')')
}


// RESULTS

const results = () => {
    if (noAccents(word) === noAccentSolution) {
        tileWin(row())
    }
    else if ( tries >= maxTries) {
        youLost()
        
        setTimeout(() => {
            alert("Správné řešení bylo: " + solution.toUpperCase())
            window.location.reload()
        }, 2000);
    }
    else {
        word = ''
        tries++
    }
}

const findCharactersInRow = () => {
    let present = [];
    let correct = [];
    let wrong = [];

    [...word].forEach((character, index) => {
        character = noAccents(character)

        // Character in correct position
        if (noAccentSolution.charAt(index) === character) {
            correct.push(character)
        }
        // Character in wrong position
        else if (noAccentSolution.includes(character)) {
            present.push(character)
        }
        // Character is not in the solution
        else {
            wrong.push(character)
        }
    });

    rowCharacters = {
        present,
        correct,
        wrong
    }
}

// REMOVE ACCENT CHARACTERS
function noAccents (str)  {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
