import {v4 as uuid} from 'uuid'

export function WordTable() {

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

    // function intersectWords(startPt, word, increments, intersect_location, intersect_idx) {
    //     console.log(word + " intersected at " + intersect_location + " at index " + intersect_idx)
    //     // search for intersected word

    //     for (let i in occupied_spots) {
    //         let current = occupied_spots[i].word
    //         if (current.path.some(element => element.toString() == intersect_location.toString())) {
    //             //intersects with current.word
    //             console.log(current.word)
    //             //check if same letters

    //             for (let x = 0; x < current.word.length ; x++) {
    //                 // console.log(word.charAt(x))
    //                 if (word.includes(current.word.charAt(x))) {
                        
    //                 }
    //             }
    //         }
    //     }

    // }

    function placeWord(word) {
        var increments = getDirection(word.direction)

        for (let x = 0; x < word.word.length; x++) {
            word.path.push([word.spot[0] + increments[0] * x, word.spot[1] + increments[1] * x])
            board[word.spot[0] + increments[0] * x][word.spot[1] + increments[1] * x] = word.word.charAt(x)
        }

    }

    function checkBoundary(word) {
        
    }

    function checkLocation(word) {
        let count = 0
        let len = word.word.length - 1

        let row = word.spot[0]
        let col = word.spot[1]

        while (count < 8) {
        //check if available
            let increments = getDirection(word.direction)

            if ((increments[0] < 0 && (row - len) < 0) ||
            (increments[0] > 0 && (row + len) > rows - 1) || 
            (increments[1] > 0 && (col + len) > cols - 1) || 
            (increments[1] < 0 && (col - len) < 0)) {
                word.direction = changeDirection(word.direction)
                console.log('boundary fail')
            } else {
                let curr_row = row
                let curr_col = col
                for (let x = 0; x < word.word.length; x++) { //under works, for checking if the path is empty
                    if (board[curr_row][curr_col] !== null) {
                        // if (intersect) {intersectWords([row, col], word.word, word.direction, [curr_row, curr_col], x)}
                        return false
                    }
                    curr_row += increments[0]
                    curr_col += increments[1]
                } //==========================================================================================
                // placeWord(word.spot[0], word.spot[1], word.word, increments[0], increments[1])

                placeWord(word)
                return true
            }
            count++

        }
        return false
    }


    let words = ['ghost', 'tavern' , 'scary', 'horror', 'thriller', 'tragedy', 'creepy', 'blood', 'nightmare', 'halloween', 'spooky']
    words.sort((a,b) => b.length - a.length)

    var rows = 16
    var cols = 24

    var all_spots = getBoard(rows, cols)
    var board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
    var occupied_spots = [] //for sequence of what's already successfully placed [row, col, index of word in words]

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

        let valid = false

        while (!valid && current.length > 0) { //check if location is valid

            // valid = checkLocation(word.spot[0],word.spot[1], word.direction, word.word) //check and places
            valid = checkLocation(word) //check and places
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

    console.log(occupied_spots)

    let answer = JSON.parse(JSON.stringify(board))
    for (let j = 0; j < rows; j++) {
        for (let k = 0; k < cols; k++) {
            if (board[j][k] === null) {
                board[j][k] = generateChar()
            }
        }
    }

    return (
        <div>
            {/* <table>
                <tbody>
                        {board.map((innerArray) => ( 
                    <tr key={uuid()}>
                        {innerArray.map((item) => <td key={uuid()}>{item}</td>)}
                    </tr>
                ))}
                </tbody>
            </table> */}
            <span></span>
            <table>
                <tbody display="false">
                        {answer.map((innerArray) => ( 
                    <tr key={uuid()}>
                        {innerArray.map((item) => <td key={uuid()}>{item}</td>)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

