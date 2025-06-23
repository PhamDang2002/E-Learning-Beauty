import CourseCard from "@components/coursecard/CourseCard";
import { testimonialsData } from "@libs/constants";
import {
  ChevronLeft,
  ChevronRight,
  Star as StarIcon,
  FormatQuote as QuoteIcon,
} from "@mui/icons-material";
import { useGetAllCoursesQuery } from "@services/rootApi";
import { useEffect, useState } from "react";
import { Avatar, Rating, Button } from "@mui/material";

const Testimonials = () => {
  const courses = useGetAllCoursesQuery().data?.courses;
  const [startIdx, setStartIdx] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    if (!courses || courses?.length <= visibleCount) return;
    const interval = setInterval(() => {
      setStartIdx((prev) =>
        prev + visibleCount < courses?.length ? prev + 1 : 0,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [courses, visibleCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (!courses) return;
    setStartIdx((prev) =>
      prev + visibleCount < courses?.length ? prev + 1 : 0,
    );
  };

  return (
    <div className="space-y-16">
      {/* Featured Courses Section */}
      <section className="text-center">
        <div className="mb-12 space-y-6">
          <div className="bg-primary-100 text-primary-700 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <StarIcon className="text-warning-500" />
            Featured Courses
          </div>
          <h2 className="gradient-text text-4xl font-bold">Popular Courses</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Discover our most popular courses that students love and recommend.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-12">
          <div className="relative mx-auto max-w-4xl">
            <video
              width="100%"
              className="shadow-large rounded-2xl"
              controls
              autoPlay
              loop
              muted
              data-testid="testimonials-video"
            >
              <source src="/shortvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Course Carousel */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handlePrev}
            disabled={startIdx === 0}
            className="!text-primary-600 !shadow-medium hover:!shadow-large !h-12 !w-12 !min-w-0 !rounded-full !bg-white disabled:!cursor-not-allowed disabled:!opacity-50"
          >
            <ChevronLeft />
          </Button>

          <div className="relative mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIdx * 320}px)`,
                width: courses ? `${courses?.length * 320}px` : "0px",
              }}
            >
              {courses && courses?.length > 0 ? (
                courses.map((course) => (
                  <div key={course._id} className="w-80 flex-shrink-0 px-4">
                    <CourseCard course={course} courses={courses} />
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-600">No courses available yet!</p>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!courses || courses?.length <= visibleCount}
            className="!text-primary-600 !shadow-medium hover:!shadow-large !h-12 !w-12 !min-w-0 !rounded-full !bg-white disabled:!cursor-not-allowed disabled:!opacity-50"
          >
            <ChevronRight />
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-center">
        <div className="mb-12 space-y-6">
          <div className="bg-secondary-100 text-secondary-700 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <QuoteIcon />
            Student Testimonials
          </div>
          <h2 className="gradient-text text-4xl font-bold">
            What Our Students Say
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Hear from our students about their learning experience and success
            stories.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map(
            ({ id, name, position, message, image }, index) => (
              <div
                key={id}
                className={`card card-hover p-8 text-left transition-all duration-300 ${
                  index === activeTestimonial
                    ? "ring-primary-500 shadow-large ring-2"
                    : ""
                }`}
                onMouseEnter={() => setActiveTestimonial(index)}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-xl">
                    <QuoteIcon className="text-primary-600 text-xl" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <Rating value={5} readOnly className="!text-warning-500" />
                </div>

                {/* Message */}
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  &ldquo;{message}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar
                    src={image}
                    alt={name}
                    className="!ring-primary-100 !h-12 !w-12 !ring-2"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-600">{position}</p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Testimonial Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === activeTestimonial
                  ? "bg-primary-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
