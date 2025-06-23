import { useGetAllCoursesQuery } from "@services/rootApi";
import "./courses.css";
import CourseCard from "@components/coursecard/CourseCard";
import { useEffect, useState } from "react";
import {
  Search as SearchIcon,
  GridView as GridIcon,
  ViewList as ListIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");

  const data = useGetAllCoursesQuery().data?.courses;

  useEffect(() => {
    if (data) {
      setCourses(data);
      setFilteredCourses(data);
    }
  }, [data]);

  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.createdBy.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Category filter (if you have categories in your data)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        break;
      case "oldest":
        filtered = [...filtered].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        break;
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "duration":
        filtered = [...filtered].sort((a, b) => a.duration - b.duration);
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, sortBy]);

  const categories = [
    "all",
    "programming",
    "design",
    "business",
    "marketing",
    "lifestyle",
  ];

  return (
    <div className="courses">
      {/* Hero Section */}
      <section className="from-primary-600 to-secondary-600 bg-gradient-to-r py-16">
        <div className="container-custom text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <SchoolIcon />
              Discover Your Perfect Course
            </div>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Explore Our Course Library
            </h1>
            <p className="text-primary-100 mx-auto max-w-2xl text-xl">
              Choose from hundreds of courses taught by industry experts and
              start your learning journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="container-custom">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Search Bar */}
            <div className="w-full max-w-md flex-1">
              <TextField
                fullWidth
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="input-field"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <FormControl size="small" className="min-w-[150px]">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                  className="input-field"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Sort Filter */}
              <FormControl size="small" className="min-w-[150px]">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                  className="input-field"
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="duration">Duration</MenuItem>
                </Select>
              </FormControl>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
                <Button
                  size="small"
                  onClick={() => setViewMode("grid")}
                  className={`!min-w-0 !px-3 !py-2 ${
                    viewMode === "grid"
                      ? "!text-primary-600 !shadow-soft !bg-white"
                      : "!text-gray-600"
                  }`}
                >
                  <GridIcon />
                </Button>
                <Button
                  size="small"
                  onClick={() => setViewMode("list")}
                  className={`!min-w-0 !px-3 !py-2 ${
                    viewMode === "list"
                      ? "!text-primary-600 !shadow-soft !bg-white"
                      : "!text-gray-600"
                  }`}
                >
                  <ListIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Typography variant="h6" className="text-gray-900">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "Course" : "Courses"} Found
              </Typography>
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  onDelete={() => setSearchTerm("")}
                  className="!bg-primary-100 !text-primary-700"
                />
              )}
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses && filteredCourses.length > 0 ? (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  courses={courses}
                  setCourses={setCourses}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <SchoolIcon className="text-3xl text-gray-400" />
              </div>
              <Typography variant="h5" className="mb-2 text-gray-900">
                No courses found
              </Typography>
              <Typography variant="body1" className="mb-6 text-gray-600">
                {searchTerm
                  ? `No courses match your search for "${searchTerm}"`
                  : "No courses are available at the moment."}
              </Typography>
              {searchTerm && (
                <Button
                  variant="outlined"
                  onClick={() => setSearchTerm("")}
                  className="btn-secondary"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
