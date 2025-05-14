import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
// Predefined courses from courses.js for reference

const predefinedCourses = [
  { title: "React for Beginners", description: "Learn the basics of React from scratch.", url: "https://www.freecodecamp.org/" },
  { title: "JavaScript Essentials", description: "Master JavaScript with this comprehensive guide.", url: "https://www.codecademy.com/" },
  { title: "HTML & CSS Fundamentals", description: "Build beautiful websites with HTML and CSS.", url: "https://www.w3schools.com/" },
  { title: "Python Programming", description: "Get started with Python programming.", url: "https://www.coursera.org/" },
  { title: "Data Structures & Algorithms", description: "Learn DSA to ace coding interviews.", url: "https://www.geeksforgeeks.org/" },
];

const Learning = () => {
  const [courses, setCourses] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({});

  const fetchCourses = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // Fetch the user's courses array from users/{user.uid}
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    let userCourses = [];
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userCourses = userData.courses || [];
    }

    // Map course titles to full course objects using predefinedCourses
    const enrichedCourses = userCourses.map((title, index) => {
      const course = predefinedCourses.find(c => c.title === title) || { title, url: "#", description: "No description available" };
      return {

        id: `course-${index}`, title: course.title, url: course.url, description: course.description };
    });
    setCourses(enrichedCourses);

    // Listen to comple
    // tion status in real time
    const completionRef = collection(db, "users", user.uid, "completion");
    onSnapshot(completionRef, snapshot => {
      const completed = {};
      snapshot.docs.forEach(doc => {
        completed[doc.id] = doc.data().completed;
      });
      setCompletionStatus(completed);
    });
  };

  const markAsCompleted = async (courseId) => {
    const user = auth.currentUser;
    if (!user) return;

    const completionRef = doc(db, "users", user.uid, "completion", courseId);
    await setDoc(completionRef, { completed: true });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (

    <div className="screen border" style={{ marginLeft: "270px" }}>

      <h1 className="courses-title">My Learning Courses</h1>
      {courses.length === 0 ? (
        <p>You haven’t added any courses yet.</p>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div className="course-card" key={course.id}>
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <a
                className="course-link"
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Course
              </a>
              <div style={{ marginTop: "10px" }}>
                {completionStatus[course.id] ? (
                  <span style={{ color: "green", fontWeight: "bold" }}>✅ Completed</span>
                ) : (
                  <button
                    className="course-add-button"
                    onClick={() => markAsCompleted(course.id)}
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Learning;