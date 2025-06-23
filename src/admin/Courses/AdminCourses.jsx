import Layout from "../Utils/Layout";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddCourseMutation, useGetAllCoursesQuery } from "@services/rootApi";
import { useState } from "react";
import { categories } from "@libs/constants";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  School as SchoolIcon,
  Upload as UploadIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const AdminCourses = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user);
  const courses = useGetAllCoursesQuery()?.data?.courses;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addCourse] = useAddCourseMutation();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPrice("");
    setCreatedBy("");
    setDuration("");
    setImage("");
    setImagePrev("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      await addCourse(myForm);
      clearForm();
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
    }
  };

  // Filter courses based on search and category
  const filteredCourses = courses?.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (user && user.role !== "admin") return navigate("/");

  return (
    <div className="admin-courses">
      <Layout>
        <div className="courses-container">
          {/* Header */}
          <div className="courses-header">
            <div className="header-content">
              <div className="header-title">
                <SchoolIcon className="header-icon" />
                <div>
                  <Typography variant="h4" className="page-title">
                    Course Management
                  </Typography>
                  <Typography variant="body1" className="page-subtitle">
                    Manage and create courses for your platform
                  </Typography>
                </div>
              </div>
              <div className="header-actions">
                <Tooltip title="Refresh">
                  <IconButton className="action-btn">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>

          <Grid container spacing={3} className="main-content">
            {/* Course List Section */}
            <Grid item xs={12} lg={8}>
              <Card className="courses-list-card">
                <CardContent className="card-header">
                  <div className="section-header">
                    <Typography variant="h6" className="section-title">
                      All Courses ({filteredCourses?.length || 0})
                    </Typography>
                    <Typography variant="body2" className="section-subtitle">
                      View and manage existing courses
                    </Typography>
                  </div>
                </CardContent>
                <Divider />

                {/* Search and Filter */}
                <div className="search-filter-section">
                  <div className="search-box">
                    <SearchIcon className="search-icon" />
                    <TextField
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                      className="search-input"
                    />
                  </div>
                  <FormControl size="small" className="filter-select">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <Divider />

                {/* Courses Grid */}
                <div className="courses-grid">
                  {btnLoading && (
                    <Box className="loading-overlay">
                      <LinearProgress />
                      <Typography variant="body2" className="loading-text">
                        Adding course...
                      </Typography>
                    </Box>
                  )}

                  {filteredCourses && filteredCourses.length > 0 ? (
                    <div className="courses-list">
                      {filteredCourses.map((course) => (
                        <div key={course._id} className="course-item">
                          <CourseCard course={course} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <SchoolIcon className="empty-icon" />
                      <Typography variant="h6" className="empty-title">
                        No courses found
                      </Typography>
                      <Typography variant="body2" className="empty-subtitle">
                        {searchTerm || selectedCategory !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "Start by adding your first course"}
                      </Typography>
                    </div>
                  )}
                </div>
              </Card>
            </Grid>

            {/* Add Course Form */}
            <Grid item xs={12} lg={4}>
              <Card className="add-course-card">
                <CardContent className="card-header">
                  <div className="form-header">
                    <AddIcon className="form-icon" />
                    <div>
                      <Typography variant="h6" className="form-title">
                        Add New Course
                      </Typography>
                      <Typography variant="body2" className="form-subtitle">
                        Create a new course for your platform
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <Divider />

                <form onSubmit={submitHandler} className="course-form">
                  <div className="form-content">
                    <TextField
                      label="Course Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      fullWidth
                      className="form-field"
                      variant="outlined"
                      size="small"
                    />

                    <TextField
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      fullWidth
                      multiline
                      rows={3}
                      className="form-field"
                      variant="outlined"
                      size="small"
                    />

                    <FormControl fullWidth size="small" className="form-field">
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                        required
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Price (VND)"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      fullWidth
                      className="form-field"
                      variant="outlined"
                      size="small"
                    />

                    <TextField
                      label="Instructor Name"
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      required
                      fullWidth
                      className="form-field"
                      variant="outlined"
                      size="small"
                    />

                    <TextField
                      label="Duration (weeks)"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      fullWidth
                      className="form-field"
                      variant="outlined"
                      size="small"
                    />

                    {/* Image Upload */}
                    <div className="image-upload-section">
                      <Typography variant="body2" className="upload-label">
                        Course Image
                      </Typography>
                      <div className="upload-area">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={changeImageHandler}
                          className="file-input"
                          id="course-image"
                        />
                        <label htmlFor="course-image" className="upload-button">
                          <UploadIcon />
                          <span>Choose Image</span>
                        </label>
                      </div>

                      {imagePrev && (
                        <div className="image-preview">
                          <img src={imagePrev} alt="Course Preview" />
                          <IconButton
                            size="small"
                            onClick={() => {
                              setImage("");
                              setImagePrev("");
                            }}
                            className="clear-image-btn"
                          >
                            <ClearIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>

                    <div className="form-actions">
                      <Button
                        variant="outlined"
                        onClick={clearForm}
                        fullWidth
                        className="clear-btn"
                        startIcon={<ClearIcon />}
                      >
                        Clear Form
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={btnLoading}
                        fullWidth
                        className="submit-btn"
                        startIcon={
                          btnLoading ? (
                            <LinearProgress size={20} />
                          ) : (
                            <SaveIcon />
                          )
                        }
                      >
                        {btnLoading ? "Adding Course..." : "Add Course"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Layout>
    </div>
  );
};

export default AdminCourses;
