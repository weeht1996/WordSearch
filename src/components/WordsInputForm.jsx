import { useState } from "react"

export function WordsInputForm({onClick, setAnswer, sendTitle, title}) {
    const [words, getWords] = useState("")
    const [intersect, setIntersect] = useState(true)
    const [answer, toggleAnswer] = useState(false)
    const [row, setRow] =useState(20)
    const [column, setColumn] =useState(20)

    function handleClick(e) {
        e.preventDefault()
        if (words === "") return
        onClick(words, intersect, [row, column], answer)
    }

    function handleAnswerClick(e) {
        toggleAnswer(e)
        setAnswer(!answer)
    }

    function handleNumberValidation(e) {
        const regex = /^[0-9\b]+$/
        if (regex.test(e.value) && e.value <= 60 && e.value >= 10) {
             e.id == "rowInput" ? setRow(e.value) : setColumn(e.value)
        }
    }

    function setTitle(e) {
        sendTitle(e)
    }

    return (
        
        <form>
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col">
                        Rows: <input type="number" min={10} max={100} className="form-control bg-dark text-white my-2" name="" id="rowInput" placeholder="10" value={row} onChange={e => handleNumberValidation(e.target)}/>
                    </div>
                    <div className="col">
                        Columns: <input type="number" min={10} max={100} className="form-control bg-dark text-white my-2" name="" id="colBtn" placeholder="16" value={column} onChange={e => handleNumberValidation(e.target)}/>
                    </div>
                </div>
                <div className="d-grid gap-2 mb-2">
                    <input type="text" className="form-control bg-dark text-white" onChange={e => setTitle(e.target.value)} placeholder="Title" value={title}></input>
                </div>
                <div className="row text-start">
                    <div className="col-9">
                        <textarea className="form-control bg-dark text-white" name="" id="" rows="5" value={words} onChange={e => getWords(e.target.value)} placeholder="Put the words you would like to have inside the box below (make sure they are separated by a space in between)"></textarea>
                    </div>
                    <div className="col-3 ">
                        <div className="row my-3 px-2 ">
                            <div className="form-check form-switch m-2">
                                <input className="form-check-input bg-dark" type="checkbox" name="intersection" id="intersection" checked={intersect} onChange={e => setIntersect(e.target.checked)}/> 
                                <label htmlFor="intersection">Enable Intersection</label>
                            </div>
                        </div>
                        <div className="row my-3 px-2 ">
                            <div className="form-check form-switch m-2">
                                <input className="form-check-input bg-dark" type="checkbox" name="answer" id="answer" checked={answer} onChange={e => handleAnswerClick(e.target.checked)}/> 
                            <label htmlFor="answer">Show Answers</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-dark" onClick={e => handleClick(e)}>Generate</button>
                </div>
                <div>
                    <button type="button" className="btn btn-dark mt-2" onClick={() => print()}>Print</button>
                </div>
            </div>

        </form>

        
    )
}