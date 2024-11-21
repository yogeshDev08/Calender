import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';
import { formatDate } from 'fullcalendar';
import { ArrowDropUp } from '@material-ui/icons';

const Ticket = (props) => {
    const { handleDeleteEvent, extendedProps, setOpenModal, setEventTitle, setEventDescription, setEditEventId, setSelectedDate } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    const handleEditEvent = () => {
        // Set the event data to be edited in the modal
        setEventTitle(extendedProps?.title);
        setEventDescription(extendedProps?.description);
        setEditEventId(extendedProps?.id);
        setSelectedDate(extendedProps?.start);

        // Open the modal
        setOpenModal(true);
    };

    const toggleDescription = () => {
        setIsExpanded((prev) => !prev);
    };

    const beginDateFormatted = formatDate(extendedProps?.start);
    const endDateFormatted = formatDate(extendedProps?.end)
    return (
        <div className={` flex justify-between ${extendedProps?.extendedProps?.isConfirmed ? "bg-yellow-500" : "bg-yellow-700"} p-2  border-none max-w-full`} >
            <div className='w-[85%] min-w-[85%]'>
                <h2 style={{ margin: 0 }}>{extendedProps?.title} </h2>
                <p>{beginDateFormatted} - {endDateFormatted}</p>
                {isExpanded && <div className={`mt-1 rounded transition-all duration-300`}  >
                    <p>{extendedProps?.extendedProps?.vehicleModel}</p>
                    <p>{extendedProps?.extendedProps?.contactInformation} </p>
                    <p>{extendedProps?.extendedProps?.perdiod}</p>
                </div>}
                <div className='flex justify-center w-full'>
                    <IconButton size="small" className='mt-1 !text-black-500' onClick={toggleDescription} >
                        {isExpanded ? <ArrowDropUp /> : <ArrowDropUp className='rotate-180' />}
                    </IconButton>
                </div>
            </div>
            <div className='flex flex-col' style={{ textWrap: "auto" }}>
                <IconButton size="small" onClick={handleEditEvent}><EditIcon /></IconButton>
                <IconButton size="small" onClick={() => handleDeleteEvent(extendedProps?.id)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Ticket;
