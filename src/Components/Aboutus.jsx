import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header.jsx";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Page</title>
      </Helmet>

      {/* Header */}
      <Header />
    </div>
  );
};

export default About;
