import React, { useState, useEffect } from "react";


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