import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.head}
      </h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <table>
      <tbody>
        <tr>
          <td width="50">
            {props.text}
          </td>
          <td>
           {props.value}
          </td>
          <td>
           {props.percent}
          </td>
        </tr>
      </tbody>
    </table>
  )
}



const Stats = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        <p>
          <b>{props.stats}</b>
        </p>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  return(
    <div>
      <h2>
        {props.stats}
      </h2>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} percent={'%'} />
    </div>
  )
}

const App = () => {
  const head = 'Give feedback'
  const stats = 'Statistics'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = ((good-bad)/3).toFixed(1)
  const positive = good === 0 ? 0 : ((good/all)*100).toFixed(1);
  const [allClicks, setAll] = useState(0)
  const handleClick = (text) => {
    setAll(allClicks + 1)
    if (text.localeCompare('good') === 0) {
      setGood(good + 1)
    } else if (text.localeCompare('neutral') === 0) {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Header head={head} />
      <Button handleClick={() => handleClick('good')} text='good' />
      <Button handleClick={() => handleClick('neutral')} text='neutral' />
      <Button handleClick={() => handleClick('bad')} text='bad' />
      <Stats stats={stats} good={good} neutral={neutral} bad={bad} all={all}
      average={average} positive={positive} allClicks={allClicks} />
    </div>
  )
}

export default App
