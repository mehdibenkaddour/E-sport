import React, { Component, useContext } from 'react';
import teamsAPI from './TeamsAPI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GameContext from '../Context/Game';
class TeamsList extends React.Component {
    static contextType = GameContext;
    constructor(props) {
        super(props);
        this.state = { 
            teams: [],
            x_page:1,
            x_per_page:5,
            x_total:0,
         }
    }
    componentDidMount(){
        teamsAPI(this.state.x_page,this.state.x_per_page,this.context).then(
            (response) => {
                this.setState({
                    x_total: response.headers.get("X-Total"),
                })
                return response.json()
            }
        ).then(
            (response) => {
                this.setState({
                    teams: response,
                })
            }
        )
    }
    handlePageChange(event,value){

        this.setState({
            x_page: value,
        },() => {teamsAPI(this.state.x_page,this.state.x_per_page).then(
            (response) => {
                return response.json()
            }
        ).then(
            (response) => {
                this.setState({
                    teams: response,
                })
            }
        );});
    }
    render() { 
        return (
            <div className="listTeams">
                {this.state.teams.map(( team, index ) => {
                    return (
                        <Card sx={{ maxWidth: 345 }} className="card">
                            <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={team.image_url}
                            />
                            <span>{team.name}</span>
                            <CardActions className="details">
                                <Link to={'/teams/'+team.id} className="nav-link">Details</Link>
                            </CardActions>
                        </Card>
                    );
                })}
                <Pagination
                    className="my-3 pagination"
                    count={parseInt((this.state.x_total/this.state.x_per_page)+1,10)}
                    page={this.state.x_page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    onChange={(event,value) => this.handlePageChange(event,value)}
            />
            </div>
        );
    }
}
 
export default TeamsList;