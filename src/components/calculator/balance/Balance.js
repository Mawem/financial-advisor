import React from "react";

const Balance = ({
  labels,
  rebalance,
  handleChange,
  rebalanceResult,
  disableRebalance,
}) => {
  return (
    <div>
      <form onSubmit={rebalance}>
        <div className="grid-x grid-padding-x">
          <div className="medium-12 cell grid-x grid-padding-x">
            <h5 className="medium-4 cell">Current Amount</h5>
            <h5 className="medium-2 cell">Difference</h5>
            <h5 className="medium-2 cell">New Amount</h5>
            <h5 className="medium-4 cell">RecommendedTransfer</h5>
          </div>
          <div className="medium-8 cell grid-x grid-padding-x">
            {labels.map((label) => (
              <div key={label} className="medium-12 cell grid-x grid-padding-x">
                <p className="medium-3 cell">{label} $</p>
                <fieldset className="medium-3 cell">
                  <input
                    name={label}
                    id={label}
                    onChange={handleChange}
                    type="text"
                    key={(((label + "input")))}
                    placeholder={label}
                  />
                </fieldset>
                <fieldset className="medium-3 cell">
                  <input
                    type="text"
                    disabled
                    key={(((label + "diff")))}
                    value={
                      rebalanceResult.difference
                        ? rebalanceResult.difference[label]
                        : label
                    }
                  />
                </fieldset>
                <fieldset className="medium-3 cell">
                  <input
                    type="text"
                    disabled
                    key={(((label + "ideal")))}
                    value={
                      rebalanceResult.ideal
                        ? rebalanceResult.ideal[label]
                        : label
                    }
                  />
                </fieldset>
              </div>
            ))}
          </div>
          <div className="medium-4 cell">
            <div className="medium-12 risk-calculator-transfer">
              {rebalanceResult.transactions
                ? rebalanceResult.transactions.map((recomendation, i) => (
                    <div key={i}>{recomendation}</div>
                  ))
                : ""}
            </div>
          </div>
        </div>
        <div className="row">
          <button
            type="submit"
            className="hollow button float-right"
            disabled={!disableRebalance}
          >
            Rebalance
          </button>
        </div>
      </form>
    </div>
  );
};

export default Balance;
