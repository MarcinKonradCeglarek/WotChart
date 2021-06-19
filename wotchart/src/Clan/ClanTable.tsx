import React, { Component } from "react";
import * as R from 'ramda';
import { connect } from "react-redux";

import { Dispatch, State } from "../store/type";
import { FetchClanDetailsOptions, fetchClanDetailsRequested } from "./action";
import { selectPlayers, seletClanDetails } from "./select";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import moment from "moment";
import { ClanDetailsMember } from "../model/clan";

const styles = (theme: Theme) =>
    createStyles({
      table: {
        minWidth: 650
      },
      header: {
        fontWeight: 'bold'
      }
    });

const mapState = (state: State) => ({
  clanDetails: seletClanDetails(state),
  players: selectPlayers(state)
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
          const orderedClanMembers = R.sortBy<ClanDetailsMember>(m => m.account_name.toLowerCase())(this.props.clanDetails.members);

          return (<TableContainer component={Paper}>
            <Table className={this.props.classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={this.props.classes.header}>Name</TableCell>
                  <TableCell className={this.props.classes.header} align="right">Rating</TableCell>
                  <TableCell className={this.props.classes.header} align="right">Role</TableCell>
                  <TableCell className={this.props.classes.header} align="right">Joined</TableCell>
                  <TableCell className={this.props.classes.header} align="right">Trees destroyed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderedClanMembers.map((member) => (
                  <TableRow key={member.account_id}>
                    <TableCell component="th" scope="row">
                      {member.account_name}
                    </TableCell>
                    <TableCell align="right">{this.props.players ? this.props.players[member.account_id]?.global_rating : "-"}</TableCell>
                    <TableCell align="right">{member.role_i18n}</TableCell>
                    <TableCell align="right" title={ moment(member.joined_at*1000).format("Do MMM YY")}>{ moment(member.joined_at*1000).fromNow()}</TableCell>
                    <TableCell align="right">{this.props.players ? this.props.players[member.account_id]?.statistics.trees_cut : '-'} </TableCell>
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