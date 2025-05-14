const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;

const express = require('express');
const router = express.Router();
import { db } from './draft of my code.js';

// Get all users
router.get('/users', async (req, res) => {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
});

// Add a user (example)
router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const docRef = await db.collection('users').add({ name, email, friends: [], requests: [] });
    res.json({ id: docRef.id, name, email, friends: [], requests: [] });
});

// Get a user's friends
router.get('/:id/friends', async (req, res) => {
    const userDoc = await db.collection('users').doc(req.params.id).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });
    const user = userDoc.data();
    const friends = [];
    for (const friendId of user.friends || []) {
        const friendDoc = await db.collection('users').doc(friendId).get();
        if (friendDoc.exists) friends.push({ id: friendDoc.id, ...friendDoc.data() });
    }
    res.json(friends);
});

// Get all friends
router.get('/friendlist', async (req, res) => {
    const snapshot = await db.collection('FriendList').get();
    const friends = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(friends);
});

// Add a friend to the friend list
router.post('/friendlist', async (req, res) => {
    const { name } = req.body;
    const docRef = await db.collection('FriendList').add({ name, addedAt: new Date() });
    res.json({ id: docRef.id, name });
});

// Get all friend requests
router.get('/friendrequest', async (req, res) => {
    const snapshot = await db.collection('FriendRequest').get();
    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(requests);
});

// Add a friend request
router.post('/friendrequest', async (req, res) => {
    const { name } = req.body;
    const docRef = await db.collection('FriendRequest').add({ name, requestedAt: new Date() });
    res.json({ id: docRef.id, name });
});

// Accept a friend request (move from FriendRequest to FriendList)
router.post('/acceptrequest/:id', async (req, res) => {
    const requestId = req.params.id;
    const requestDoc = await db.collection('FriendRequest').doc(requestId).get();
    if (!requestDoc.exists) return res.status(404).json({ error: "Request not found" });
    const { name } = requestDoc.data();

    // Add to FriendList
    await db.collection('FriendList').add({ name, addedAt: new Date() });
    // Remove from FriendRequest
    await db.collection('FriendRequest').doc(requestId).delete();

    res.json({ message: "Friend added!" });
});

// ...add similar logic for requests, sending/accepting requests, etc.

module.exports = router;