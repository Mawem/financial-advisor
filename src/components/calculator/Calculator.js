import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Portfolio from "./portfolio/Portfolio";
import Balance from "./balance/Balance";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as riskActions from "../../redux/actions/riskActions";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: {}, rebalanceResult: {}, disableRebalance: false };
  }

  rebalance = (e) => {
    e.preventDefault();
    const { risk } = this.props;
    let ideal = {};
    let difference = {};
    let portfolio = risk.table.filter(
      (risk) => risk.risk === this.props.risk.level
    )[0];
    let formPortfolio = this.state.values;
    let total = Object.keys(formPortfolio).reduce(
      (sum, key) => sum + parseFloat(formPortfolio[key] || 0),
      0
    );
    // difference and ideal amount
    Object.keys(formPortfolio).forEach((key) => {
      let portfolioAmount = (portfolio[key] * total) / 100;
      let differenceAmount = portfolioAmount - formPortfolio[key];
      difference = {
        ...difference,
        [key]:
          differenceAmount > 0
            ? "+" + differenceAmount.toFixed(1).toString()
            : differenceAmount.toFixed(1).toString(),
      };
      ideal = { ...ideal, [key]: portfolioAmount.toFixed(1).toString() };
    });
    // recommendations
    let transactions = this.transactionRecommendations(
      formPortfolio,
      difference
    );

    this.setState({ rebalanceResult: { difference, ideal, transactions } });
  };

  transactionRecommendations(formPortfolio, difference) {
    let recommendations = [];
    let diffForRecommendation = { ...difference };
    Object.keys(formPortfolio).forEach((keyTransfer) => {
      let differenceRecommendationTransfer = parseFloat(
        diffForRecommendation[keyTransfer]
      );
      if (differenceRecommendationTransfer < 0) {
        Object.keys(formPortfolio).forEach((keyRecibe) => {
          let differenceRecommendationRecibe = parseFloat(
            diffForRecommendation[keyRecibe]
          );
          if (differenceRecommendationRecibe > 0) {
            differenceRecommendationRecibe =
              parseFloat(differenceRecommendationRecibe) +
              parseFloat(differenceRecommendationTransfer);
            if (differenceRecommendationRecibe === 0) {
              recommendations.push(
                "Transfer $" +
                  Math.abs(differenceRecommendationTransfer).toFixed(1) +
                  " from " +
                  keyTransfer +
                  " to " +
                  keyRecibe +
                  "."
              );
              diffForRecommendation[
                keyRecibe
              ] = differenceRecommendationRecibe.toString();
              return;
            } else if (differenceRecommendationRecibe < 0) {
              differenceRecommendationTransfer =
               
               
                diffForRecommendation[keyRecibe];
              recommendations.push(
                "Transfer $" +
                  Math.abs(differenceRecommendationTransfer).toFixed(1) +
                  " from " +
                  keyTransfer +
                  " to " +
                  keyRecibe +
                  "."
              );
              differenceRecommendationTransfer = differenceRecommendationRecibe.toString();
              diffForRecommendation[keyRecibe] = 0;
              return;
            } else if (
              differenceRecommendationRecibe > 0 &&
              differenceRecommendationTransfer !== 0
            ) {
              recommendations.push(
                "Transfer $" +
                  Math.abs(differenceRecommendationTransfer).toFixed(1) +
                  " from " +
                  keyTransfer +
                  " to " +
                  keyRecibe +
                  "."
              );
              differenceRecommendationTransfer = 0;
              diffForRecommendation[
                keyRecibe
              ] = differenceRecommendationRecibe.toString();
              return;
            }
          }
        });
      }
    });
    return recommendations;
  }

  handleInputChange = (e) => {
    let values = this.state.values;
    values[e.target.name] = parseFloat(e.target.value);
    this.setState({ values });
    this.validateStateOfForm();
  };

  validateStateOfForm() {
    let form = this.state.values;
    const { labels } = this.props.risk;
    this.setState({
      disableRebalance:
        labels.filter((label) => form[label] === undefined).length === 0,
    });
  }

  render() {
    return (
      <div className="row align-center">
        {this.props.risk.level === null ? <Redirect push to="/" /> : ""}
        <div className="small-10 small-centered">
          <h3 className="text-center">Personalized Portfolio</h3>
          <Portfolio {...this.props.risk} />
          <h3 className="text-center balance-portfolio">Please Enter Your Current Portfolio</h3>
          <Balance
            {...this.props.risk}
            rebalance={this.rebalance}
            handleChange={this.handleInputChange}
            rebalanceResult={this.state.rebalanceResult}
            disableRebalance={this.state.disableRebalance}
          />
        </div>
      </div>
    );
  }
}

Calculator.propTypes = {
  risk: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    risk: state.risk,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadRisk: bindActionCreators(riskActions.loadRisk, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
