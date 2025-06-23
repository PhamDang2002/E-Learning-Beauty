import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import "./dashboard.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchStatsQuery } from "@services/rootApi";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  School as SchoolIcon,
  VideoLibrary as VideoIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  TrendingDown as TrendingDownIcon,
  Notifications as NotificationIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const AdminDashbord = () => {
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user);
  const data = useFetchStatsQuery();

  useEffect(() => {
    setStats(data?.data?.stats);
  }, [data.data]);

  if (user && user.role !== "admin") return navigate("/");

  // Mock data for demonstration
  const dashboardStats = [
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      icon: SchoolIcon,
      color: "primary",
      trend: "+12%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Total Lectures",
      value: stats?.totalLectures || 0,
      icon: VideoIcon,
      color: "secondary",
      trend: "+8%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: PeopleIcon,
      color: "success",
      trend: "+15%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Active Students",
      value: Math.floor((stats?.totalUsers || 0) * 0.75),
      icon: TrendingIcon,
      color: "warning",
      trend: "+5%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "course",
      action: "New course added",
      title: "React Advanced Patterns",
      user: "John Doe",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "user",
      action: "New user registered",
      title: "Sarah Wilson",
      user: "sarah.wilson@email.com",
      time: "4 hours ago",
      status: "info",
    },
    {
      id: 3,
      type: "lecture",
      action: "Lecture updated",
      title: "JavaScript Fundamentals",
      user: "Mike Johnson",
      time: "6 hours ago",
      status: "warning",
    },
    {
      id: 4,
      type: "payment",
      action: "Payment received",
      title: "Course purchase",
      user: "Emily Brown",
      time: "8 hours ago",
      status: "success",
    },
  ];

  const quickActions = [
    {
      title: "Add Course",
      icon: AddIcon,
      color: "primary",
      action: () => navigate("/admin/course"),
    },
    {
      title: "Manage Users",
      icon: PeopleIcon,
      color: "secondary",
      action: () => navigate("/admin/users"),
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckIcon className="text-success-500" />;
      case "warning":
        return <WarningIcon className="text-warning-500" />;
      case "error":
        return <ErrorIcon className="text-error-500" />;
      default:
        return <NotificationIcon className="text-info-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <div className="admin-dashboard">
      <Layout>
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div>
              <Typography variant="h4" className="dashboard-title">
                Admin Dashboard
              </Typography>
              <Typography variant="body1" className="dashboard-subtitle">
                Welcome back, {user?.name || "Admin"}! Here&apos;s what&apos;s
                happening with your platform.
              </Typography>
            </div>
            <div className="header-actions">
              <Tooltip title="Notifications">
                <IconButton className="notification-btn">
                  <NotificationIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="More options">
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Stats Cards */}
          <Grid container spacing={3} className="stats-grid">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                  <Card className="stat-card">
                    <CardContent className="stat-content">
                      <div className="stat-header">
                        <div
                          className="stat-icon"
                          style={{ background: stat.bgColor }}
                        >
                          <Icon className="text-white" />
                        </div>
                        <div className="stat-trend">
                          <Chip
                            label={stat.trend}
                            size="small"
                            color={stat.trendUp ? "success" : "error"}
                            icon={
                              stat.trendUp ? (
                                <TrendingIcon />
                              ) : (
                                <TrendingDownIcon />
                              )
                            }
                            className="trend-chip"
                          />
                        </div>
                      </div>
                      <div className="stat-info">
                        <Typography variant="h3" className="stat-value">
                          {stat.value.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" className="stat-label">
                          {stat.title}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Main Content Grid */}
          <Grid container spacing={3} className="main-content-grid">
            {/* Recent Activity */}
            <Grid item xs={12} lg={8}>
              <Card className="activity-card">
                <CardContent className="card-header">
                  <div className="card-title-section">
                    <Typography variant="h6" className="card-title">
                      Recent Activity
                    </Typography>
                    <Typography variant="body2" className="card-subtitle">
                      Latest updates from your platform
                    </Typography>
                  </div>
                  <IconButton size="small">
                    <MoreIcon />
                  </IconButton>
                </CardContent>
                <Divider />
                <List className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={activity.id}>
                      <ListItem className="activity-item">
                        <ListItemAvatar>
                          <Avatar
                            className={`activity-avatar ${activity.type}`}
                          >
                            {getStatusIcon(activity.status)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <div className="activity-primary">
                              <Typography
                                variant="body1"
                                className="activity-action"
                              >
                                {activity.action}
                              </Typography>
                              <Chip
                                label={activity.status}
                                size="small"
                                color={getStatusColor(activity.status)}
                                className="status-chip"
                              />
                            </div>
                          }
                          secondary={
                            <div className="activity-secondary">
                              <Typography
                                variant="body2"
                                className="activity-title"
                              >
                                {activity.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                className="activity-meta"
                              >
                                by {activity.user} • {activity.time}
                              </Typography>
                            </div>
                          }
                        />
                      </ListItem>
                      {index < recentActivities.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </div>
                  ))}
                </List>
              </Card>
            </Grid>

            {/* Quick Actions & Progress */}
            <Grid item xs={12} lg={4}>
              <div className="sidebar-content">
                {/* Quick Actions */}
                <Card className="quick-actions-card">
                  <CardContent className="card-header">
                    <Typography variant="h6" className="card-title">
                      Quick Actions
                    </Typography>
                  </CardContent>
                  <Divider />
                  <div className="quick-actions-grid">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <div
                          key={index}
                          className="quick-action-item"
                          onClick={action.action}
                        >
                          <div className={`action-icon ${action.color}`}>
                            <Icon />
                          </div>
                          <Typography variant="body2" className="action-title">
                            {action.title}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Platform Health */}
                <Card className="health-card">
                  <CardContent className="card-header">
                    <Typography variant="h6" className="card-title">
                      Platform Health
                    </Typography>
                  </CardContent>
                  <Divider />
                  <div className="health-metrics">
                    <div className="health-metric">
                      <div className="metric-header">
                        <Typography variant="body2" className="metric-label">
                          System Uptime
                        </Typography>
                        <Typography variant="body2" className="metric-value">
                          99.9%
                        </Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={99.9}
                        className="health-progress success"
                      />
                    </div>
                    <div className="health-metric">
                      <div className="metric-header">
                        <Typography variant="body2" className="metric-label">
                          Server Load
                        </Typography>
                        <Typography variant="body2" className="metric-value">
                          45%
                        </Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={45}
                        className="health-progress warning"
                      />
                    </div>
                    <div className="health-metric">
                      <div className="metric-header">
                        <Typography variant="body2" className="metric-label">
                          Storage Usage
                        </Typography>
                        <Typography variant="body2" className="metric-value">
                          78%
                        </Typography>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={78}
                        className="health-progress info"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
