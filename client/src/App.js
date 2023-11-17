import { useEffect, useState } from 'react';
import ListHeader from './components/listComponents/ListHeader';
import ListItem from './components/listComponents/ListItem';
import Auth from './components/authComponents/Auth';

const App = () => {
    const userEmail = 'adam@test.com'; // todo grab later instead of hardcode
    const [todos, setTodos] = useState(null);

    const authToken = false;

    const getData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
            const jsonTodos = await res.json();
            setTodos(jsonTodos);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, []);

    // Sort todos by date
    const sortedTodos = todos?.sort((a,b) => new Date(a.date) - new Date(b.date));

    return (
        <div className='app'>
            {!authToken && <Auth />}
            { authToken &&
                <>
                <ListHeader listName={'Test List'} getData={getData} />
                {sortedTodos?.map((todo) => <ListItem key={todo.id} todo={todo} getData={getData} />)}
                </>
            }
        </div>
    );
};

export default App;