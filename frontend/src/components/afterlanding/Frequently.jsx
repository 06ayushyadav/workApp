

import React, { useState } from 'react';

function Frequently() {
  const [answers, setAnswers] = useState([false]);

  const toggleAnswer = (index) => {
    const updated = [...answers];
    updated[index] = !updated[index];
    setAnswers(updated);
  };

  const questionsAndAnswers = [
    {
      question: "What is the purpose of this Work Finder website?",
      answer:
        "The Work Finder website helps students and job seekers easily find internships and job opportunities based on their skills, interests, and location. It connects candidates with organizations offering relevant roles and provides a smooth application process.",
    },
    {
      question: "How can I apply for a job or internship?",
      answer:
        "You can easily apply for opportunities by navigating through the website’s navbar. We have dedicated sections for Jobs, Internships, and Free Courses. Simply visit the desired page, explore the listings, and click on the 'Apply Now' button to proceed.",
    },
    {
      question: "Can companies also post jobs or internships on this platform ?",
      answer:
        "Yes! Registered organizations can post new internships and job openings by filling out a detailed form on the platform, including role description, required skills, salary/stipend, application link, and even a tutorial video link if needed.",
    },
    {
      question: "Are there any free courses available?",
      answer:
        "Yes, we provide a section with Free Courses to help users upskill in various technical and professional domains. These courses are carefully selected and are completely free to access.",
    },
  ];

  return (
    <div className="h-fit mb-20 flex-col justify-center px-4">
      <div className="flex justify-center items-center text-4xl text-blue-950 mt-20 mb-10 font-serif text-center">
        Frequently Asked Questions
      </div>

      <div className="flex justify-center items-center gap-10 mb-10 flex-wrap w-full">
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center bg-orange-100 w-full sm:w-[80%] md:w-[40%] rounded-xl p-5 shadow-lg"
          >
            <div className="flex justify-between items-center w-full px-5">
              <div className="text-2xl">{item.question}</div>
              <button
                className="bg-blue-500 rounded-lg px-3 py-1 text-2xl font-bold m-2 text-white hover:bg-blue-400 active:bg-blue-600 transition-all duration-200"
                onClick={() => toggleAnswer(index)}
              >
                {answers[index] ? "-" : "+"}
              </button>
            </div>
            {answers[index] && (
              <div className="text-xl text-left w-full px-5 mt-3">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Frequently;
