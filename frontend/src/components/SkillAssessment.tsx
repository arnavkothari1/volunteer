import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface AssessmentProps {
  pathId: string;
  questions: Question[];
  onComplete: (score: number) => void;
}

export const SkillAssessment: React.FC<AssessmentProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const score = calculateScore();
      onComplete(score);
    }
  };

  const calculateScore = () => {
    return Object.entries(answers).reduce((score, [questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      return score + (question?.correctAnswer === answer ? 1 : 0);
    }, 0);
  };

  return (
    <div className="skill-assessment">
      <h3>Skill Assessment</h3>
      <div className="question-card">
        <p>{questions[currentQuestion].text}</p>
        <div className="options">
          {questions[currentQuestion].options.map(option => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="option-button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 