import React, { useState } from 'react'

import {
    Box,
    Modal,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";

const EditDataModal = (props) => {
    const { eventDescription,
        eventTitle,
        openModal,
        setOpenModal,
        editEventId,
        handleSaveEvent,
        setEventTitle,
        setEventDescription,

        setCurrentEvents,
        selectedDate, } = props


   



    return <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
            p="20px"
            borderRadius="8px"
            bgcolor="white"
            width="300px"
            mx="auto"
            my="15vh"
            textAlign="center"
        >
            <Typography variant="h6">{editEventId ? "Edit Event" : "Add Event"}</Typography>
            <TextField
                label="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Box mt="20px" display="flex" justifyContent="space-around">
                <Button variant="contained" color="primary" onClick={handleSaveEvent}>
                    Save
                </Button>
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                    Cancel
                </Button>
            </Box>
        </Box>
    </Modal>
}

export default EditDataModal