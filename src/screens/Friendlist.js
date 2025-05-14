import React, { useEffect, useState } from 'react';

function FriendList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch('/api/friendlist')
      .then(res => res.json())
      .then(setFriends);
  }, []);

  return (
    <div style={{ marginLeft: '40px' }}>
      <h2 style={{ fontSize: '2rem', marginLeft: '10px' }}>Friends</h2>
      {friends.length === 0 ? (
        <div style={{ fontSize: '1.3rem', marginLeft: '10px' }}>No friends yet</div>
      ) : (
        friends.map(f => (
          <div key={f.id} style={{ fontSize: '1.3rem', marginLeft: '10px', marginBottom: '8px' }}>
            {f.name}
          </div>
        ))
      )}
    </div>
  );
}

export default FriendList;