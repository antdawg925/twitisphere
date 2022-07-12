// \\\\\\<$A$>///////\\\\\\<$A$>///////  ____________  IMPORTS  _____________ \\\\\\<$A$>///////\\\\\\<$A$>///////
//                                    -----------------------------------------
import React, { useState } from "react";
import "../CSS/AboutTheDev.css";
import { Link } from "react-router-dom";

// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
// ----------------------------------------------------------------------------------------------------------
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ

const AboutTheDevs = (props) => {
  // STATE VARIABLE
  const [ant, setAnt] = useState(false);

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  //                           CONTROLS WHATS BEING RENDERED ON THE HOVER 
  // ______________________________________________________________________________________________________
  const renderAnt = (e) => {
    if (e === null) {
      setAnt(false);
    } else {
      setAnt(true);
    }
  };
  //  ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


  return (
    <div className="the-div">
      <Link to="/" className="button-15">Go To Login</Link>

      <div className="layout">

        {ant ? (
          <div className="border"
            onMouseLeave={() => setAnt(false)}>
            <h1>Display Anthony's Resume!</h1>
            <p> Lets give them a little preview about ourselves!</p>
          </div>
        ) : (
          <div class="border">
            <p class="hover-el" onMouseEnter={(e) => renderAnt(e.target)}>
              Hover Here!
            </p>
            <h1>All About Anthony</h1>
          </div>
        )}

      </div>
    </div>

  );
};
export default AboutTheDevs;
