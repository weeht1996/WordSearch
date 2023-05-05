import { AnswerBoard } from "./AnswerBoard";
import { WordBoard } from "./WordBoard";

export function WordTable({inputWords, intersect, dimension, answerChecked, fSize, cellWidth}) {

    function generateChar() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        return characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    function getBoard(rows, cols) {
        let all = []
        for (let i = 0; i < rows; i ++) {
            for (let j = 0; j < cols; j++) {
                all.push([i,j])
            }
        }
        return all
    }

    function getRandomInt(num) {
        return Math.floor(Math.random() * num)
    }

    function getDirection(dir) {
        let increment_row = 0
        let increment_col = 0
        switch(dir) {
            case 0: //→ 
                increment_col+=1
                break
            case 1: //↘
                increment_row+=1
                increment_col+=1
                break
            case 2: //↓ 
                increment_row+=1
                break
            case 3: //↙
                increment_row+=1
                increment_col-=1
                break
            case 4: //←
                increment_col-=1
                break
            case 5: //↖
                increment_row-=1
                increment_col-=1
                break
            case 6: //↑
                increment_row-=1
                break
            case 7: //↗
                increment_row-=1
                increment_col+=1
                break
        }
        return [increment_row, increment_col]
    }

    function changeDirection(input) {
        if (input + 1 < 8) {
            return input + 1
        }
        return 0
    }

    function intersectWords(word, intersect_location) {
        // search for intersected word
        searchLoop: for (let i in occupied_spots) {
            let current = occupied_spots[i].word
            
            if (current.path.some(element => element.toString() == intersect_location.toString())) { //finds the word that was intersected
                
                if ((word.direction + 4 == current.direction) || (word.direction - 4 == current.direction) || (word.direction == current.direction)) {
                    return false
                }
                
                for (let x = 0; x < current.word.length ; x++) {
                    
                    if (word.word.includes(current.word.charAt(x))) {
                        
                        let repeated_word_idx = word.word.indexOf(current.word.charAt(x))
                        let repeated_word_location = [...word.spot]
                        let increments = getDirection(word.direction)

                        repeated_word_location[0] += (increments[0] * repeated_word_idx)
                        repeated_word_location[1] += (increments[1] * repeated_word_idx)
                        
                        let overlap_location = [...current.path[x]]
                        let shift = [ (overlap_location[0] - repeated_word_location[0]),  (overlap_location[1] - repeated_word_location[1]) ]
                        let test_location = [(word.spot[0] + shift[0] ), (word.spot[1] + shift[1])]
                        if (!(isInBoundary(word.word, test_location, word.direction)) || isPathClear(word).length > 1) {
                            return false
                        }
                        word.spot = test_location
                        return true
                        
                    }
                }
            }
            return false
        }

    }

    function placeWord(word) {
        var increments = getDirection(word.direction)

        for (let x = 0; x < word.word.length; x++) {
            word.path.push([word.spot[0] + increments[0] * x, word.spot[1] + increments[1] * x])
            board[word.spot[0] + increments[0] * x][word.spot[1] + increments[1] * x] = word.word.charAt(x)
        }

    }

    function isInBoundary(word, startPoint, direction) {
        let increments = getDirection(direction)
        let len = word.length - 1
        
        if ((increments[0] < 0 && (startPoint[0] - len) < 0) ||
        (increments[0] > 0 && (startPoint[0] + len) > rows - 1) || 
        (increments[1] > 0 && (startPoint[1] + len) > cols - 1) || 
        (increments[1] < 0 && (startPoint[1] - len) < 0)) {
            return false
        }
        return true
    }

    function isPathClear(word) {
        let increments = getDirection(word.direction)
        let collisions = []
        for (let x = 0; x < word.word.length; x++) {
            if (board[word.spot[0] + x * increments[0]][word.spot[1] + x * increments[1]] !== null) {
                collisions.push( [word.spot[0] + x * increments[0], word.spot[1] + x * increments[1]] )
            }
        }
        return collisions
    }
    
    // ghost tavern scary horror thriller tragedy creepy blood nightmare halloween spooky pillow head decapitate nighttime dark terror curdling scream cream monster version tricky 
    var rows = dimension[0]
    var cols = dimension[1]

    let words = inputWords.split(' ').sort((a,b) => b.length - a.length)
    var all_spots = getBoard(rows, cols)
    var board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
    var occupied_spots = []
    var count = 0

    for ( let idx in words) {
        //save current board
        let current = all_spots
        let spot_idx = getRandomInt(current.length)

        var word = {
            word: words[idx].toUpperCase(),
            spot: current[spot_idx],
            direction: getRandomInt(8),
            path: []
        }

        validityLoop: while ( current.length > 0) { //check if location is valid
            count = 0
            while (count < 8) {
                if (isInBoundary(word.word, word.spot, word.direction)) {

                    let intersected = isPathClear(word)
                    if (intersected.length == 0 || (intersect && intersectWords(word, intersected))) {
                        placeWord(word)
                        break validityLoop
                    }
                } 
                word.direction = changeDirection(word.direction)
                count++
            }

            //invalid
            current.splice(spot_idx,1)
            spot_idx = getRandomInt(current.length)
            word.spot = current[spot_idx]
        }

        occupied_spots.push({
            word
        })
        current = all_spots.splice(all_spots.indexOf(word.spot),1)
        //if still invalid revert to previous board
    }

    let answer = JSON.parse(JSON.stringify(board))
    for (let j = 0; j < rows; j++) {
        for (let k = 0; k < cols; k++) {
            if (board[j][k] === null) {
                board[j][k] = generateChar()
            }
        }
    }

    return (
        <div className='container d-flex justify-content-center' id="toPrint">
            <div className="row">
                <div className="col my-1">
                    <WordBoard board={board} fSize={fSize} cellWidth={cellWidth} />
                </div>
                {answerChecked && <div className="col my-1" id="answerBoard">
                    <AnswerBoard answer={answer} fSize={fSize} cellWidth={cellWidth}/>
                </div>}
            </div>
        </div>
    );
}

