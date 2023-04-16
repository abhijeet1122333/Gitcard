import React, { useState } from 'react';


const GitHubCard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch GitHub user data based on the entered username
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching GitHub user data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter  username"
        />
        <button type="submit">Search</button>
      </form>
      {userInfo ? (
        <div>
          <img src={userInfo.avatar_url} alt="Avatar" />
          <h2>Username: {userInfo.login}</h2>
          {userInfo.name && <h3>Name: {userInfo.name}</h3>}
          <p>No. of Public Repos: {userInfo.public_repos}</p>
          <p>No. of Public Gists: {userInfo.public_gists}</p>
          <p>Profile Created at: {new Date(userInfo.created_at).toLocaleDateString('en-US')}</p>
        </div>
      ) : (
        <p>Enter a valid  username to see the user's public information</p>
      )}
    </div>
  );
};

export default GitHubCard;