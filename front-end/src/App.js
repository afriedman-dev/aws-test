import logo from './logo.svg';
import './App.css';
import APILoader from './APILoader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          AWS Test App for testing deployment.
        </p>
        <APILoader />
      </header>
    </div>
  );
}

export default App;
