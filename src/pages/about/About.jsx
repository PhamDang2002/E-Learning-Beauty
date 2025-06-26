import "./about.css";
import {
  School as SchoolIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  Lightbulb as LightbulbIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: SchoolIcon, value: "500+", label: "Courses Available" },
    { icon: PeopleIcon, value: "50K+", label: "Active Students" },
    { icon: StarIcon, value: "4.9", label: "Average Rating" },
    { icon: TrendingIcon, value: "95%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: LightbulbIcon,
      title: "Innovation",
      description:
        "We constantly innovate our learning methods to provide the best educational experience.",
    },
    {
      icon: SecurityIcon,
      title: "Quality",
      description:
        "Every course is carefully crafted by industry experts to ensure the highest quality.",
    },
    {
      icon: SupportIcon,
      title: "Support",
      description:
        "Our dedicated support team is always here to help you succeed in your learning journey.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Passionate educator with 15+ years of experience in online learning.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Technology expert focused on creating seamless learning experiences.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Curriculum specialist dedicated to creating engaging educational content.",
    },
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
        <div className="container-custom text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <SchoolIcon />
              About WeConnect
            </div>
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
              Empowering Learning
              <span className="block">Through Technology</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-primary-100">
              We are dedicated to providing high-quality online courses that
              help individuals learn, grow, and excel in their desired fields.
              Our experienced instructors ensure that each course is tailored
              for effective learning and practical application.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/courses")}
                className="!bg-white !px-8 !py-3 !text-primary-600 hover:!bg-gray-100"
              >
                Explore Courses
              </Button>
              <Button
                variant="outlined"
                size="large"
                className="!border-white !text-white hover:!bg-white/10"
                onClick={() => navigate("/courses")}
              >
                Learn More
              </Button>
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
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 shadow-soft">
                    <Icon className="text-2xl text-primary-600" />
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

      {/* Mission Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                <LightbulbIcon />
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Transforming Education for the Digital Age
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                We believe that education should be accessible, engaging, and
                effective for everyone. Our platform combines cutting-edge
                technology with proven pedagogical methods to create an
                unparalleled learning experience.
              </p>
              <div className="space-y-4">
                {[
                  "Expert-led courses from industry professionals",
                  "Flexible learning schedules to fit your lifestyle",
                  "Interactive content with real-world applications",
                  "Certified courses recognized by employers worldwide",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckIcon className="text-xl text-success-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-600 p-8 shadow-large">
                <div className="rounded-2xl bg-white p-6 shadow-medium">
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
                      <SchoolIcon className="text-2xl text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Learning Made Simple
                    </h3>
                    <p className="text-gray-600">
                      Join thousands of learners who have transformed their
                      careers with our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              These principles guide everything we do and shape the learning
              experience we provide.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="card card-hover animate-slide-up space-y-4 p-8 text-center"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-medium">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              The passionate individuals behind our mission to transform
              education.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="card card-hover animate-slide-up space-y-4 p-8 text-center"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  className="!mx-auto !h-24 !w-24 !ring-4 !ring-primary-100"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="font-medium text-primary-600">{member.role}</p>
                </div>
                <p className="leading-relaxed text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="container-custom text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-primary-100">
              Join thousands of learners and unlock your potential today.
            </p>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/courses")}
              className="!bg-white !px-8 !py-4 !text-lg !text-primary-600 shadow-large hover:!bg-gray-100"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
