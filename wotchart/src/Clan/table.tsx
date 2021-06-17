import { Component, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useClanDetails } from "./select";
import { Dispatch } from "../store/type";
import { Actions } from "./action";

  class ClanTable extends Component {
    componentDidMount() {
        const dispatch = useDispatch<Dispatch>();
        const callback = useCallback(() => dispatch(Actions.fetchClanDetailsRequested({ clanId: 500146702 })), [dispatch]);
    }
   
    render() {
        const clanDetails = useClanDetails();
        if (clanDetails) {
            return (<>{clanDetails.members.map(m => (<div>{m.account_name}</div>))}</>);   
        }

        return (<div>No data</div>)
    }
  }

  
  export default ClanTable;