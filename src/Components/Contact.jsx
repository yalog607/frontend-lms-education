import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header.jsx";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Page</title>
      </Helmet>

      {/* Header */}
      <Header />
    </div>
  );
};

export default Contact;
