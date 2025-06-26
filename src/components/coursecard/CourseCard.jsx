import "./courseCard.css";

import { Button, Chip, Rating, Avatar } from "@mui/material";
import { currencyFormatter } from "@libs/utils";
import {
  useDeleteCourseMutation,
  useGetAuthUserQuery,
} from "@services/rootApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import {
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

const CourseCard = ({ course, courses, setCourses }) => {
  const activationToken = useSelector((state) => state.auth.token);
  const data = useGetAuthUserQuery(activationToken).data?.user;
  const navigate = useNavigate();
  const [deleteCourse] = useDeleteCourseMutation();
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(course._id).unwrap();
        setCourses(courses.filter((item) => item._id !== course._id));
        dispatch(
          openSnackbar({
            type: "success",
            message: "Course deleted successfully",
          }),
        );
      } catch (error) {
        console.error("Error deleting course:", error);
        dispatch(
          openSnackbar({ type: "error", message: "Failed to delete course" }),
        );
      }
    }
  };

  const getRandomRating = () => (Math.random() * 1 + 4).toFixed(1);
  const getRandomStudents = () => Math.floor(Math.random() * 500) + 50;

  return (
    <div className="course-card card card-hover group">
      {/* Course Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={`${import.meta.env.VITE_API_URL}/${course.image}`}
          alt={course.title}
          className="course-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Price Badge */}
        <div className="absolute right-4 top-4">
          <Chip
            label={currencyFormatter(course.price, "VND")}
            className="!bg-white !font-semibold !text-primary-600 !shadow-medium"
            size="small"
          />
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-large">
            <PlayIcon className="text-2xl text-primary-600" />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-col space-y-4 p-6">
        {/* Course Title */}
        <h3 className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <Avatar className="!h-8 !w-8 !bg-primary-100 !text-sm !text-primary-600">
            <PersonIcon className="!text-sm" />
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {course.createdBy}
            </p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
          <div className="flex items-center gap-1">
            <TimeIcon className="!text-gray-400" />
            <span className="!text-gray-500">{course.duration} weeks</span>
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <StarIcon className="text-warning-500" />
            <span>{getRandomRating()}</span>
          </div>
          <div className="flex items-center gap-1">
            <SchoolIcon className="text-gray-400" />
            <span>{getRandomStudents()} students</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Rating
            value={parseFloat(getRandomRating())}
            precision={0.1}
            size="small"
            readOnly
            className="!text-warning-500"
          />
          <span className="text-sm text-gray-600">
            ({getRandomStudents()} reviews)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {data ? (
            <>
              {data && data.role !== "admin" ? (
                <>
                  {data.subscription.includes(course._id) ? (
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="btn-success !flex-1"
                      startIcon={<PlayIcon />}
                    >
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="btn-primary !flex-1"
                      startIcon={<SchoolIcon />}
                    >
                      Enroll Now
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="btn-primary flex-1"
                  startIcon={<PlayIcon />}
                >
                  Study
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              className="btn-primary !flex-1"
              startIcon={<SchoolIcon />}
            >
              Login to Enroll
            </Button>
          )}

          {data && data.role === "admin" && (
            <Button
              variant="contained"
              className="btn-danger flex-1"
              onClick={deleteHandler}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
