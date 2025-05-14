
import { Learning } from "./learnings"; // Firebase logic from previous step

import React from "react";
import { auth, db } from "../backend/firebase"; // Adjust path to firebase.js
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore"; // Import Firestore functions
import { Link } from "react-router-dom"; 
const courses = [
    {
        title: "React for Beginners",
        description: "Learn the basics of React from scratch.",
        link: "https://www.freecodecamp.org/",
    },
    {
        title: "JavaScript Essentials",
        description: "Master JavaScript with this comprehensive guide.",
        link: "https://www.codecademy.com/",
    },
    {
        title: "HTML & CSS Fundamentals",
        description: "Build beautiful websites with HTML and CSS.",
        link: "https://www.w3schools.com/",
    },
    {
        title: "Python Programming",
        description: "Get started with Python programming.",
        link: "https://www.coursera.org/",
    },
    {
        title: "Data Structures & Algorithms",
        description: "Learn DSA to ace coding interviews.",
        link: "https://www.geeksforgeeks.org/",
    },
    {  title: "Business Analysis & Process Management",
        description: "Analyze business processes and find solutions to existing business problems",
        link: "https://www.coursera.org/projects/business-analysis-process-management",}
];

const addCourse = async (title, link) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User must be logged in to add courses.");
  }

  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    // Update existing document with new course
    await setDoc(
      userDocRef,
      {
        courses: arrayUnion(title), // Add course title to courses array
      },
      { merge: true }
    );
  } else {
    // Create new document if it doesn't exist
    await setDoc(userDocRef, {
      email: user.email,
      courses: [title],
      createdAt: new Date().toISOString(),
    });
  }
};

const Courses = () => {
  const handleAddLearning = async (course) => {
    try {
      await addCourse(course.title, course.link);
      alert(`Added "${course.title}" to your learning list.`);
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert(error.message || "Failed to add course. Please try again.");
    }
  };

  return (
    <div className="screen border" style={{ marginLeft: "270px" }}>
      <h1 className="courses-title">Explore Free Courses</h1>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                className="course-link"
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Course
              </a>
              <button
                className="course-add-button"
                onClick={() => handleAddLearning(course)}
              >
                Add to Learning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
