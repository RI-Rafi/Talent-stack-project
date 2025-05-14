import React, { useState } from 'react';

function AddFriend() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const res = await fetch(/api/users/${userId});
    if (res.ok) setResult(await res.json());
    else setResult(null);
  };

  const handleSendRequest = async () => {
    await fetch('/api/friendrequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: result.name }) // or use userId
    });
    alert('Friend request sent!');
  };

  return (
    <div style={{ marginLeft: '40px' }}>
      <input
        value={userId}
        onChange={e => setUserId(e.target.value)}
        placeholder="Enter user ID"
        style={{ fontSize: '1.2rem', marginLeft: '10px' }}
      />
      <button
        onClick={handleSearch}
        style={{ fontSize: '1.2rem', marginLeft: '10px' }}
      >
        Search
      </button>
      {result && (
        <div style={{ fontSize: '1.3rem', marginLeft: '20px', marginTop: '16px' }}>
          <div>{result.name}</div>
          <button
            onClick={handleSendRequest}
            style={{ fontSize: '1.1rem', marginLeft: '10px', marginTop: '8px' }}
          >
            Send Friend Request
          </button>
        </div>
      )}
    </div>
  );
}

export default AddFriend;