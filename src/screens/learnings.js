import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import{
    getAuth,
    getStorage,
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbVGsGonMb49AVu8NLS-Ao_2ER475yqRU",
  authDomain: "talent-stack-3a2ab.firebaseapp.com",
  projectId: "talent-stack-3a2ab",
  storageBucket: "talent-stack-3a2ab.firebasestorage.app",
  messagingSenderId: "728976899951",
  appId: "1:728976899951:web:aa8a9787e26bbdd274f29a",
  measurementId: "G-34T4G7TBC4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const Learnings = () => {
    const [courses, setCourses] = useState([]);
    const [completionRate, setCompletionRate] = useState(0);

    // Fetch courses from Firestore
    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const coursesData = [];
            querySnapshot.forEach((doc) => {
                coursesData.push({ id: doc.id, ...doc.data() });
            });
            setCourses(coursesData);
            calculateCompletionRate(coursesData);
        };

        fetchCourses();
    }, []);

    // Calculate completion rate
    const calculateCompletionRate = (courses) => {
        const completedCourses = courses.filter((course) => course.completed).length;
        const totalCourses = courses.length;
        const rate = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
        setCompletionRate(rate.toFixed(2));
    };

    // Toggle course completion
    const toggleCompletion = async (courseId, currentStatus) => {
        const courseRef = doc(db, "courses", courseId);
        await updateDoc(courseRef, { completed: !currentStatus });

        const updatedCourses = courses.map((course) =>
            course.id === courseId ? { ...course, completed: !currentStatus } : course
        );
        setCourses(updatedCourses);
        calculateCompletionRate(updatedCourses);
    };

    return (
        <div style={{ marginLeft: "300px" }}>
            <h1>Course Tracker</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={course.completed}
                                onChange={() => toggleCompletion(course.id, course.completed)}
                            />
                            {course.name}
                        </label>
                    </li>
                ))}
            </ul>
            <h2>Completion Rate: {completionRate}%</h2>
        </div>
    );
};

export default Learnings;