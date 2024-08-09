import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setInterests((prevInterests) =>
        checked ? [...prevInterests, value] : prevInterests.filter((interest) => interest !== value)
      );
    } else {
      if (name === 'name') setName(value);
      if (name === 'email') setEmail(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(`Thank you, ${name}! Your form was submitted successfully. ${interests.length > 0 ? `Your interests: ${interests.join(', ')}.` : ''}`);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      {/* Newsletter Signup Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Interests:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="interest"
                value="React"
                onChange={handleChange}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                name="interest"
                value="JavaScript"
                onChange={handleChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="interest"
                value="CSS"
                onChange={handleChange}
              />
              CSS
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display submitted message */}
      {submittedMessage && <p>{submittedMessage}</p>}
    </main>
  );
}

export default App;
