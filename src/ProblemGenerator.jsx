import React, { useState } from 'react';
import ProblemRow from './ProblemRow';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomOperator = (operators) => operators[Math.floor(Math.random() * operators.length)];
const evaluateProblem = (num1, num2, operator) => {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return (num1 / num2).toFixed(2);
    default: return null;
  }
};

const generateEasyProblem = () => {
  let num1 = getRandomInt(1, 10);
  let num2 = getRandomInt(1, 10);
  const operator = getRandomOperator(['+', '-']);
  if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];
  const result = evaluateProblem(num1, num2, operator);
  return { num1, num2, operator, result };
};

const generateMediumProblem = () => {
  const num1 = getRandomInt(10, 50);
  const num2 = getRandomInt(10, 50);
  const operator = getRandomOperator(['+', '-', '*']);
  const result = evaluateProblem(num1, num2, operator);
  return { num1, num2, operator, result };
};

const generateHardProblem = () => {
  const num1 = getRandomInt(50, 100);
  const num2 = getRandomInt(50, 100);
  const operator = getRandomOperator(['+', '-', '*', '/']);
  const result = evaluateProblem(num1, num2, operator);
  return { num1, num2, operator, result };
};

const pickInputCell = () => getRandomInt(1, 3);

const ProblemGenerator = () => {
  const [level, setLevel] = useState('easy');
  const [numProblems, setNumProblems] = useState(10);
  const [problems, setProblems] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const generateProblems = () => {
    const newProblems = [];
    const newCorrectAnswers = [];

    for (let i = 0; i < numProblems; i++) {
      let problem;
      switch (level) {
        case 'easy':
          problem = generateEasyProblem();
          break;
        case 'medium':
          problem = generateMediumProblem();
          break;
        case 'hard':
          problem = generateHardProblem();
          break;
        default:
          problem = generateEasyProblem();
      }

      const format = pickInputCell();
      newProblems.push({ ...problem, format });
      newCorrectAnswers.push(
        format === 1 ? problem.result :
        format === 2 ? problem.num1 : problem.num2
      );
    }

    setProblems(newProblems);
    setCorrectAnswers(newCorrectAnswers);
  };

  const checkAnswers = () => {
    problems.forEach((problem, index) => {
      const userAnswer = parseFloat(problem.userAnswer || 0);
      const correctAnswer = correctAnswers[index];
      problem.isCorrect = userAnswer === correctAnswer;
    });
    setProblems([...problems]);
  };

  return (
    <div>
      <label>
        Choose Level:
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label>
        Number of Problems:
        <input
          type="number"
          value={numProblems}
          onChange={(e) => setNumProblems(parseInt(e.target.value))}
          min="1"
          max="50"
        />
      </label>
      <button onClick={generateProblems}>Generate</button>
      <table>
        <tbody>
          {problems.map((problem, index) => (
            <ProblemRow
              key={index}
              problem={problem}
              onAnswerChange={(answer) => {
                problem.userAnswer = answer;
                setProblems([...problems]);
              }}
            />
          ))}
        </tbody>
      </table>
      <button onClick={checkAnswers}>Check Answers</button>
    </div>
  );
};

export default ProblemGenerator;