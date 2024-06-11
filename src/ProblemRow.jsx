import React from 'react';

const ProblemRow = ({ problem, onAnswerChange }) => {
  return (
    <tr>
      <td>
        {problem.format === 2 ? (
          <input
            type="text"
            onChange={(e) => onAnswerChange(e.target.value)}
            style={{
              backgroundColor: problem.isCorrect === undefined
                ? 'white'
                : problem.isCorrect
                ? 'lightgreen'
                : 'lightcoral'
            }}
          />
        ) : (
          problem.num1
        )}
      </td>
      <td>{problem.operator}</td>
      <td>
        {problem.format === 3 ? (
          <input
            type="text"
            onChange={(e) => onAnswerChange(e.target.value)}
            style={{
              backgroundColor: problem.isCorrect === undefined
                ? 'white'
                : problem.isCorrect
                ? 'lightgreen'
                : 'lightcoral'
            }}
          />
        ) : (
          problem.num2
        )}
      </td>
      <td>=</td>
      <td>
        {problem.format === 1 ? (
          <input
            type="text"
            onChange={(e) => onAnswerChange(e.target.value)}
            style={{
              backgroundColor: problem.isCorrect === undefined
                ? 'white'
                : problem.isCorrect
                ? 'lightgreen'
                : 'lightcoral'
            }}
          />
        ) : (
          problem.result
        )}
      </td>
    </tr>
  );
};

export default ProblemRow;
