import React, { useEffect } from "react";
import {
    Box,
    Modal,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";

const EditDataModal = (props) => {
    const {
        eventTitle,
        startDate,
        endDate,
        openModal,
        setOpenModal,
        editEventId,
        handleSaveEvent,
        setEventTitle,
        setStartDate,
        setEndDate,

    } = props;

    useEffect(() => {

    })

    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
                p="20px"
                borderRadius="8px"
                bgcolor="white"
                width="400px"
                mx="auto"
                my="15vh"
                textAlign="center"
            >
                <Typography variant="h6">{editEventId ? "Edit Event" : "Add Event"}</Typography>

                {/* Event Title */}
                <TextField
                    label="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                {/* Event Description */}
                {/* <TextField
                    label="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                /> */}

                {/* Start Date */}
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* End Date */}
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* Buttons */}
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
    );
};

export default EditDataModal;
