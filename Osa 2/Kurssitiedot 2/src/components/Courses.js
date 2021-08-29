import React from 'react'

const Header = ({course}) => {
  return (
    <div>
      <h1>
        {course}
      </h1>
    </div>
  )
}

const Courses = ({courses}) => {
  return (courses.map(course =>
      <div key={course.id}>
        <Header course={course.name} />
        <Content course={course} />
        <Total parts={course.parts} />
      </div>
    )
  )
}

const Content = ({course}) => {
  return (course.parts.map(part => 
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    )
  )
}

const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const total = (sum, current) => (sum + current)
  return (
      <p>
        Total number of exercises {exercises.reduce(total)}
      </p>
  )
}

export default Courses