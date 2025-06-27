import Loading from "@components/Loading";
import {
  useAddLectureMutation,
  useAddProgressMutation,
  useDeleteLectureMutation,
  useFetchProgressQuery,
  useGetDetailLectureQuery,
  useGetDetailLecturesQuery,
} from "@services/rootApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./lecture.css";
import {
  Button,
  LinearProgress,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import {
  DoneAll,
  PlayArrow as PlayIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

const Lecture = () => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [id, setId] = useState(null);
  const { data: dataLectures } = useGetDetailLecturesQuery(params.id);
  const dataLecture = useGetDetailLectureQuery(id)?.data?.lecture;

  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.auth.userInfo.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progressLec, setProgressLec] = useState([]);
  const [progress] = useAddProgressMutation();
  const { data, refetch } = useFetchProgressQuery({ course: params.id });

  const OnSubmit = (lectureId) => {
    setId(lectureId);
  };

  useEffect(() => {
    setLectures(dataLectures?.lectures);
    setLoading(false);
    setLecture(dataLecture);
  }, [dataLectures, dataLecture]);

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const [addLecture] = useAddLectureMutation();
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    myForm.append("lectureId", params.id);

    try {
      await addLecture({ id: params.id, formData: myForm });
      refetch();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
      setShow(false);
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const [deleteLectureApi] = useDeleteLectureMutation();
  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        await deleteLectureApi(id);
        refetch();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const addProgress = async (id) => {
    await progress({ course: params.id, lectureId: id });
    refetch();
  };

  const courseCount = dataLectures?.lectures?.length;
  useEffect(() => {
    setCompleted(data?.courseProgressPercentage);
    setCompletedLec(data?.completedLectures);
    setLectLength(data?.allLectures);
    setProgressLec(data?.progress);
  }, [
    data?.courseProgressPercentage,
    data?.completedLectures,
    data?.allLectures,
    data?.progress,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="lecture-page min-h-screen bg-gray-50">
      {/* Progress Header */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                <TrendingIcon className="text-xl text-primary-600" />
              </div>
              <div>
                <Typography variant="h5" className="font-bold text-gray-900">
                  Course Progress
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {completedLec || 0} of {courseCount || 0} lectures completed
                </Typography>
              </div>
            </div>

            {user?.role === "admin" && (
              <Button
                variant="contained"
                onClick={() => setShow(true)}
                className="btn-primary"
                startIcon={<AddIcon />}
              >
                Add Lecture
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-lg font-bold text-primary-600">
                {Math.round(completed) || 0}%
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={(completedLec / lectLength) * 100 || 0}
              className="!h-3 !rounded-full"
              sx={{
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#3B82F6",
                },
                backgroundColor: "#E5E7EB",
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              <Card className="card">
                <CardContent className="p-0">
                  {lecture && lecture.video ? (
                    <div className="relative">
                      <video
                        controls
                        className="h-96 w-full rounded-t-2xl object-cover"
                        src={`${import.meta.env.VITE_API_URL}/${lecture.video}`}
                      />
                      <div className="p-6">
                        <Typography
                          variant="h4"
                          className="mb-2 font-bold text-gray-900"
                        >
                          {lecture.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="mb-4 text-gray-600"
                        >
                          {lecture.description}
                        </Typography>

                        {/* Lecture Actions */}
                        <div className="flex items-center gap-4">
                          <Button
                            variant="contained"
                            onClick={() => addProgress(lecture._id)}
                            className="btn-success"
                            startIcon={<CheckIcon />}
                          >
                            Mark as Complete
                          </Button>
                          {user?.role === "admin" && (
                            <>
                              <IconButton className="!text-primary-600 hover:!bg-primary-50">
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                className="!text-error-600 hover:!bg-error-50"
                                onClick={() => deleteHandler(lecture._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-96 items-center justify-center">
                      <div className="space-y-4 text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                          <PlayIcon className="text-3xl text-gray-400" />
                        </div>
                        <Typography variant="h6" className="text-gray-900">
                          Select a lecture to start learning
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Choose from the lecture list on the right
                        </Typography>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Lecture List Sidebar */}
            <div className="space-y-4">
              <Card className="card">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                      <SchoolIcon className="text-xl text-primary-600" />
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-900"
                      >
                        Course Lectures
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {courseCount || 0} lectures available
                      </Typography>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {lectures && lectures.length > 0 ? (
                      lectures.map((lec, index) => {
                        const isCompleted = progressLec?.includes(lec._id);
                        const isActive = id === lec._id;

                        return (
                          <div
                            key={lec._id}
                            className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                              isActive
                                ? "border-primary-500 bg-primary-50"
                                : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                            }`}
                            onClick={() => OnSubmit(lec._id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-100">
                                    <DoneAll className="text-sm text-success-600" />
                                  </div>
                                ) : (
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                    <PlayIcon className="text-sm text-gray-400" />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <Typography
                                  variant="body1"
                                  className={`truncate font-medium ${
                                    isActive
                                      ? "text-primary-700"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {lec.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="text-gray-500"
                                >
                                  Lecture {index + 1}
                                </Typography>
                              </div>

                              {isCompleted && (
                                <Chip
                                  label="Completed"
                                  size="small"
                                  className="!bg-success-100 !text-success-700"
                                />
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                          <SchoolIcon className="text-2xl text-gray-400" />
                        </div>
                        <Typography variant="body1" className="text-gray-600">
                          No lectures available yet
                        </Typography>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Stats */}
              <Card className="card">
                <CardContent className="p-6">
                  <Typography variant="h6" className="mb-4 font-semibold">
                    Course Statistics
                  </Typography>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Lectures</span>
                      <span className="font-semibold text-gray-900">
                        {courseCount || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-semibold text-success-600">
                        {completedLec || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Remaining</span>
                      <span className="font-semibold text-warning-600">
                        {(courseCount || 0) - (completedLec || 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Add Lecture Dialog */}
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: "rounded-2xl",
        }}
      >
        <DialogTitle className="flex items-center justify-between">
          <Typography variant="h6" className="font-semibold">
            Add New Lecture
          </Typography>
          <IconButton onClick={() => setShow(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={submitHandler} className="space-y-6">
            <TextField
              fullWidth
              label="Lecture Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              required
              className="input-field"
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Video File
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={changeVideoHandler}
                required
                className="w-full rounded-xl border border-gray-200 p-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
              />
            </div>
            {videoPrev && (
              <div className="rounded-xl bg-gray-50 p-4">
                <video
                  controls
                  className="h-32 w-full rounded-lg object-cover"
                  src={videoPrev}
                />
              </div>
            )}
          </form>
        </DialogContent>
        <DialogActions className="p-6">
          <Button onClick={() => setShow(false)} className="btn-secondary">
            Cancel
          </Button>
          <Button
            onClick={submitHandler}
            disabled={btnLoading}
            className="btn-primary"
          >
            {btnLoading ? "Adding..." : "Add Lecture"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Lecture;
