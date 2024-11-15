import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Modal,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import CarIcon from "../../icons/CarIcon";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [editEventId, setEditEventId] = useState(null);

  // Handle date click to open modal for adding new event
  const handleDateClick = (selected) => {
    setSelectedDate(selected.startStr);
    setOpenModal(true);
    setEventTitle("");
    setEventDescription("");
    setEditEventId(null);
  };

  // Handle event click to open modal for editing event
  const handleEventClick = (selected) => {
    const event = selected.event;
    setEventTitle(event.title);
    setEventDescription(event.extendedProps.description || "");
    setEditEventId(event.id);
    setSelectedDate(event.startStr);
    setOpenModal(true);
  };

  // Save or update event
  const handleSaveEvent = () => {
    if (eventTitle.trim() === "") return;

    if (editEventId) {
      // Update an existing event
      setCurrentEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editEventId
            ? {
              ...event,
              title: eventTitle,
              extendedProps: { description: eventDescription },
            }
            : event
        )
      );
    } else {
      // Add a new event
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: selectedDate,
        allDay: false,
        created: Date.now(), // Creation timestamp for FIFO sorting
        extendedProps: { description: eventDescription },
      };
      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    setOpenModal(false);
  };

  // Delete event
  const handleDeleteEvent = (eventId) => {
    setCurrentEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            allDaySlot={false}
            plugins={[timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
            eventOrder="created" // Sort events by the created timestamp
            dayHeaderContent={(arg) => {
              const weekday = arg.date.toLocaleString('en', { weekday: 'short' }); // Get weekday (Mon, Tue, etc.)
              const day = arg.date.getDate(); // Get the day number (11, 12, etc.)
              return (
                <div className="flex items-center space-x-2">
                  <span>{weekday} {day}</span>
                  <CarIcon /> {/* Car Icon */}
                </div>
              );
            }}
            eventContent={(arg) => (
              <div>
                <Typography>{arg.event.title}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEventClick(arg)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => handleDeleteEvent(arg.event.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </div>
            )}
          />
        </Box>
      </Box>

      {/* Modal for Adding/Editing Events */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
    </Box>
  );
};

export default Calendar;
