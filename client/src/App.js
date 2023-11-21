import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from './components/listComponents/ListHeader';
import ListItem from './components/listComponents/ListItem';
import Auth from './components/authComponents/Auth';

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;
    const [todos, setTodos] = useState(null);

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
                <p className="user-email">Welcome back {userEmail}</p>
                {sortedTodos?.map((todo) => <ListItem key={todo.id} todo={todo} getData={getData} />)}
                </>
            }
            <p className="copyright">© afriedmandev LLC</p>
        </div>
    );
};

export default App;