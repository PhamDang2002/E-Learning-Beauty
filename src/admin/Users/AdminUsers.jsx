import "./users.css";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchUsersQuery, useUpdateRoleMutation } from "@services/rootApi";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  People as PeopleIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { openSnackbar } from "@redux/slices/snackbarSlice";

const AdminUsers = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo.user).data;
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const data = useFetchUsersQuery();
  const dispatch = useDispatch();
  const [updateRoleApi] = useUpdateRoleMutation();

  useEffect(() => {
    setUsers(data?.data?.users);
  }, [data.data]);

  if (user && user.mainrole !== "superadmin") return navigate("/");

  // Filter users based on search and role
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    const matchesRole = roleFilter === "all" || user?.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const updateRole = async (id) => {
    setSelectedUser(users.find((u) => u._id === id));
    setConfirmDialog(true);
  };

  const confirmUpdateRole = async () => {
    try {
      await updateRoleApi(selectedUser?._id);
      dispatch(
        openSnackbar({ type: "success", message: "Role updated successfully" }),
      );
      setConfirmDialog(false);
      setSelectedUser(null);
    } catch (error) {
      dispatch(
        openSnackbar({
          type: "error",
          message: error?.data?.message || "Failed to update role",
        }),
      );
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "primary";
      case "superadmin":
        return "error";
      default:
        return "default";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <AdminIcon />;
      case "superadmin":
        return <SecurityIcon />;
      default:
        return <PersonIcon />;
    }
  };

  return (
    <div className="admin-users">
      <Layout>
        <div className="users-container">
          {/* Header */}
          <div className="users-header">
            <div className="header-content">
              <div className="header-title">
                <PeopleIcon className="header-icon" />
                <div>
                  <Typography variant="h4" className="page-title">
                    User Management
                  </Typography>
                  <Typography variant="body1" className="page-subtitle">
                    Manage platform users and their roles
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

          {/* Search and Filter */}
          <Card className="search-filter-card">
            <CardContent className="search-filter-content">
              <div className="search-section">
                <SearchIcon className="search-icon" />
                <TextField
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  className="search-input"
                />
              </div>
              <FormControl size="small" className="filter-select">
                <InputLabel>Role</InputLabel>
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="superadmin">Super Admin</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="users-table-card">
            <CardContent className="table-header">
              <div className="table-title-section">
                <Typography variant="h6" className="table-title">
                  All Users ({filteredUsers?.length || 0})
                </Typography>
                <Typography variant="body2" className="table-subtitle">
                  View and manage user accounts
                </Typography>
              </div>
            </CardContent>
            <Divider />

            <TableContainer component={Paper} className="table-container">
              <Table className="users-table">
                <TableHead>
                  <TableRow className="table-header-row">
                    <TableCell className="table-header-cell">User</TableCell>
                    <TableCell className="table-header-cell">Email</TableCell>
                    <TableCell className="table-header-cell">Role</TableCell>
                    <TableCell className="table-header-cell">Status</TableCell>
                    <TableCell className="table-header-cell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <TableRow key={user?._id || index} className="table-row">
                        <TableCell className="user-cell">
                          <div className="user-info">
                            <Avatar className="user-avatar">
                              {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </Avatar>
                            <div className="user-details">
                              <Typography variant="body1" className="user-name">
                                {user?.name || "Unknown User"}
                              </Typography>
                              <Typography variant="caption" className="user-id">
                                ID: {user?._id?.slice(-8) || "N/A"}
                              </Typography>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="email-cell">
                          <div className="email-info">
                            <EmailIcon className="email-icon" />
                            <Typography variant="body2" className="email-text">
                              {user?.email || "No email"}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell className="role-cell">
                          <Chip
                            icon={getRoleIcon(user?.role)}
                            label={user?.role || "Unknown"}
                            color={getRoleColor(user?.role)}
                            size="small"
                            className="role-chip"
                          />
                        </TableCell>
                        <TableCell className="status-cell">
                          <Chip
                            icon={<CheckIcon />}
                            label="Active"
                            color="success"
                            size="small"
                            className="status-chip"
                          />
                        </TableCell>
                        <TableCell className="actions-cell">
                          <div className="action-buttons">
                            <Tooltip title="Edit User">
                              <IconButton size="small" className="edit-btn">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Update Role">
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => updateRole(user?._id)}
                                className="role-btn"
                                startIcon={<SecurityIcon />}
                              >
                                Update Role
                              </Button>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <IconButton size="small" className="delete-btn">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="empty-cell">
                        <div className="empty-state">
                          <PeopleIcon className="empty-icon" />
                          <Typography variant="h6" className="empty-title">
                            No users found
                          </Typography>
                          <Typography
                            variant="body2"
                            className="empty-subtitle"
                          >
                            {searchTerm || roleFilter !== "all"
                              ? "Try adjusting your search or filter criteria"
                              : "No users registered yet"}
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Confirmation Dialog */}
          <Dialog
            open={confirmDialog}
            onClose={() => setConfirmDialog(false)}
            className="confirm-dialog"
          >
            <DialogTitle className="dialog-title">
              <WarningIcon className="warning-icon" />
              Confirm Role Update
            </DialogTitle>
            <DialogContent className="dialog-content">
              <Alert severity="warning" className="warning-alert">
                Are you sure you want to update the role for user &quot;
                {selectedUser?.name}&quot;?
              </Alert>
              <div className="user-details-dialog">
                <Typography variant="body2">
                  <strong>Current Role:</strong> {selectedUser?.role}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedUser?.email}
                </Typography>
              </div>
            </DialogContent>
            <DialogActions className="dialog-actions">
              <Button
                onClick={() => setConfirmDialog(false)}
                variant="outlined"
                className="cancel-btn"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmUpdateRole}
                variant="contained"
                color="primary"
                className="confirm-btn"
              >
                Update Role
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Layout>
    </div>
  );
};

export default AdminUsers;
