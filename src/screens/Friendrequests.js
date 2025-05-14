import React, { useEffect, useState } from 'react';

function FriendRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/friendrequest')
      .then(res => res.json())
      .then(setRequests);
  }, []);

  const acceptRequest = async (id) => {
    await fetch(/api/acceptrequest/${id}, { method: 'POST' });
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div style={{ marginLeft: '40px' }}>
      <h2 style={{ fontSize: '2rem', marginLeft: '10px' }}>Friend Requests</h2>
      {requests.length === 0 ? (
        <div style={{ fontSize: '1.3rem', marginLeft: '10px' }}>No requests</div>
      ) : (
        requests.map(r => (
          <div
            key={r.id}
            style={{ fontSize: '1.3rem', marginLeft: '10px', marginBottom: '12px' }}
          >
            {r.name}
            <button
              onClick={() => acceptRequest(r.id)}
              style={{ fontSize: '1.1rem', marginLeft: '16px' }}
            >
              Accept
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default FriendRequests;