import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function ProfileCard({ userDetails, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({ ...userDetails });

  const handleEditClick = () => {
    setUpdatedDetails({ ...userDetails });
    setEditMode(true);
  };

  const handleUpdateClick = () => {
    onUpdate(updatedDetails);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <Card>
      <Card.Body>
        {editMode ? (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={updatedDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="forContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Contact"
                name="contact"
                value={updatedDetails.contact}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Add more Form.Group for other details */}
            <Button variant="primary" onClick={handleUpdateClick}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </Form>
        ) : (
          <div>
            <Card.Title>{userDetails.name}</Card.Title>
          
            <Button variant="secondary" onClick={handleEditClick}>
              Edit Profile
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
