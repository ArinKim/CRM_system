import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Timestamp } from "firebase/firestore";

interface Customer {
  id: string;
  name: string;
  service?: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  type: "individual" | "business";
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  lastContact?: {
    _seconds: number;
    _nanoseconds: number;
  };
}

var baseUrl = "http://localhost:3300";

function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    email: "",
    phone: "",
    status: "active",
    type: "individual",
    lastContact: "1900-01-01",
    createdAt: "1900-01-01",
    updatedAt: "1900-01-01",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleOpenDialog = (customer?: Customer) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        service: customer.service || "",
        status: customer.status,
        type: customer.type,
        lastContact: customer.lastContact?._seconds
          ? new Date(customer.lastContact._seconds * 1000).toLocaleDateString(
              "en-CA"
            )
          : "1900-01-01",
        createdAt: customer.createdAt?._seconds
          ? new Date(customer.createdAt._seconds * 1000).toLocaleDateString(
              "en-CA"
            )
          : "1900-01-01",
        updatedAt: customer.updatedAt?._seconds
          ? new Date(customer.updatedAt._seconds * 1000).toLocaleDateString(
              "en-CA"
            )
          : "1900-01-01",
      });
    } else {
      setSelectedCustomer(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        status: "active",
        type: "individual",
        lastContact: "1900-01-01",
        createdAt: "1900-01-01",
        updatedAt: "1900-01-01",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCustomer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      status: "active",
      type: "individual",
      lastContact: "1900-01-01",
      createdAt: "1900-01-01",
      updatedAt: "1900-01-01",
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedCustomer) {
        // console.log(`${baseUrl}/api/v1/customers/${selectedCustomer.id}`);
        // console.log(formData);
        await axios.put(
          `${baseUrl}/api/v1/customers/${selectedCustomer.id}`,
          formData
        );
        console.log("Customer updated successfully");
      } else {
        await axios.post(`${baseUrl}/api/v1/customers`, formData);
      }
      fetchCustomers();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${baseUrl}/api/v1/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  // DEBUGGING
  // function convertTimestampToDate(timestamp: Timestamp): Date {
  //   return timestamp.toDate();
  // }
  // console.log(
  //   customers.map((customer) => {
  //     if (customer.lastContact?._seconds) {
  //       const timestamp = new Timestamp(customer.lastContact._seconds, 0);
  //       return convertTimestampToDate(timestamp);
  //     }
  //     return null;
  //   })
  // );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Customer Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Customer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Id</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Phone</TableCell> */}
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Contact</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.service || "N/A"}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{customer.email}</Typography>
                    {customer.phone && (
                      <Typography variant="body2" color="textSecondary">
                        {customer.phone}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.type}
                    color={customer.type === "business" ? "primary" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={customer.status === "active" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {customer.lastContact?._seconds
                    ? new Date(
                        customer.lastContact._seconds * 1000
                      ).toLocaleDateString("en-CA")
                    : "Never"}
                </TableCell>
                <TableCell>
                  {customer.createdAt?._seconds
                    ? new Date(
                        customer.createdAt._seconds * 1000
                      ).toLocaleDateString("en-CA")
                    : "Never"}
                </TableCell>
                <TableCell>
                  {customer.updatedAt?._seconds
                    ? new Date(
                        customer.updatedAt._seconds * 1000
                      ).toLocaleDateString("en-CA")
                    : "Never"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(customer)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedCustomer ? "Edit Customer" : "Add New Customer"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Service"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              select
              SelectProps={{ native: true }}
              sx={{ mb: 2 }}
            >
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </TextField>
            <TextField
              fullWidth
              label="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              select
              SelectProps={{ native: true }}
              sx={{ mb: 2 }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </TextField>
            <TextField
              fullWidth
              label="Last Contact"
              type="date"
              value={formData.lastContact}
              onChange={(e) =>
                setFormData({ ...formData, lastContact: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Created At"
              type="date"
              value={formData.createdAt}
              onChange={(e) =>
                setFormData({ ...formData, createdAt: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Updated At"
              type="date"
              value={formData.updatedAt}
              onChange={(e) =>
                setFormData({ ...formData, updatedAt: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCustomer ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CustomerPage;
