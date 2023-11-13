
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function APILoader() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch(err => setData(`An error occurred fetching data: ${err}`));
  }, []);

  return (
    <div className="APILoader">
        <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default APILoader;