import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, onSnapshot, collection } from "firebase/firestore";

const predefinedCourses = [
  { title: "React for Beginners", description: "Learn the basics of React from scratch.", url: "https://www.freecodecamp.org/" },
  { title: "JavaScript Essentials", description: "Master JavaScript with this comprehensive guide.", url: "https://www.codecademy.com/" },
  { title: "HTML & CSS Fundamentals", description: "Build beautiful websites with HTML and CSS.", url: "https://www.w3schools.com/" },
  { title: "Python Programming", description: "Get started with Python programming.", url: "https://www.coursera.org/" },
  { title: "Data Structures & Algorithms", description: "Learn DSA to ace coding interviews.", url: "https://www.geeksforgeeks.org/" },
  { title: "Business Analysis & Process Management", description: "Analyze business processes and find solutions to existing business problems", url: "https://www.coursera.org/projects/business-analysis-process-management" },
];

const MyGrowth = () => {
  const [points, setPoints] = useState(0);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setPoints(userData.points || 0);
      }
    });


    const completionRef = collection(db, "users", user.uid, "completion");
    const unsubscribeCompletion = onSnapshot(completionRef, (snapshot) => {
      const completed = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().completed) {
          const courseId = doc.id; 
          const courseIndex = parseInt(courseId.split("-")[1]); // Extract index
          const userDocRef = doc(db, "users", user.uid);
          getDoc(userDocRef).then((userDoc) => {
            if (userDoc.exists()) {
              const userCourses = userDoc.data().courses || [];
              const courseTitle = userCourses[courseIndex];
              const course = predefinedCourses.find((c) => c.title === courseTitle) || {
                title: courseTitle,
                description: "No description available",
              };
              completed.push({ id: courseId, title: course.title, points: 10 });
            }
            setCompletedCourses(completed);
          });
        }
      });
    });


    return () => {
      unsubscribeUser();
      unsubscribeCompletion();
    };
  }, []);

  return (
    <div className="screen border" style={{ marginLeft: "270px" }}>
      <h1 className="courses-title">My Growth</h1>
      <div style={{ margin: "20px" }}>
        <h2>Total Points: {points}</h2>
        {completedCourses.length === 0 ? (
          <p>No courses completed yet.</p>
        ) : (
          <div className="courses-grid">
            {completedCourses.map((course) => (
              <div className="course-card" key={course.id}>
                <h3 className="course-title">{course.title}</h3>
                <p>Points Earned: {course.points}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGrowth;