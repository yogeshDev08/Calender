import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

const Ticket = (props) => {
    const { handleDeleteEvent, extendedProps, setOpenModal, setEventTitle, setEventDescription, setEditEventId, setSelectedDate } = props;

    const navigate = useNavigate();
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

    return (
        <div className='p-2 bg-gray-400 border max-w-full' >
            <div>
                <div className='flex justify-end items-center '>
                    <Button size="small" onClick={handleEditEvent}>
                        <EditIcon />
                    </Button>
                    <Button size="small" onClick={() => handleDeleteEvent(extendedProps?.id)}>
                        <DeleteIcon />
                    </Button>
                </div>

                <h2 style={{ margin: 0 }}>{extendedProps?.title}</h2>
                <div className={`mt-1 p-2  rounded ${isExpanded ? 'h-40 overflow-y-scroll' : 'h-6 overflow-hidden'
                    } transition-all duration-300`}  >
                    <p className="text-sm text-wrap">{extendedProps?.description}</p>
                </div>
                <Button size="small" className='mt-1 !text-blue-500' onClick={toggleDescription} >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            </div>
        </div>
    );
};

export default Ticket;
