import React, { Component } from "react";
import * as R from 'ramda';
import { connect } from "react-redux";

import { Dispatch, State } from "../store/type";
import { FetchClanDetailsOptions, fetchClanDetailsRequested } from "./action";
import { seletClanDetails } from "./select";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import moment from "moment";

const styles = (theme: Theme) =>
    createStyles({
      table: {
        minWidth: 650,
      },
    });

const mapState = (state: State) => ({
  clanDetails: seletClanDetails(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
    fetchClanDetailsRequested: (options: FetchClanDetailsOptions) => dispatch(fetchClanDetailsRequested(options))
});

type ComponentProps = { };
type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = ComponentProps & StateProps & DispatchProps & WithStyles<typeof styles, true>;

class ClanTableComponent extends Component<Props> {
    componentDidMount() {
        this.props.fetchClanDetailsRequested({ clanId: 500146702 });
    }
   
    render() {
        if (this.props.clanDetails && this.props.clanDetails.members) {
          const orderedClanMembers = R.sortBy(R.prop('account_name'))(this.props.clanDetails.members);
            return (    <TableContainer component={Paper}>
              <Table className={this.props.classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderedClanMembers.map((member) => (
                    <TableRow key={member.account_id}>
                      <TableCell component="th" scope="row">
                        {member.account_name}
                      </TableCell>
                      <TableCell align="right">{member.role_i18n}</TableCell>
                      {/* <TableCell align="right">{moment(new Date(member.joined_at)).fromNow()}</TableCell> */}
                      <TableCell align="right">{member.joined_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>);   
        }
    
        return (<div>No data</div>)
    }
    
}

const StyledClanTableComponent = withStyles(styles, { withTheme: true })(ClanTableComponent);

const ClanTable = connect<
  StateProps,
  DispatchProps,
  ComponentProps,
  State
>(
  mapState,
  mapDispatch
)(StyledClanTableComponent);

export default ClanTable;