// import Course from "../models/course.model.js";
// import { Course, User } from "../models/idx.js";
import { Course, User, Lecture } from "../models/idx.js";
// import Course from "../models/course.model.js";
// import Lecture from "../models/lecture.model.js"; // For eager loading lectures
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
//---------------------------------------------
// import { Course, Lecture } from "../models/idx.js";
// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";


export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required",
        success: false,
      });
    }
    
    // Note: In our Sequelize Course model, the foreign key for the creator is "creatorId"
    const course = await Course.create({
      courseTitle,
      category,
      creatorId: req.id, // Ensure that req.id is set by your authentication middleware
    });
    
    return res.status(201).json({
      success: true,
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create course",
      success: false,
    });
  }
};


export const getPublishedCourse = async (_, res) => {
    try {
      const courses = await Course.findAll({
        where: { isPublished: true }, //true cha course not found bhancha  false vaye pachi sab course show garcha
        include: [{
          model: User,
          as: "creator", // This must match the alias defined in idx.js
          attributes: ["name", "photoUrl", "description"],
        }],
      });
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({
          message: "Course not found"
        });
      }
  
      return res.status(200).json({
        success: true,
        courses,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to get course",
        success: false,
      });
    }
};


export const getCreatorCourses = async (req, res) => {
    try {
        console.log("Authenticated user ID:", req.id); // <-- Insert this line
      const userId = req.id;
      if (!userId) {
        return res.status(400).json({
          message: "User ID is missing. Make sure you're authenticated.",
          success: false,
        });
      }
  
      const courses = await Course.findAll({
        where: { creatorId: userId },
        include: [{
          model: Lecture,
          as: "lectures",
        }],
      });
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({
          message: "Courses not found",
          courses: [],
          success: false,
        });
      }
  
      return res.status(200).json({
        success: true,
        courses,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Failed to get course",
        success: false,
      });
    }
};
  

// export const editCourse = async (req, res) => {
//     try {
//       const courseId = req.params.courseId;
//       const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
//       const file = req.file;
  
//       // Find the course by its primary key and include lectures (if needed)
//       let course = await Course.findByPk(courseId, {
//         include: [{ model: Lecture, as: "lectures" }]
//       });
  
//       if (!course) {
//         return res.status(404).json({
//           message: "Course not found!"
//         });
//       }
  
//       let courseThumbnail;
//       if (file) {
//         const fileUri = getDataUri(file);
//         courseThumbnail = await cloudinary.uploader.upload(fileUri);
//       }
  
//       // Normalize courseLevel to have the first letter capitalized, if provided
//       let normalizedCourseLevel = courseLevel;
//       if (courseLevel) {
//         normalizedCourseLevel = courseLevel.charAt(0).toUpperCase() + courseLevel.slice(1).toLowerCase();
//       }
  
//       const updateData = {
//         courseTitle,
//         subTitle,
//         description,
//         category,
//         courseLevel: normalizedCourseLevel,
//         coursePrice,
//         courseThumbnail: courseThumbnail ? courseThumbnail.secure_url : course.courseThumbnail
//       };
  
//       await course.update(updateData);
  
//       return res.status(200).json({
//         success: true,
//         course,
//         message: "Course updated successfully"
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         message: "Failed to update course",
//         success: false
//       });
//     }
// };
  


export const editCourse = async (req, res) => {
    try {
      // Change to match the route parameter
      const courseId = req.params.id;
      const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
      const file = req.file;
  
      // Find the course by its primary key and include lectures (if needed)
      let course = await Course.findByPk(courseId, {
        include: [{ model: Lecture, as: "lectures" }]
      });
  
      if (!course) {
        return res.status(404).json({
          message: "Course not found!"
        });
      }
  
      let courseThumbnail;
      if (file) {
        const fileUri = getDataUri(file);
        courseThumbnail = await cloudinary.uploader.upload(fileUri);
      }
  
      // Normalize courseLevel to have the first letter capitalized, if provided
      let normalizedCourseLevel = courseLevel;
      if (courseLevel) {
        normalizedCourseLevel = courseLevel.charAt(0).toUpperCase() + courseLevel.slice(1).toLowerCase();
      }
  
      const updateData = {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel: normalizedCourseLevel,
        coursePrice,
        courseThumbnail: courseThumbnail ? courseThumbnail.secure_url : course.courseThumbnail
      };
  
      await course.update(updateData);
  
      return res.status(200).json({
        success: true,
        course,
        message: "Course updated successfully"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to update course",
        success: false
      });
    }
};


export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to get course",
      success: false,
    });
  }
};


//   yo bhanda mathi courseController ko complete cha 
// ------------------------------------------------------------------------------------------------------------------


export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title and courseId are required",
        success: false,
      });
    }

    // Create a lecture instance
    const lecture = await Lecture.create({ lectureTitle });

    // Find the course using the primary key (Sequelize's equivalent of Mongoose's findById)
    const course = await Course.findByPk(courseId);
    if (course) {
      // Associate the lecture with the course using the association method
      await course.addLecture(lecture);
    }

    return res.status(201).json({
      success: true,
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create Lecture",
      success: false,
    });
  }
};



export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    // Use findByPk to get the course and include its associated lectures
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Lecture,
          as: "lectures", // This alias must match the one defined in your association
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to get Lectures",
    });
  }
};



export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    // Fetch lecture by primary key
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    // Update lecture fields if provided
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree;

    await lecture.save(); // Save updates

    // Fetch the course along with its associated lectures
    const course = await Course.findByPk(courseId, {
      include: [{ model: Lecture, as: "lectures" }],
    });

    // If the course exists and the lecture is not already associated, associate it.
    if (course && !course.lectures.some((lec) => lec.id === lecture.id)) {
      await course.addLecture(lecture);
    }

    return res.status(200).json({
      success: true,
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to edit lecture",
      success: false,
    });
  }
};



export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    // Find the lecture by primary key (Sequelize's equivalent of findByIdAndDelete)
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!"
      });
    }
    
    // Delete the lecture record.
    await lecture.destroy();

    // Since the association is managed via a foreign key (courseId) in Lecture,
    // there's no need to manually update the Course to remove the lecture reference.
    // If you had a join table, Sequelize's association methods would handle that automatically.

    return res.status(200).json({
      success: true,
      message: "Lecture removed successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to remove lecture"
    });
  }
};



export const togglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    // Optionally, you can use publish from req.query if needed.
    // const { publish } = req.query; // Not used in this logic

    // Use findByPk to fetch the course by its primary key
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!"
      });
    }

    // Toggle the published status
    course.isPublished = !course.isPublished;
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Course is ${statusMessage}`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update status"
    });
  }
};




