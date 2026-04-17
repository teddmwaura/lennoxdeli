export function generateId(){
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*^%$£@????////abcdefgyhjugstklihs'
    const numbers = Math.floor(Math.random() * 1000000)

    let allNumbers = '';

    for(let i = 0; i < 10; i++){
        const lettersNumbers = Math.floor(Math.random() * letters.length)
        allNumbers += letters[lettersNumbers]
    }

    return numbers + allNumbers
}