import { useState } from 'react';
import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';
import ListModal from './ListModal';

const ListItem = ({ todo, getData }) => {
    const [showModal, setShowModal] = useState(false);
    const deleteTodo = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${todo.id}`, {
                method: "DELETE",
            });

            if (res.status === 200) {
                getData();
            }
        } catch (err) {
            console.error(`deleteTodo: ${err}`);
        }
    };

    return (
        <li className="list-item">
            <div className="info-container">
                <TickIcon />
                <p className="task-title">{todo.title}</p>
                <ProgressBar />
            </div>

            <div className=" button-container">
                <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
                <button className="delete" onClick={deleteTodo}>DELETE</button>
            </div>
            {showModal && <ListModal mode={'edit'} setShowModal={setShowModal} getData={getData} todo={todo} />}
        </li>
    )
};

export default ListItem;