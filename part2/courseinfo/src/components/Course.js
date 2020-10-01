import React from 'react';

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
      const total = parts.reduce((sum, part) =>{
        sum+= part.exercises
        return sum;
      }, 0)
    return(
      <p><strong>total of {total} exercises</strong></p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
const Content = ({ parts }) => 
        parts.map(part => <div><Part key = {part.id} part = {part}/></div>)

const Course = ({course}) => {
    return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )
    

}

export default Course;