import { useNavigate, useParams } from "react-router-dom";
import "./coursedescription.css";

import { useFetchCourseQuery } from "@services/rootApi";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Rating,
  Divider,
} from "@mui/material";
import { currencyFormatter } from "@libs/utils";
import { useEffect } from "react";
import { getCourse } from "@redux/slices/authSlice";
import {
  PlayArrow as PlayIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  School as SchoolIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Download as DownloadIcon,
  Devices as DevicesIcon,
} from "@mui/icons-material";

const CourseDescription = () => {
  const params = useParams();
  const user = useSelector((store) => store.auth.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useFetchCourseQuery(params.id)?.data?.course;

  useEffect(() => {
    dispatch(getCourse({ getCourse: params.id }));
  }, [params, dispatch]);

  const checkoutHandler = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/create-payment-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course._id,
            amount: course.price,
            description: course.title,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Error creating payment link:", response.statusText);
      }
    } catch (error) {
      console.error("Error during payment request:", error);
    }
  };

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

  const courseFeatures = [
    {
      icon: TimeIcon,
      label: "Lifetime Access",
      description: "Access to course content forever",
    },
    {
      icon: DownloadIcon,
      label: "Downloadable",
      description: "Download videos for offline viewing",
    },
    {
      icon: DevicesIcon,
      label: "Mobile Friendly",
      description: "Learn on any device",
    },
    {
      icon: SecurityIcon,
      label: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: SupportIcon,
      label: "24/7 Support",
      description: "Get help whenever you need it",
    },
    {
      icon: SchoolIcon,
      label: "Certificate",
      description: "Earn a certificate upon completion",
    },
  ];

  const whatYouWillLearn = [
    "Master the fundamentals of the subject",
    "Build real-world projects from scratch",
    "Learn industry best practices and standards",
    "Develop problem-solving skills",
    "Gain hands-on experience with tools and technologies",
    "Prepare for professional certification",
  ];

  const courseStats = [
    { icon: TimeIcon, label: "Duration", value: `${course.duration} weeks` },
    { icon: StarIcon, label: "Rating", value: "4.8" },
    { icon: PersonIcon, label: "Students", value: "1,234" },
    { icon: CheckIcon, label: "Level", value: "Beginner" },
  ];

  return (
    <div className="course-description min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Course Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-large">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${course.image}`}
                  alt={course.title}
                  className="h-80 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-large">
                    <PlayIcon className="text-3xl text-primary-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  <SchoolIcon />
                  Premium Course
                </div>
                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                  {course.title}
                </h1>
                <p className="text-xl leading-relaxed text-primary-100">
                  {course.description}
                </p>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center gap-4">
                <Avatar className="!h-12 !w-12 !bg-primary-100 !text-primary-600">
                  <PersonIcon />
                </Avatar>
                <div>
                  <p className="font-medium text-white">{course.createdBy}</p>
                  <p className="text-sm text-primary-100">Course Instructor</p>
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
                        <p className="text-sm text-primary-100">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Course Details */}
            <div className="space-y-8 lg:col-span-2">
              {/* What You'll Learn */}
              <Card className="card">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                      <TrendingIcon className="text-xl text-primary-600" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        What You&apos;ll Learn
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Skills and knowledge you&apos;ll gain from this course
                      </Typography>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckIcon className="mt-0.5 text-lg text-success-500" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Description */}
              <Card className="card">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-100">
                      <DescriptionIcon className="text-xl text-secondary-600" />
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-900"
                      >
                        Course Description
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Detailed overview of what this course covers
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    variant="body1"
                    className="leading-relaxed text-gray-700"
                  >
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card className="card">
                <CardContent className="p-8">
                  <Typography
                    variant="h5"
                    className="mb-6 font-bold text-gray-900"
                  >
                    Course Features
                  </Typography>

                  <div className="grid gap-6 md:grid-cols-2">
                    {courseFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100">
                            <Icon className="text-xl text-primary-600" />
                          </div>
                          <div>
                            <Typography
                              variant="h6"
                              className="mb-1 font-semibold text-gray-900"
                            >
                              {feature.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-gray-600"
                            >
                              {feature.description}
                            </Typography>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="card top-8">
                <CardContent className="p-6">
                  <div className="space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                      <StarIcon className="text-warning-500" />
                      Best Value
                    </div>

                    <div className="space-y-2">
                      <Typography
                        variant="h3"
                        className="font-bold text-gray-900"
                      >
                        {currencyFormatter(course.price, "VND")}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        One-time payment
                      </Typography>
                    </div>

                    <Divider />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Course Access</span>
                        <span className="font-medium text-gray-900">
                          Lifetime
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Certificate</span>
                        <span className="font-medium text-gray-900">
                          Included
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Support</span>
                        <span className="font-medium text-gray-900">24/7</span>
                      </div>
                    </div>

                    <Divider />

                    {user && user.subscription.includes(course._id) ? (
                      <div className="space-y-4">
                        <Chip
                          label="Already Enrolled"
                          color="success"
                          className="!bg-success-100 !text-success-700"
                        />
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            navigate(`/course/study/${course._id}`)
                          }
                          className="btn-success"
                          startIcon={<PlayIcon />}
                        >
                          Continue Learning
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={checkoutHandler}
                          className="btn-primary !py-4 !text-lg"
                          startIcon={<SchoolIcon />}
                        >
                          Enroll Now
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          className="btn-secondary"
                          startIcon={<PlayIcon />}
                          onClick={() => navigate(`/lectures/${course._id}`)}
                        >
                          Preview Course
                        </Button>
                      </div>
                    )}

                    <Typography variant="body2" className="text-gray-500">
                      30-Day Money-Back Guarantee
                    </Typography>
                  </div>
                </CardContent>
              </Card>

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

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>5 stars</span>
                        <div className="mx-2 h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-warning-500"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span>85%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>4 stars</span>
                        <div className="mx-2 h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-warning-500"
                            style={{ width: "12%" }}
                          ></div>
                        </div>
                        <span>12%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>3 stars</span>
                        <div className="mx-2 h-2 flex-1 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-warning-500"
                            style={{ width: "3%" }}
                          ></div>
                        </div>
                        <span>3%</span>
                      </div>
                    </div>
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

export default CourseDescription;
