import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="card" style={cardStyle}>
        <h2 style={titleStyle}>About TaskTracker</h2>
        <p style={paragraphStyle}>Welcome to TaskTracker, your all-in-one solution for managing tasks and tracking work progress!</p>
        <p style={paragraphStyle}>TaskTracker is designed to streamline task management for individuals and teams alike. Whether you're a freelancer, a small business owner, or part of a large corporation, TaskTracker can help you stay organized and productive.</p>
        <h3 style={subTitleStyle}>Key Features:</h3>
        <ul style={listStyle}>
          <li><strong>Task Management:</strong> Create, update, and delete tasks effortlessly. Keep track of important deadlines and milestones.</li>
          <li><strong>User Assignment:</strong> Assign tasks to specific team members or collaborators. Delegate responsibilities with ease.</li>
          <li><strong>Progress Tracking:</strong> Monitor the status of tasks in real-time. Stay informed about how much work is completed, pending, or overdue.</li>
          <li><strong>Customization:</strong> Tailor TaskTracker to your unique workflow with customizable task title, description, and percentage(%) completed.</li>
          <li><strong>Collaboration:</strong> Foster collaboration among team members with built-in communication features. Share updates, comments, and files directly within TaskTracker.</li>
          <li><strong>Accessibility:</strong> Access TaskTracker from any device, anywhere, anytime. Whether you're in the office, at home, or on the go, TaskTracker is always at your fingertips.</li>
        </ul>
        <h3 style={subTitleStyle}>Our Mission:</h3>
        <p style={paragraphStyle}>At TaskTracker, our mission is to empower individuals and teams to achieve their goals efficiently and effectively. We understand the challenges of modern work environments, and we're committed to providing intuitive tools that simplify task management and foster collaboration.</p>
        <p style={paragraphStyle}>Join thousands of satisfied users who rely on TaskTracker to streamline their workflows, enhance productivity, and achieve success. Try TaskTracker today and experience the difference!</p>
      </div>
    </div>
  );
}

// Inline CSS Styles
const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px',
  };
  
  const titleStyle = {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  };
  
  const subTitleStyle = {
    color: '#555',
    fontSize: '20px',
    marginBottom: '10px',
  };
  
  const paragraphStyle = {
    color: '#666',
    fontSize: '16px',
    marginBottom: '10px',
  };
  
  const listStyle = {
    color: '#666',
    fontSize: '16px',
    marginBottom: '20px',
  };
  
  export default About;