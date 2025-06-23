import { useSelector } from "react-redux";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetDetailCourseQuery } from "@services/rootApi";
import {
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import {
  Button,
  Avatar,
  Rating,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";

const CourseStudy = () => {
  const params = useParams();
  const user = useSelector((state) => state.auth.userInfo.user);
  const navigate = useNavigate();
  const course = useGetDetailCourseQuery(params.id)?.data?.course;

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <SchoolIcon className="text-3xl text-gray-400" />
          </div>
          <Typography variant="h5" className="mb-2 text-gray-900">
            Loading course...
          </Typography>
        </div>
      </div>
    );
  }

  const courseStats = [
    { icon: TimeIcon, label: "Duration", value: `${course.duration} weeks` },
    { icon: StarIcon, label: "Rating", value: "4.8" },
    { icon: PersonIcon, label: "Students", value: "1,234" },
    { icon: CheckIcon, label: "Level", value: "Beginner" },
  ];

  return (
    <div className="course-study-page min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="from-primary-600 to-secondary-600 bg-gradient-to-r py-16">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Course Image */}
            <div className="relative">
              <div className="shadow-large relative overflow-hidden rounded-3xl">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${course.image}`}
                  alt={course.title}
                  className="h-80 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="shadow-large flex h-20 w-20 items-center justify-center rounded-full bg-white/90">
                    <PlayIcon className="text-primary-600 text-3xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  <SchoolIcon />
                  Active Course
                </div>
                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                  {course.title}
                </h1>
                <p className="text-primary-100 text-xl leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center gap-4">
                <Avatar className="!bg-primary-100 !text-primary-600 !h-12 !w-12">
                  <PersonIcon />
                </Avatar>
                <div>
                  <p className="font-medium text-white">{course.createdBy}</p>
                  <p className="text-primary-100 text-sm">Course Instructor</p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4">
                {courseStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                        <Icon className="text-lg text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{stat.value}</p>
                        <p className="text-primary-100 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to={`/lectures/${course._id}`}
                  className="!text-primary-600 shadow-large !bg-white !px-8 !py-3 hover:!bg-gray-100"
                  startIcon={<PlayIcon />}
                >
                  Start Learning
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="!border-white !text-white hover:!bg-white/10"
                  startIcon={<DescriptionIcon />}
                >
                  Course Overview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* About This Course */}
              <Card className="card">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-xl">
                      <DescriptionIcon className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        About This Course
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        What you&apos;ll learn in this course
                      </Typography>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="leading-relaxed text-gray-700">
                      {course.description}
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        "Comprehensive learning materials",
                        "Hands-on practical exercises",
                        "Expert instructor guidance",
                        "Certificate upon completion",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckIcon className="text-success-500 text-lg" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Progress */}
              <Card className="card">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="bg-success-100 flex h-10 w-10 items-center justify-center rounded-xl">
                      <TrendingIcon className="text-success-600 text-xl" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        Your Progress
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Track your learning journey
                      </Typography>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">
                        Overall Progress
                      </span>
                      <span className="text-primary-600 font-bold">0%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={0}
                      className="!h-3 !rounded-full"
                      sx={{
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#3B82F6",
                        },
                        backgroundColor: "#E5E7EB",
                      }}
                    />

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="rounded-xl bg-gray-50 p-4">
                        <div className="text-primary-600 text-2xl font-bold">
                          0
                        </div>
                        <div className="text-sm text-gray-600">Lectures</div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4">
                        <div className="text-success-600 text-2xl font-bold">
                          0
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4">
                        <div className="text-warning-600 text-2xl font-bold">
                          0
                        </div>
                        <div className="text-sm text-gray-600">Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Rating */}
              <Card className="card">
                <CardContent className="p-6">
                  <div className="space-y-4 text-center">
                    <div className="text-3xl font-bold text-gray-900">4.8</div>
                    <Rating
                      value={4.8}
                      precision={0.1}
                      readOnly
                      className="!text-warning-500"
                    />
                    <p className="text-sm text-gray-600">
                      Based on 1,234 reviews
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card className="card">
                <CardContent className="p-6">
                  <Typography variant="h6" className="mb-4 font-semibold">
                    Course Features
                  </Typography>
                  <div className="space-y-3">
                    {[
                      { label: "Lifetime Access", icon: CheckIcon },
                      { label: "Certificate", icon: CheckIcon },
                      { label: "Mobile Friendly", icon: CheckIcon },
                      { label: "Downloadable", icon: CheckIcon },
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Icon className="text-success-500 text-lg" />
                          <span className="text-gray-700">{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card">
                <CardContent className="p-6">
                  <Typography variant="h6" className="mb-4 font-semibold">
                    Quick Actions
                  </Typography>
                  <div className="space-y-3">
                    <Button
                      variant="contained"
                      fullWidth
                      component={Link}
                      to={`/lectures/${course._id}`}
                      className="btn-primary"
                      startIcon={<PlayIcon />}
                    >
                      Continue Learning
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      className="btn-secondary"
                      startIcon={<DescriptionIcon />}
                    >
                      Download Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseStudy;
