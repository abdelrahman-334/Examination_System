import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollmentController';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);


// Enroll a student (Instructors only)
router.post('/student', requireRole('Instructor'), EnrollmentController.enrollStudent);

// Get courses for a specific student (Accessible by that student or Instructors)
router.get('/student/:userName', EnrollmentController.getStudentCourses);

// Get all students in a course (Class Roster)
router.get('/course/:courseId/students', EnrollmentController.getCourseStudents);

// Un-enroll
router.delete('/student/:userName/course/:courseId', requireRole('Instructor'), EnrollmentController.deleteStudentEnrollment);

// Update/Move Student (Swap courses)
router.put('/student/:userName/change-course', requireRole('Instructor'), EnrollmentController.updateStudentEnrollment);

// Assign an instructor (Instructors/Admins)
router.post('/instructor', requireRole('Instructor'), EnrollmentController.assignInstructor);

// Get courses an instructor teaches
router.get('/instructor/:userName', EnrollmentController.getInstructorCourses);

// Un-assign
router.delete('/instructor/:userName/course/:courseId', requireRole('Instructor'), EnrollmentController.deleteInstructorAssignment);

export default router;