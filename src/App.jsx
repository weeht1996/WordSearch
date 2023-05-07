import { useRef, useState } from "react"
import './App.css'
import { WordTable } from "./components/WordTable"
import { WordsInputForm } from "./components/WordsInputForm"
import { WordDisplay } from "./components/WordDisplay"


export default function App() {
  const [isGenerated, setIsGenerated] = useState(false)
  const [words, setWords] = useState("")
  const [intersect, isIntersect] = useState(false)
  const [show, setShowAnswer] = useState(true)
  const [dimension, setDimension] = useState([20,20])
  const [title, setTitle] = useState('Title')
  const [fSize, setFontSize] = useState(16)
  const [cellWidth, setCellWidth] = useState(26)

  function generateWordSearch(words, intersected, dimension, toggle) {
    setDimension(dimension)
    isIntersect(intersected)
    setShowAnswer(toggle)
    setIsGenerated(true)
    setWords(words)
    setFontSize(16 - (Math.max(...dimension) - 20) * 0.2 )
    setCellWidth(fSize * 1.5 + 2)
  }

  function setAnswerVisibility(isVisible) {
    setShowAnswer(isVisible)
  }

  function sendTitle(newTitle) {
    setTitle(newTitle)
  }

  return (
    <>
    <div id="content">
      <h1 id="header">Word Search Generator</h1>
      <h1 id="title" ><u>{title}</u></h1>
      { isGenerated && <WordTable inputWords = {words} intersect={intersect} dimension={dimension} answerChecked={show} fSize={fSize} cellWidth={cellWidth} />}
    </div>
    <div id="hide">
      
    <h2 className='header'>Input words</h2>
    <p>(Seperate words with spaces)</p>
    <WordsInputForm onClick={generateWordSearch} setAnswer={setAnswerVisibility} sendTitle={sendTitle} title={title}/>
    </div>
    </>
  )
}
