import express from 'express';
// import { getAllCourses, getCourseById } from '../controllers/courseController.js';

// const courseRouter = express.Router();

// courseRouter.get('/all', getAllCourses);
// courseRouter.get('/:id', getCourseById);

// export default courseRouter;


import Course from '../models/Course.js';
// import Chapter from '../models/Chapter.js';
// import Lecture from '../models/Lecture.js';

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [{ model: Chapter, include: [Lecture] }] // Fetch related data
        });

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
    }
};

// Get course by ID
export const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findByPk(id, {
            include: [{ model: Chapter, include: [Lecture] }] // Fetch related data
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        res.status(500).json({ message: 'Failed to fetch course', error: error.message });
    }
};


