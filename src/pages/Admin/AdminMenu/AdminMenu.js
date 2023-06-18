import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "../Table.css";
import {
  createMenu,
  deleteMenu,
  editMenu,
  getAllMenu,
} from "../../../api/userAction";

export default function Menu() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = React.useState([]);

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [confirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);
  const [newItem, setNewItem] = React.useState({
    category: "",
    item: "",
    description: "",
    price: "",
    image: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setNewItem((prevItem) => ({
      ...prevItem,
      image: file,
    }));
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    // Add your logic here to handle adding the new item
    // const formData = new FormData(newItem);
    // formData.append("category", newItem);
    // formData.append("item", newItem);
    // formData.append("description", newItem);
    // formData.append("price", newItem);
    // formData.append("image", newItem);

    createMenu(newItem)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        // Optionally, perform additional actions after successful post
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        // Optionally, display an error message to the user
      });

    // Reset the form
    setNewItem({
      category: "",
      item: "",
      description: "",
      price: "",
      image: "",
    });

    // Close the modal
    handleClose();
  };

  // get all data from database
  useEffect(() => {
    getAllMenu().then(
      (success) => {
        if (success.data) {
          console.log(success.data.data);
          setData(success.data.data);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          //Backend Error message
          console.log(error.response);
        } else {
          //Server Not working Error
          console.log("Server not working");
        }
      }
    );
  }, []);

  // Delete Function
  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setConfirmDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deleteItemId) {
      deleteMenu(deleteItemId)
        .then((response) => {
          console.log("Permission deleted successfully");
          setData((prevData) =>
            prevData.filter((dataItem) => dataItem.menu_id !== deleteItemId)
          );
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("An error occurred while deleting the user");
          setDeleteItemId(null);
          setConfirmDeleteDialogOpen(false);
        });
    }
  };

  // Edit function
  const handleEditClick = (menuData) => {
    setEditItemId(menuData);
    setEditedItem({ ...menuData });

    setConfirmEditDialogOpen(true);
  };

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    // Make the PATCH API request to update the edited item
    editMenu(editedItem.menu_id, editedItem)
      .then((response) => {
        // Handle successful response
        console.log("Permission updated successfully");
        // Optionally, perform additional actions after successful update
        // For example, you can update the table data with the updated item
        let index = data.findIndex(
          (o) => o.permission_id === editedItem.menu_id
        );
        if (index > -1) {
          data[index] = editedItem;
          setData(data);
        }
        handleCancelEdit();
      })
      .catch((error) => {
        // Handle error response
        console.error("An error occurred while updating the user");
        // Optionally, display an error message to the user
      });
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setConfirmDeleteDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setConfirmEditDialogOpen(false);
  };

  return (
    <div className="Table">
      <h3>Menu </h3>
      <div className="registerbtn mb-5 mt-5">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Menu
        </Button>
      </div>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Menu_ID</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Item Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataItem, menu_id) => (
              <TableRow key={menu_id}>
                <TableCell align="left">{dataItem.menu_id}</TableCell>
                <TableCell align="left">{dataItem.category_name}</TableCell>
                <TableCell align="left">{dataItem.item_name}</TableCell>
                <TableCell align="left">{dataItem.description}</TableCell>
                <TableCell align="left">{dataItem.price}</TableCell>
                <TableCell align="left">{dataItem.imageUrl}</TableCell>
                <TableCell align="left">
                  <Button
                    className=" bg-success"
                    style={{ border: "none", color: "white" }}
                    onClick={() => handleEditClick(dataItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#CD5C5C",
                      border: "none",
                      color: "white",
                    }}
                    onClick={() => handleDeleteClick(dataItem.menu_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add Menu</h2>
          <form onSubmit={handleAddItem} encType="multipart/form-data">
            <TextField
              name="category"
              label="Enter Category"
              value={newItem.category}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="item"
              label="Enter Item Name"
              value={newItem.item}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="write description"
              value={newItem.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="price"
              label="Enter Price"
              value={newItem.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <div className="upload-image-container" encType="multipart/form-data">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-image-input"
                id="upload-image"
              />
              <label htmlFor="upload-image" className="upload-image-label">
                Choose Image
              </label>
              <br></br>
              <span className="upload-image-text">
                {newItem.image ? newItem.image.name : "No file chosen"}
              </span>
            </div>
            <Button type="submit" variant="contained" color="success" onClick={handleAddItem}>
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "10px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="xs"
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this menu?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDelete}
            style={{
              color: "white",
              backgroundColor: "#044cd0",
              border: "none",
            }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCancelDelete}
            style={{
              color: "white",
              backgroundColor: "#CD5C5C",
              border: "none",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Edit */}
      <Dialog
        open={confirmEditDialogOpen}
        onClose={handleCancelEdit}
        maxWidth="xs"
      >
        <DialogTitle>Edit Menu</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="category"
              label="Enter Category"
              value={newItem.category}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="item"
              label="Enter Item Name"
              value={newItem.item}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="write description"
              value={newItem.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="price"
              label="Enter Price"
              value={newItem.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <div className="upload-image-container">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-image-input"
                id="upload-image"
              />
              <label htmlFor="upload-image" className="upload-image-label">
                Choose Image
              </label>
              <br></br>
              <span className="upload-image-text">
                {newItem.image ? newItem.image.name : "No file chosen"}
              </span>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelEdit}
            style={{
              color: "white",
              backgroundColor: "#CD5C5C",
              border: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmEdit}
            style={{
              color: "white",
              backgroundColor: "#044cd0",
              border: "none",
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
