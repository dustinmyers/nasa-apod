import React from "react";
import ReactPlayer from "react-player";

import "./apod-image.scss";

export default function ApodImage({ apod }) {
  return (
    <section className="apod-image">
      {apod.media_type === "image" ? (
        <img src={apod.url} alt="NASA apod" />
      ) : (
        <ReactPlayer width="100%" controls url={apod.url} playing />
      )}
    </section>
  );
}
