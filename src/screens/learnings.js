import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const Learning = () => {
  const [courses, setCourses] = useState([]);
  const [completionStatus, setCompletionStatus] = useState({});

  const fetchCourses = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userCoursesRef = collection(db, "users", user.uid, "courses");
    const courseSnapshot = await getDocs(userCoursesRef);
    const coursesData = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(coursesData);

    // Listen to completion status in real time
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
import { db, auth } from './firebase';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

export async function addCourse(title, url) {
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  const courseRef = doc(collection(db, 'users', user.uid, 'courses'));
  await setDoc(courseRef, {
    title,
    url,
    addedAt: serverTimestamp(),
  });

  return courseRef.id;
}