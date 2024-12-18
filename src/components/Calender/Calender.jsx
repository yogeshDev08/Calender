import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
    Box, Slider,
    styled,
} from "@material-ui/core";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Ticket from "./Ticket";
import './calendar.css'
import CarIcon from "../icons/CarIcon";
import EditDataModal from "./EditDataModal";
import jsonData from '../../Constants/Constants.json'

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [editEventId, setEditEventId] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleDeleteEvent = (eventId) => {
        setCurrentEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
        );
    };

    useEffect(() => {
        const transformedEvents = [];
        jsonData.forEach((dayData) => {
            dayData.appointments.forEach((appointment) => {
                transformedEvents.push({
                    id: appointment.key,
                    title: `${appointment.customerName}`,
                    start: appointment.day,
                    end: appointment.day,
                    allDay: true,
                    extendedProps: {
                        contactInformation: appointment.contactInformation,
                        jobs: appointment.jobs,
                        status: appointment.status,
                        ...appointment
                    },
                });
            });
        });
        setCurrentEvents(transformedEvents);
    }, []);

    const PrettoSlider = styled(Slider)({
        color: '#52af77',
        height: 8, // Increase height to make the slider track broader
        '& .MuiSlider-track': {
            height: 8, // Match the track height with the slider's height
            border: 'none',
        },
        '& .MuiSlider-rail': {
            height: 8, // Match the rail height for consistency
            opacity: 0.3, // Optional: Add transparency for the rail
            backgroundColor: '#d0d0d0', // Optional: Custom rail color
        },
        '& .MuiSlider-thumb': {
            display: "none"
        },
        '& .MuiSlider-valueLabel': {
            fontSize: 14,
            background: 'unset',
            padding: 0,
            width: 16,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#52af77',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&::before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    });


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

        if (event.start) {
            const startData = new Date(event.start)
            setStartDate(`${startData.getFullYear()}-${startData.getMonth() + 1}-${startData.getDate()}`)
        } else setStartDate('')

        if (event.end) {
            const endData = new Date(event.end)
            setEndDate(`${endData.getFullYear()}-${endData.getMonth() + 1}-${endData.getDate()}`)
        } else setEndDate('')
    };

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
                            start: startDate,
                            end: endDate,
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
                allDay: true,
                created: Date.now(), // Creation timestamp for FIFO sorting
                extendedProps: { description: eventDescription },
            };
            setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
        }

        setOpenModal(false);
    };

    return (<>
        <Box m="20px">
            <Box flex="1 1 100%" ml="15px" >
                <FullCalendar
                    height="80vh"
                    allDaySlot={true}
                    firstDay={1}
                    eventContent={(eventInfo) => (
                        <Ticket
                            handleDeleteEvent={handleDeleteEvent}
                            extendedProps={{
                                id: eventInfo.event.id,
                                title: eventInfo.event.title,
                                description: eventInfo.event.extendedProps.description,
                                start: eventInfo.event.start,
                                end: eventInfo.event.end,
                                extendedProps: eventInfo.event.extendedProps
                            }}
                            setOpenModal={setOpenModal}
                            setEventTitle={setEventTitle}
                            setEventDescription={setEventDescription}
                            setEditEventId={setEditEventId}
                            setSelectedDate={setSelectedDate}

                        />)}
                    dayHeaderContent={(arg) => {
                        const weekday = arg.date.toLocaleString('en', { weekday: 'short' }); // Get weekday (Mon, Tue, etc.)
                        const day = arg.date.getDate(); // Get the day number (11, 12, etc.)
                        return (
                            <div className="flex items-center space-x-2">
                                <span>{weekday} {day}</span>
                                <div style={{ display: "flex", justifyContent: "space-around", width: "180px", alignItems: "center" }}>
                                    <PrettoSlider
                                        valueLabelDisplay="auto"
                                        aria-label="pretto slider"
                                        defaultValue={60}
                                    />
                                    <CarIcon />

                                </div>
                            </div>
                        )
                    }}

                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "timeGridWeek,timeGridDay",
                    }}
                    initialView="timeGridWeek"
                    slotMinTime="00:00:00" // No time slots start
                    slotMaxTime="00:00:00" // No time slots end
                    editable={true}
                    selectable={true}
                    select={(selected) => { handleDateClick(selected) }}
                    eventOrder="created" // Sort events by the created timestamp
                    events={currentEvents}
                    eventClick={(selected) => { handleEventClick(selected) }}
                    defaultAllDay={true}
                    initialEvents={currentEvents}
                    eventDrop={(info) => {
                        const updatedEvent = {
                            id: info.event.id,
                            title: info.event.title,
                            start: info.event.start,
                            end: info.event.end ? info.event.end : null,
                            extendedProps:  {...info.event.extendedProps}
                        };

                        setCurrentEvents((prevEvents) =>
                            prevEvents.map((event) =>
                                event.id === updatedEvent.id ? updatedEvent : event
                            )
                        );
                    }}
                />
            </Box>
            <EditDataModal
                eventTitle={eventTitle}
                setEventTitle={setEventTitle}
                eventDescription={eventDescription}
                setEventDescription={setEventDescription}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleSaveEvent={handleSaveEvent}
            />
        </Box>
    </>
    );
};

export default Calendar;
