import React, { Component } from "react";

import { connect } from "react-redux";

import { Dispatch, State } from "../store/type";
import { Actions, FetchClanDetailsOptions } from "./action";
import { seletClanDetails } from "./select";

const mapState = (state: State) => ({
  clanDetails: seletClanDetails(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchClanDetailsRequested: (options: FetchClanDetailsOptions) => dispatch(Actions.fetchClanDetailsRequested(options))
});

type ComponentProps = { };
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = ComponentProps & StateProps & DispatchProps;

class ClanTableComponent extends Component<Props> {
    componentDidMount() {
        this.props.fetchClanDetailsRequested({ clanId: 500146702 });
    }
   
    render() {
        if (this.props.clanDetails) {
            return (<>{this.props.clanDetails.members.map(m => (<div>{m.account_name}</div>))}</>);   
        }
    
        return (<div>No data</div>)
    }
    
}

const ClanTable = connect<
  StateProps,
  DispatchProps,
  ComponentProps,
  State
>(
  mapState,
  mapDispatch
)(ClanTableComponent);

export default ClanTable;