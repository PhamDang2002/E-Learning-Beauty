import Testimonials from "@components/testimonials/Testimonials";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  TrendingUp as TrendingIcon,
  People as PeopleIcon,
  Star as StarIcon,
} from "@mui/icons-material";

function HomePage() {
  const navigate = useNavigate();

  const stats = [
    { icon: SchoolIcon, value: "500+", label: "Courses Available" },
    { icon: PeopleIcon, value: "10K+", label: "Active Students" },
    { icon: StarIcon, value: "4.9", label: "Average Rating" },
    { icon: TrendingIcon, value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="from-primary-50 to-secondary-50 relative overflow-hidden bg-gradient-to-br via-white">
        <div className="bg-hero-pattern absolute inset-0 opacity-30"></div>
        <div className="container-custom section-padding relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <div className="bg-primary-100 text-primary-700 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                  <span className="bg-primary-500 animate-pulse-gentle h-2 w-2 rounded-full"></span>
                  Transform Your Future with Online Learning
                </div>
                <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
                  Master New Skills with
                  <span className="gradient-text block">
                    Expert-Led Courses
                  </span>
                </h1>
                <p className="max-w-lg text-xl leading-relaxed text-gray-600">
                  Join thousands of learners worldwide and unlock your potential
                  with our comprehensive e-learning platform designed for
                  success.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/courses")}
                  className="btn-primary !px-8 !py-4 !text-lg"
                  startIcon={<SchoolIcon />}
                >
                  Explore Courses
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="btn-secondary !px-8 !py-4 !text-lg"
                  startIcon={<PlayIcon />}
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="from-primary-500 to-secondary-600 shadow-large rounded-3xl bg-gradient-to-br p-8">
                  <div className="shadow-medium rounded-2xl bg-white p-6">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-xl">
                        <SchoolIcon className="text-primary-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Interactive Learning
                        </h3>
                        <p className="text-sm text-gray-600">
                          Real-time progress tracking
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-success-500 h-3 w-3 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Expert instructors
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-success-500 h-3 w-3 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Flexible learning schedule
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-success-500 h-3 w-3 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Certificate upon completion
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="bg-secondary-100 animate-bounce-gentle absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-2xl">
                <StarIcon className="text-secondary-600 text-2xl" />
              </div>
              <div
                className="bg-primary-100 animate-bounce-gentle absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ animationDelay: "1s" }}
              >
                <TrendingIcon className="text-primary-600 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="animate-slide-up space-y-3 text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="from-primary-100 to-primary-200 shadow-soft mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                    <Icon className="text-primary-600 text-2xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl font-bold">Why Choose Our Platform?</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Experience the future of learning with our cutting-edge features
              designed to maximize your educational journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: SchoolIcon,
                title: "Expert Instructors",
                description:
                  "Learn from industry professionals with years of real-world experience.",
              },
              {
                icon: TrendingIcon,
                title: "Flexible Learning",
                description:
                  "Study at your own pace with 24/7 access to course materials.",
              },
              {
                icon: StarIcon,
                title: "Certified Courses",
                description:
                  "Earn recognized certificates upon completion of your courses.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card card-hover animate-slide-up space-y-4 p-8 text-center"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="from-primary-500 to-primary-600 shadow-medium mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl font-bold">What Our Students Say</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Discover how our platform has transformed the learning experience
              for thousands of students worldwide.
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary-600 to-secondary-600 bg-gradient-to-r py-16">
        <div className="container-custom text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-primary-100 text-xl">
              Join thousands of learners and unlock your potential today.
            </p>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/courses")}
              className="!text-primary-600 shadow-large !bg-white !px-8 !py-4 !text-lg hover:!bg-gray-100"
              startIcon={<SchoolIcon />}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
