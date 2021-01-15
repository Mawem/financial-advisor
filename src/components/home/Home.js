import React from "react";
import PropTypes from "prop-types";
import Selector from "./selector/Selector";
import Table from "./table/Table";
import DonutChart from "./chart/DonutChart";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as riskActions from "../../redux/actions/riskActions";
import * as stateInit from "../../redux/initialState";

class Home extends React.Component {
  componentDidMount() {
    const { risk, actions } = this.props;
    if (risk === stateInit.initialRisk) {
      actions.loadRisk().catch((error) => {
        alert("Loading risk failed " + error);
      });
    }
  }
  handleSelection = (riskLevel) => {
    this.props.actions.selectRisk(riskLevel);
  };
  changeDisplayDetail = (displayType) => {
    this.props.actions.changeDisplayDetail(displayType);
  };
  displayDetail = () => {
    const table = this.props.risk.displayDetail === "Table";
    return table ? (
      <DonutChart {...this.props.risk} />
    ) : (
      <Table {...this.props.risk} />
    );
  };

  render() {
    return (
      <div className="row align-center">
        <div className="small-10 small-centered">
          <Selector
            {...this.props.risk}
            handleSelection={this.handleSelection}
          />
          <div className="detail-container">
            <button
              type="button"
              className="hollow button mg-5"
              onClick={() =>
                this.changeDisplayDetail(this.props.risk.displayDetail)
              }
            >
              {" "}
              {this.props.risk.displayDetail}
            </button>
            <this.displayDetail />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
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
      selectRisk: bindActionCreators(riskActions.selectRisk, dispatch),
      changeDisplayDetail: bindActionCreators(
        riskActions.changeDisplayDetail,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
