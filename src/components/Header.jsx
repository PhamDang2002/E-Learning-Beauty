import { useLogout } from "@hooks/useLogout";
import { useUserInfo } from "@hooks/useUserInfo";

import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Badge,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  School as SchoolIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Header = ({ response }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userInfo = useUserInfo();
  const location = useLocation();

  const { logOut } = useLogout();
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;

  const renderMenu = (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      PaperProps={{
        className: "mt-2 rounded-2xl shadow-large border border-gray-100",
        style: {
          minWidth: "200px",
        },
      }}
    >
      <MenuItem
        onClick={() => {
          navigate(`/account`);
          handleMenuClose();
        }}
        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-primary-50"
      >
        <PersonIcon className="text-primary-600" />
        <span className="font-medium">Profile</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          logOut();
          handleMenuClose();
        }}
        className="flex items-center gap-3 px-4 py-3 text-error-600 transition-colors hover:bg-error-50"
      >
        <LogoutIcon />
        <span className="font-medium">Logout</span>
      </MenuItem>
    </Menu>
  );

  const handleUserProfileClick = (event) => {
    setAnchorEl(event.target);
  };

  const navItems = [
    { path: "/courses", label: "Courses", icon: SchoolIcon },
    { path: "/about", label: "About", icon: InfoIcon },
  ];

  return (
    <div className="relative">
      <AppBar
        position="fixed"
        className="glass-effect border-b border-white/20 !bg-white/90 backdrop-blur-md"
        elevation={0}
      >
        <Toolbar className="container-custom !min-h-[80px] !w-full justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative">
                <img
                  src="/weconnect-logo.png"
                  className="h-12 w-12 transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl transition-all duration-300 group-hover:bg-primary-500/30"></div>
              </div>
              <span className="gradient-text hidden text-xl font-bold sm:block">
                WeConnect
              </span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-primary-100 text-primary-700 shadow-soft"
                        : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <Icon className="text-lg" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            {response?.data?.user?._id ? (
              <div className="flex items-center gap-3">
                <IconButton
                  size="medium"
                  onClick={handleUserProfileClick}
                  className="group relative"
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <div className="h-3 w-3 rounded-full border-2 border-white bg-success-500"></div>
                    }
                  >
                    <Avatar className="!bg-gradient-to-br from-primary-500 to-primary-600 font-semibold !text-white shadow-medium transition-all duration-300 group-hover:shadow-glow">
                      {userInfo?.name?.[0]?.toUpperCase()}
                    </Avatar>
                  </Badge>
                </IconButton>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  className="btn-secondary !px-6 !py-2"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  className="btn-primary !px-6 !py-2"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="text-gray-600" />
              ) : (
                <MenuIcon className="text-gray-600" />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 border-l border-gray-100 bg-white p-6 shadow-large">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <Icon className="text-lg" />
                    {item.label}
                  </Link>
                );
              })}

              {!response?.data?.user?._id && (
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    fullWidth
                    className="btn-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    fullWidth
                    className="btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {renderMenu}

      {/* Spacer for fixed header */}
      <div className="h-[80px]"></div>
    </div>
  );
};

export default Header;
