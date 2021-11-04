import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
class League extends Component {
    constructor(props) {
        super(props);
        this.state = {
            league:{},
            videogame:{},
            series:[]
         };
    }
    componentDidMount(){
        const linkApi = process.env.REACT_APP_LEAGUES_API_URL + "/leagues/"+this.props.match.params.idLeague;
        const options = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ASbPv4LDK0IBqqOA_JR9CdHEoVeLqcHr41NcXWR47tjz0dephsA'
            }
          };
        fetch(linkApi,options).then(response => response.json())
        .then(
            response => {
                this.setState({
                    league: response,
                    videogame: response.videogame,
                    series: response.series,
                })
            }
        )
    }
    render() { 
        return (
            <div className="leagueDetails">
                <img src={this.state.league.image_url} alt={this.state.league.name} width="600px" height="600px"/>
                <h1>{this.state.league.name}</h1>
                {console.log(this.state.videogame)}
                <p>Game : {this.state.videogame.name}</p>
                {this.state.series.map(( serie, index ) => {
                    return (
                        <Card sx={{ maxWidth: 500 }} className="card">
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" className="seriesName">
                                    {serie.full_name}
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    From : {serie.begin_at} To : {serie.end_at}
                                </Typography>
                            </CardContent>
                            <CardActions className="details">
                                <Button variant="contained"><Link to={'/teams/'+serie.winner_id} className="nav-link vainqueur">{serie.winner_id ? "Vainqueur" : "Pas de Vainqueur"}</Link></Button>
                            </CardActions>
                        </Card>
                    );
                })}
            </div>
        );
    }
}
 
export default withRouter(League);