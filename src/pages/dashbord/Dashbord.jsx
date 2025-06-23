import "./dashbord.css";

import { useGetMyCoursesQuery } from "@services/rootApi";
import {
  School as SchoolIcon,
  TrendingUp as TrendingIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashbord = () => {
  const mycourse = useGetMyCoursesQuery()?.data?.courses;
  const navigate = useNavigate();

  // Calculate dashboard statistics
  const totalCourses = mycourse?.length || 0;
  const completedCourses =
    mycourse?.filter((course) => course.progress === 100)?.length || 0;
  const inProgressCourses = totalCourses - completedCourses;
  const averageProgress =
    mycourse?.reduce((acc, course) => acc + (course.progress || 0), 0) /
      totalCourses || 0;

  const stats = [
    {
      icon: SchoolIcon,
      value: totalCourses,
      label: "Enrolled Courses",
      color: "primary",
    },
    {
      icon: CheckIcon,
      value: completedCourses,
      label: "Completed",
      color: "success",
    },
    {
      icon: PlayIcon,
      value: inProgressCourses,
      label: "In Progress",
      color: "warning",
    },
    {
      icon: StarIcon,
      value: `${averageProgress.toFixed(1)}%`,
      label: "Average Progress",
      color: "secondary",
    },
  ];

  const recentActivity = [
    {
      type: "course_started",
      title: "React Fundamentals",
      time: "2 hours ago",
      icon: PlayIcon,
    },
    {
      type: "course_completed",
      title: "JavaScript Basics",
      time: "1 day ago",
      icon: CheckIcon,
    },
    {
      type: "course_enrolled",
      title: "Advanced CSS",
      time: "3 days ago",
      icon: SchoolIcon,
    },
  ];

  return (
    <div className="student-dashboard">
      {/* Header */}
      <section className="from-primary-600 to-secondary-600 bg-gradient-to-r py-12">
        <div className="container-custom">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              My Learning Dashboard
            </h1>
            <p className="text-primary-100 mx-auto max-w-2xl text-xl">
              Track your progress, manage your courses, and continue your
              learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="card-hover">
                  <CardContent className="space-y-3 text-center">
                    <div
                      className={`h-12 w-12 bg-${stat.color}-100 mx-auto flex items-center justify-center rounded-xl`}
                    >
                      <Icon className={`text-${stat.color}-600 text-xl`} />
                    </div>
                    <div>
                      <Typography
                        variant="h4"
                        className="font-bold text-gray-900"
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {stat.label}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Courses Section */}
            <div className="lg:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-gray-900">
                    My Courses
                  </h2>
                  <p className="text-gray-600">Continue where you left off</p>
                </div>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/courses")}
                  className="btn-secondary"
                >
                  Browse More Courses
                </Button>
              </div>

              {mycourse && mycourse.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {mycourse.map((course) => (
                    <div key={course._id} className="card space-y-4 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            {course.title}
                          </h3>
                          <p className="mb-3 text-sm text-gray-600">
                            Instructor: {course.createdBy}
                          </p>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">
                                {course.progress || 0}%
                              </span>
                            </div>
                            <LinearProgress
                              variant="determinate"
                              value={course.progress || 0}
                              className="!h-2 !rounded-full"
                              sx={{
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: "#3B82F6",
                                },
                                backgroundColor: "#E5E7EB",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <TimeIcon className="text-gray-400" />
                            <span>{course.duration} weeks</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="text-warning-500" />
                            <span>4.8</span>
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            navigate(`/course/study/${course._id}`)
                          }
                          className="btn-primary"
                        >
                          Continue Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                    <SchoolIcon className="text-3xl text-gray-400" />
                  </div>
                  <Typography variant="h5" className="mb-2 text-gray-900">
                    No courses enrolled yet
                  </Typography>
                  <Typography variant="body1" className="mb-6 text-gray-600">
                    Start your learning journey by enrolling in your first
                    course.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/courses")}
                    className="btn-primary"
                    startIcon={<SchoolIcon />}
                  >
                    Browse Courses
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card className="card">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingIcon className="text-primary-600" />
                    <Typography variant="h6" className="font-semibold">
                      Recent Activity
                    </Typography>
                  </div>

                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-primary-100 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                            <Icon className="text-primary-600 text-sm" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card className="card">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <StarIcon className="text-warning-500" />
                    <Typography variant="h6" className="font-semibold">
                      Learning Goals
                    </Typography>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Complete 5 courses
                      </span>
                      <Chip
                        label={`${completedCourses}/5`}
                        size="small"
                        className={
                          completedCourses >= 5
                            ? "!bg-success-100 !text-success-700"
                            : "!bg-gray-100 !text-gray-700"
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Study 30 minutes daily
                      </span>
                      <Chip
                        label="Today"
                        size="small"
                        className="!bg-primary-100 !text-primary-700"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Achieve 80% average
                      </span>
                      <Chip
                        label={`${averageProgress.toFixed(0)}%`}
                        size="small"
                        className={
                          averageProgress >= 80
                            ? "!bg-success-100 !text-success-700"
                            : "!bg-warning-100 !text-warning-700"
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card">
                <CardContent className="space-y-4">
                  <Typography variant="h6" className="font-semibold">
                    Quick Actions
                  </Typography>

                  <div className="space-y-3">
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate("/courses")}
                      className="btn-secondary"
                      startIcon={<SchoolIcon />}
                    >
                      Find New Courses
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate("/account")}
                      className="btn-secondary"
                      startIcon={<CalendarIcon />}
                    >
                      View Schedule
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

export default Dashbord;
