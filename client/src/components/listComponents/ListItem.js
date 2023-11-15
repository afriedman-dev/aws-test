import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';

const ListItem = ({ todo }) => {
    return (
        <li className="list-item">
            <div className="info-container">
                <TickIcon />
                <p>{todo.title}</p>
                <ProgressBar />
            </div>

            <div className=" button-container">
                <button className="edit">EDIT</button>
                <button className="delete">DELETE</button>
            </div>
        </li>
    )
};

export default ListItem;