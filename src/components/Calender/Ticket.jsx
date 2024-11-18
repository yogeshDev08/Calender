import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import EditIcon from '../icons/EditIcon';
import DeleteIcon from '../icons/DeleteIcon';

const Ticket = (props) => {
    const {
        handleDeleteEvent,
        extendedProps
    } = props;
    console.log("🚀 ~ Ticket ~ extendedProps:", extendedProps)
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/detail')
    }

    return <>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: "10px", background: "lightblue", border: "1px solid blue" }}>
            <div>
                <div>
                    <h2>{extendedProps?.title}</h2>

                </div>
                <div>
                    <h5>{extendedProps?.description}</h5>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button size='small' onClick={() => { handleNavigate() }}><EditIcon /></Button>
                <Button size='small' onClick={() => handleDeleteEvent(extendedProps?.id)} ><DeleteIcon /></Button>
            </div>
        </div>
    </>
}

export default Ticket