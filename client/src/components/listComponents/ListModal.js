import { useState } from 'react';

const ListModal = ({ mode, setShowModal, getData, todo }) => {
    const editMode = mode === 'edit';

    const [data, setData] = useState({
        user_email: editMode ? todo.user_email : 'adam@test.com', // TODO dont hardcode email
        title: editMode ? todo.title : undefined,
        progress: editMode ? todo.progress : 50,
        date: editMode ? todo.date : new Date(),
    });

    const postData = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.error(`postData: ${err}`);
        }
    };

    const editData = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${todo.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.status === 200) {
                setShowModal(false);
                getData();
            }
        } catch (err) {
            console.error(`editData: ${err}`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(data => ({
            ...data,
            [name]: value,
        }));
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form>
                    <input 
                        required
                        maxLength={30}
                        placeholder="Your task goes here"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                    <br/>
                    <label for="range">Drag to select your current progress</label>
                    <input
                        required
                        type="range"
                        id="range"
                        min="0"
                        max="100"
                        name="progress"
                        value={data.progress}
                        onChange={handleChange}
                    />
                    <input className={mode} type="submit" onClick={editMode ? editData : postData} />
                </form>
            </div>
        </div>
    )
};

export default ListModal;