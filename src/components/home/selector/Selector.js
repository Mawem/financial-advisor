import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Selector = ({ table, level, handleSelection }) => {
  const nextPath = useHistory();
  return (
    <>
      <div className="row">
        <div className="small-8 large-centered columns">
          {table.map((risk) => (
            <button
              type="button"
              className={`hollow button mg-5 ${
                level === risk.risk ? "color" : ""
              }`}
              onClick={() => handleSelection(risk.risk)}
              key={risk.risk}
            >
              {risk.risk}
            </button>
          ))}
          <button
            type="button"
            onClick={() => nextPath.push("/calculator")}
            className="hollow button mg-5"
            key="continue"
            path="/calculator"
            disabled={level === null ? true : false}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

Selector.propTypes = {
  table: PropTypes.array.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default Selector;
