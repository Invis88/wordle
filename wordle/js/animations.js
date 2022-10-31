// TYPE IN ANIMATION
const bounceIn = (tile) => {
    tile.classList.add('filled', 'animate__animated', 'animate__bounceIn' )
}

// FLIP REVEAL
const tileReveal = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.classList.remove('animate__bounceIn', 'animate__flipInY')

        setTimeout(() => {
            tile.style.visibility = 'visible'
            tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
        }, 0);
    });

}


// SHAKE ON SUBMIT
const xShake = (row) => {
    row.classList.remove('animate__shakeX')

    setTimeout(( ) => {
        row.classList.add('filled', 'animate__animated', 'animate__shakeX' )
    }, 0);
}

// WIN ANIMATION
const tileWin = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.innerHTML = solution.charAt(index)

        tile.classList.remove('animate__bounceIn', 'animate__flipInY', 'animate__bounce')

        setTimeout(() => {
            tile.classList.add('animate__bounce', `animate__delay-${index}s`)
        }, 0);
    });

}

// GAME OVER

const youLost = () => {
    let board = document.querySelector('.board')
    board.classList.add('animate__animated', 'animate__rollOut')
}


// HIGHLIGHTING CHARACTERS 
const highlightCharacters = (row) => {
    let presentCharacters = []

    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.style.visibility = 'hidden'
    
        let tileCharacter = noAccents(word.charAt(index))
        let classColor = 'wrong'
    
    // when 'present' and 'correct' are both true, show only correct
    // only show 'present' character once per row
        if (noAccentSolution.includes(tileCharacter)) {
            if (!rowCharacters.correct.includes(tileCharacter) && !presentCharacters.includes(tileCharacter)) {
                classColor = 'present'
                presentCharacters.push(tileCharacter)
            }
        }

    // character is in a correct place
        if(noAccentSolution.charAt(index) === tileCharacter) {
            classColor = 'correct'
        }
    
        tile.classList.add(classColor)
    })

    // highlighting keyboard characters in footer
    document.querySelectorAll('.keyboard .tile').forEach(tile => {
        let classColor = ''

        if (rowCharacters.wrong.includes(tile.id)) classColor = 'wrong'
        if (rowCharacters.present.includes(tile.id)) classColor = 'present'
        if (rowCharacters.correct.includes(tile.id)) classColor = 'correct'

        if (classColor) tile.classList.add(classColor)
    })
}