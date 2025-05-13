import React, { useState, useEffect } from "react";
import { db, auth } from "../backend/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const courses = [
    { title: "React for Beginners", description: "Learn the basics of React from scratch.", link: "https://www.freecodecamp.org/" },
    { title: "JavaScript Essentials", description: "Master JavaScript with this comprehensive guide.", link: "https://www.codecademy.com/" },
    { title: "HTML & CSS Fundamentals", description: "Build beautiful websites with HTML and CSS.", link: "https://www.w3schools.com/" },
    { title: "Python Programming", description: "Get started with Python programming.", link: "https://www.coursera.org/" },
    { title: "Data Structures & Algorithms", description: "Learn DSA to ace coding interviews.", link: "https://www.geeksforgeeks.org/" },
];

const Courses = () => {
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        const fetchUserCourses = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserCourses(userData.courses || []);
                }
            }
        };
        fetchUserCourses();
    }, []);

    const handleAddCourse = async (course) => {
        const user = auth.currentUser;
        if (!user) return alert("Please log in to add courses.");

        try {
            const userRef = doc(db, "users", user.uid);
            const updatedCourses = [...userCourses, course];
            await updateDoc(userRef, { courses: updatedCourses });
            setUserCourses(updatedCourses);
            alert("Course added successfully!");
        } catch (error) {
            alert("Failed to add course: " + error.message);
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
                        <a
                            className="course-link"
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Course
                        </a>
                        <button onClick={() => handleAddCourse(course.title)} style={{ marginTop: "10px" }}>
                            Add Course
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
