import { Component } from "react";
import { connect } from "react-redux";
import { getClanDetails } from ".";
import { Dispatch, State } from "../store/type";
import { Actions, FetchClanDetailsOptions } from "./action";


const mapState = (state: State) => ({
    clanDetails: getClanDetails(state)
  });
  const mapDispatch = (dispatch: Dispatch) => ({
    fetchClanDetailsRequested: (options: FetchClanDetailsOptions) => dispatch(Actions.fetchClanDetailsRequested(options))
  });
  
  type ComponentProps = { };
  type StateProps = ReturnType<typeof mapState>;
  type DispatchProps = ReturnType<typeof mapDispatch>;
  type Props = ComponentProps & StateProps & DispatchProps;
  
  class ClanTableImpl extends Component<Props> {
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

  export const ClanTable = connect<
    StateProps,
    DispatchProps,
    ComponentProps,
    State
  >(
    mapState,
    mapDispatch
  )(ClanTableImpl);
  

   
  export default ClanTable;