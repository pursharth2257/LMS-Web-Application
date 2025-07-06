import React, { useContext } from 'react';
import { ThemeContext } from '../../pages/Profiledashboard/ThemeContext'; 

const Assignments = () => {
  const { theme } = useContext(ThemeContext);

  const assignments = [
    { no: '01', task: 'Read Chapter 1-3', subject: 'English', dueDate: '12 May 2024', status: 'In Progress' },
    { no: '02', task: 'Complete Problem Set #5', subject: 'Maths', dueDate: '12 May 2024', status: 'Not Started' },
    { no: '03', task: 'Write Lab Report on Acid-Base Titration', subject: 'Physics', dueDate: '12 May 2024', status: 'In Progress' },
    { no: '04', task: 'Prepare for Oral Presentation', subject: 'Chemistry', dueDate: '12 May 2024', status: 'In Progress' },
    { no: '05', task: 'Create Art Piece for Final Project', subject: 'English', dueDate: '12 May 2024', status: 'Completed' },
    { no: '06', task: 'Write Research Paper on Climate Change', subject: 'EVS', dueDate: '12 May 2024', status: 'In Progress' },
    { no: '07', task: 'Complete Math Quiz on Algebra', subject: 'Math', dueDate: '12 May 2024', status: 'Completed' },
    { no: '08', task: 'Prepare for History Class Debate', subject: 'History', dueDate: '12 May 2024', status: 'Not Started' },
    { no: '09', task: 'Submit Final Design for Architecture Project', subject: 'Architecture', dueDate: '12 May 2024', status: 'In Progress' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return theme === 'dark' ? 'text-blue-400 bg-blue-900' : 'text-blue-600 bg-blue-100';
      case 'Not Started':
        return theme === 'dark' ? 'text-red-400 bg-red-900' : 'text-red-600 bg-red-100';
      case 'Completed':
        return theme === 'dark' ? 'text-green-400 bg-green-900' : 'text-green-600 bg-green-100';
      default:
        return theme === 'dark' ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`container mx-auto p-4 bg-gray-200 dark:bg-gray-800 rounded-lg ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Assignments</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by Subject"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <select className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option>Status by Subject</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-2 text-gray-800 dark:text-gray-200">No</th>
              <th className="p-2 text-gray-800 dark:text-gray-200">Task</th>
              <th className="p-2 text-gray-800 dark:text-gray-200">Subject</th>
              <th className="p-2 text-gray-800 dark:text-gray-200">Due Date</th>
              <th className="p-2 text-gray-800 dark:text-gray-200">Status</th>
              <th className="p-2 text-gray-800 dark:text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.no} className="border-t border-gray-300 dark:border-gray-600">
                <td className="p-2 text-gray-800 dark:text-gray-200">{assignment.no}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{assignment.task}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{assignment.subject}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{assignment.dueDate}</td>
                <td className={`p-2 ${getStatusColor(assignment.status)} rounded`}>{assignment.status}</td>
                <td className="p-2">
                  <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-800 dark:text-gray-200">Page 1 of 12</span>
        <div className="space-x-2">
          <button className="p-2 bg-gray-300 dark:bg-gray-600 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500">Previous</button>
          <button className="p-2 bg-gray-300 dark:bg-gray-600 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Assignments;