import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({feedback, good, neutral, bad}) => {
  if(feedback === false){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  const calculatePositive = () => {
    return ((good * 100)/ (good + neutral + bad))  + " %";
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value = {good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={good + neutral + bad} />
        <Statistic text="average" value ={(good *1 + neutral * 0 + bad * (-1))/(good + neutral + bad)}/>
        <Statistic text="positive" value = {calculatePositive()}  />
      </tbody>
    </table>
  )
}

const Statistic = ({text,value}) =><tr><td>{text}</td><td>{value}</td></tr>


const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const App = () => {
  // set feedback to true
  const [feedback, setFeedback] = useState(false)
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1);
    setFeedback(true);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
    setFeedback(true);
  }

  const addBad = () => {
    setBad(bad + 1);
    setFeedback(true);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={addGood} text="good"/>
        <Button handleClick={addNeutral} text="neutral"/>
        <Button handleClick={addBad} text="bad"/>
      </div>
      <h1>statistics</h1>
      <Statistics feedback = {feedback} good={good} neutral = {neutral} bad = {bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)