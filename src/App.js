import React from "react";
import { useEffect, useState } from "react";

import ApodImage from "./components/ApodImage";
import ApodDetails from "./components/ApodDetails";
import SaturnLoader from "./assets/images/saturn.gif";
import "./App.scss";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [url, setUrl] = useState(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&hd=false`
  );
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const [apod, setApod] = useState({});
  useEffect(() => {
    setIsFetching(true);
    const fetchApod = async () => {
      try {
        const res = await fetch(url);
        if (res.status >= 200 && res.status <= 299) {
          const data = await res.json();
          setApod(data);
        } else {
          const { error } = await res.json();
          console.log(error);
          setError(error);
        }
        setIsFetching(false);
      } catch (e) {
        setIsFetching(false);
        console.log(e);
      }
    };
    setTimeout(() => {
      fetchApod();
    }, 2000);
  }, [url]);

  return (
    <main>
      <h1 className="title">NASA Astronomy Photo Of The Day</h1>
      <div className="app-wrapper">
        {isFetching ? (
          <>
            <h1 className="loader-message">
              One moment while we connect to NASA
            </h1>
            <img src={SaturnLoader} alt="cartoon spinning gif of Saturn" />
          </>
        ) : error ? (
          <p className="error">{error.message}</p>
        ) : (
              <>
                <section className="image">
                  <ApodImage apod={apod} />
                </section>
                <section className="info">
                  <ApodDetails
                    apod={apod}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setUrl={setUrl}
                  />
                </section>
              </>
            )}
      </div>
    </main>
  );
}

export default App;
