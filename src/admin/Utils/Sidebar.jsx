import "./common.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.userInfo.user);
  const location = useLocation();

  const navigationItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      description: "Overview and analytics",
    },
    {
      path: "/admin/course",
      label: "Courses",
      icon: SchoolIcon,
      description: "Manage courses",
    },
  ];

  const adminItems = [
    {
      path: "/admin/users",
      label: "Users",
      icon: PeopleIcon,
      description: "User management",
      condition: user && user.mainrole === "superadmin",
    },
  ];

  const bottomItems = [
    {
      path: "/account",
      label: "Account",
      icon: AccountIcon,
      description: "Profile & preferences",
    },
    {
      path: "/logout",
      label: "Logout",
      icon: LogoutIcon,
      description: "Sign out",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderNavItem = (item) => {
    if (item.condition === false) return null;

    const Icon = item.icon;
    const active = isActive(item.path);

    return (
      <ListItem key={item.path} disablePadding className="nav-item">
        <ListItemButton
          component={Link}
          to={item.path}
          className={`nav-button ${active ? "active" : ""}`}
        >
          <ListItemIcon className="nav-icon">
            <Icon className={active ? "active-icon" : "inactive-icon"} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                className={`nav-label ${active ? "active-text" : ""}`}
              >
                {item.label}
              </Typography>
            }
            secondary={
              <Typography variant="caption" className="nav-description">
                {item.description}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div className="admin-sidebar">
      <Card className="sidebar-card">
        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="mt-16"></div>
          <div className="user-info">
            <Typography variant="h6" className="user-name">
              {user?.name || "Admin User"}
            </Typography>
            <Typography variant="body2" className="user-role">
              {user?.role === "superadmin"
                ? "Super Admin"
                : user?.role === "admin"
                  ? "Administrator"
                  : "User"}
            </Typography>
          </div>
        </div>

        <Divider className="sidebar-divider" />

        {/* Main Navigation */}
        <div className="navigation-section">
          <Typography variant="overline" className="section-title">
            Navigation
          </Typography>
          <List className="nav-list">{navigationItems.map(renderNavItem)}</List>
        </div>

        {/* Admin Navigation */}
        {adminItems.some((item) => item.condition !== false) && (
          <>
            <Divider className="sidebar-divider" />
            <div className="navigation-section">
              <Typography variant="overline" className="section-title">
                Administration
              </Typography>
              <List className="nav-list">{adminItems.map(renderNavItem)}</List>
            </div>
          </>
        )}

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <Divider className="sidebar-divider" />
          <List className="nav-list">{bottomItems.map(renderNavItem)}</List>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <Typography variant="caption" className="footer-text">
            © 2024 E-Learning Platform
          </Typography>
          <Typography variant="caption" className="footer-version">
            v1.0.0
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
