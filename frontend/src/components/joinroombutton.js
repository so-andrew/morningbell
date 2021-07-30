import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function JoinRoomButton(){
    const history = useHistory();

    function handleClick(path){
        history.push(path);
    }

    return(
        <Button variant="secondary" size="lg" onClick={() => handleClick('join')}>
            Join Room
        </Button>
    )
}

export default JoinRoomButton;