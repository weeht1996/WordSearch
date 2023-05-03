import { useState } from "react"
import './App.css'
import { WordTable } from "./components/WordTable"
import { WordsInputForm } from "./components/WordsInputForm"
import { WordDisplay } from "./components/WordDisplay"


export default function App() {
  const [isGenerated, setIsGenerated] = useState(false)
  const [words, setWords] = useState("")
  const [intersect, isIntersect] = useState(false)
  const [show, setShowAnswer] = useState(true)
  const [dimension, setDimension] = useState([10,16])
  const [title, setTitle] = useState('Title')

  function generateWordSearch(words, intersected, dimension, toggle) {
    setDimension(dimension)
    isIntersect(intersected)
    setShowAnswer(toggle)
    setIsGenerated(true)
    setWords(words)
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
      <h1 id="title"><u>{title}</u></h1>
      { isGenerated && <WordTable inputWords = {words} intersect={intersect} dimension={dimension} answerChecked={show}/>}
      { isGenerated && <WordDisplay words = {words}/>}

    </div>
    <div id="hide">
      
    <h2 className='header'>Input words</h2>
    <WordsInputForm onClick={generateWordSearch} setAnswer={setAnswerVisibility} sendTitle={sendTitle} title={title}/>
    </div>
    </>
  )
}
