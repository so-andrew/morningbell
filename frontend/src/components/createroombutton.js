import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function CreateRoomButton(props){
    const history = useHistory();

    function handleClick(){
        //props.handleCreate();
        history.push('create');
    }

    return(
        <Button variant="primary" size="lg" onClick={handleClick}>
            Create Room
        </Button>
    )
}

export default CreateRoomButton;