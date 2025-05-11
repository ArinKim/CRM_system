import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import axios from "axios";

import { Meeting } from "../../models/meeting/meeting";
import { User } from "../../models/user/user";
import { Customer } from "../../models/customer/customer";

var baseUrl = "http://localhost:3300";

function MeetingPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    customerId: selectedCustomers,
    userId: selectedUsers,
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    status: "scheduled",
    notes: "",
  });

  useEffect(() => {
    fetchMeetings();
    fetchCustomers();
    fetchStaff();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/meetings`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/users/role/staff`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleOpenDialog = (meeting?: Meeting) => {
    if (meeting) {
      setSelectedMeeting(meeting);
      setFormData({
        title: meeting.title,
        customerId: selectedCustomers,
        userId: selectedUsers,
        date: new Date(meeting.date),
        startTime: new Date(meeting.startTime),
        endTime: new Date(meeting.endTime),
        status: meeting.status,
        notes: meeting.notes || "",
      });
    } else {
      setSelectedMeeting(null);
      setFormData({
        title: "",
        customerId: selectedCustomers,
        userId: selectedUsers,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        status: "scheduled",
        notes: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMeeting(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedMeeting) {
        await axios.put(
          `${baseUrl}/api/v1/meetings/${selectedMeeting.id}`,
          formData
        );
      } else {
        await axios.post(`${baseUrl}/api/v1/meetings`, formData);
      }
      fetchMeetings();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving meeting:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        await axios.delete(`${baseUrl}/api/v1/meetings/${id}`);
        fetchMeetings();
      } catch (error) {
        console.error("Error deleting meeting:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Meetings
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Schedule Meeting
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Meetings
            </Typography>
            <List>
              {meetings.map((meeting) => (
                <ListItem
                  key={meeting.id}
                  divider
                  secondaryAction={
                    <>
                      <Chip
                        label={meeting.status}
                        color={getStatusColor(meeting.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleOpenDialog(meeting)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDelete(meeting.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={meeting.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {new Date(meeting.date).toLocaleDateString()} at{" "}
                          {new Date(meeting.startTime).toLocaleTimeString()} -{" "}
                          {new Date(meeting.endTime).toLocaleTimeString()}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Customer:{" "}
                          {customers.find((c) => c.id === meeting.customerId)
                            ?.name || "N/A"}
                          {" | "}
                          Staff:{" "}
                          {users.find((u) => u.uid === meeting.userId)?.name ||
                            "N/A"}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedMeeting ? "Edit Meeting" : "Schedule New Meeting"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Autocomplete
              multiple
              options={customers}
              getOptionLabel={(option) => option.name}
              value={selectedCustomers}
              onChange={(event, newValue) => {
                setSelectedCustomers(newValue);
                setFormData({ ...formData, customerId: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Customers" sx={{ mb: 2 }} />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...chipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      variant="outlined"
                      label={option.name}
                      {...chipProps}
                    />
                  );
                })
              }
            />
            <Autocomplete
              multiple
              options={users}
              getOptionLabel={(option) => option.name}
              value={selectedUsers}
              onChange={(event, newValue) => {
                setSelectedUsers(newValue);
                setFormData({ ...formData, userId: newValue });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Staff" sx={{ mb: 2 }} />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...chipProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      variant="outlined"
                      label={option.name}
                      {...chipProps}
                    />
                  );
                })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newValue: Date | null) =>
                  setFormData({ ...formData, date: newValue || new Date() })
                }
                sx={{ mb: 2, width: "100%" }}
              />
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue: Date | null) =>
                  setFormData({
                    ...formData,
                    startTime: newValue || new Date(),
                  })
                }
                sx={{ mb: 2, width: "100%" }}
              />
              <TimePicker
                label="End Time"
                value={formData.endTime}
                onChange={(newValue: Date | null) =>
                  setFormData({ ...formData, endTime: newValue || new Date() })
                }
                sx={{ mb: 2, width: "100%" }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              select
              label="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
              sx={{ mb: 2 }}
            >
              <MenuItem value="scheduled">Scheduled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedMeeting ? "Update" : "Schedule"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MeetingPage;
