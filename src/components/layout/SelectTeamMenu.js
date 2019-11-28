import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class SelectTeamMenu extends Component {
    componentDidMount() {
        this.scanDynamoDB();
    }

    state = {
        anchorEl: null,
        TableName: 'my_open_source_team',
    };

    static propTypes = {
        my_teams: PropTypes.array.isRequired,
        my_func: PropTypes.func.isRequired,
        getItemDynamoDB: PropTypes.func.isRequired,
        scanDynamoDB: PropTypes.func.isRequired,
        updateItemDynamoDB: PropTypes.func.isRequired,
        putItemDynamoDB: PropTypes.func.isRequired,
    };

    showTeamMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    putItemDynamoDB = () => {
        console.log('put command called  ' + this.state.TableName + 'team_id');
        let foundUniqueId = false;
        let spillOutIndex = 0;
        let randomInt = 0;
        while (foundUniqueId===false){
            spillOutIndex ++;
            if (spillOutIndex > 150) break;
            randomInt = Math.floor(Math.random() * (100 - 11)) + 11;
            console.log(randomInt);
            for (let i = 0; i < this.props.my_teams.length; i++) {
               if (randomInt === this.props.my_teams[i].team_id ) break;
               if (i === this.props.my_teams.length-1) {
                   foundUniqueId=true;
               }
            }
        }
        if (foundUniqueId===true) {
            this.props.putItemDynamoDB(
                this.state.TableName,
                randomInt,
                this.props.team_name,
                this.props.team_data
            );
        }
    };

    getSelectedTeam = (event) => {
        this.props.getItemDynamoDB(
            this.state.TableName,
            parseInt(event.currentTarget.id)
        );
        this.setState({ anchorEl: null });
    };

    scanDynamoDB = () => {
        this.props.scanDynamoDB(this.state.TableName);
    };

    updateItemDynamoDB = () => {
        this.props.updateItemDynamoDB(
            this.state.TableName,
            parseInt(this.props.team_id),
            this.props.team_name,
            this.props.team_data
        );
    };

    getLatestSelectedTeam = () => {
        this.props.getItemDynamoDB(
            this.state.TableName,
            parseInt(this.props.team_id)
        );
    };

    render() {
        return (
        <div>
            <button className='btn btn-light page-top-margin' onClick={this.showTeamMenu}>
                Select team
            </button>
            <button className='btn btn-light' onClick={this.scanDynamoDB}>
                Scan teams
            </button>
            <button className='btn btn-light' onClick={this.putItemDynamoDB}>
                New team
            </button>
            <button className='btn btn-light' onClick={this.updateItemDynamoDB}>
                Save
            </button>
            <button className='btn btn-light' onClick={this.getLatestSelectedTeam}>
                Get updates
            </button>
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.getItemDynamoDB}
            >
                {this.props.my_teams.map(team => (
                    <MenuItem key={team.team_id} id={team.team_id} onClick={this.getSelectedTeam}>{team.team_name}</MenuItem>
                ))}
            </Menu>
        </div>
    );}
}

SelectTeamMenu.propTypes = {
    my_teams: PropTypes.array.isRequired,
    my_func: PropTypes.func.isRequired,
};

export default SelectTeamMenu;

