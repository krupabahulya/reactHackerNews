import { useState, useEffect } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import Form from "./components/Form";
import "./index.css";

const App = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);


  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=react&tags=story`)
      .then((res) => {
        setLoading(false);
        setNews(res.data.hits);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (error) return <>Error: {error.message}</>;
  return (
    <div className="App">
      <h1 className="heading">Hacker News</h1>
      <Form />
      {loading ? ( //steffani
        <ClipLoader color="#ffffff" loading={loading} css={override} size={150} /> //steffani : I need to fix this error and migrate the code to the Gif.js with import and export functions
      ) : (
        <ul>
          {news.map((story) => (
            <li key={story.objectID}>
              {story.title}
              <br />
              <span>By: {story.author}</span>
              <br />
              <span>Points: {story.points}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
