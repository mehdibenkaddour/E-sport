import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
class Team extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            team:{},
            players:[],
            videogame:{}
         }
    }
    componentDidMount(){
        const linkApi = process.env.REACT_APP_LEAGUES_API_URL + "/teams/"+this.props.match.params.idTeam;
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
                    team: response,
                    players: response.players,
                    videogame:response.current_videogame
                })
            }
        )
    }
    render() {
        let playersName = "";
        if(this.state.players.length !== 0){
            this.state.players.map((player,index) => (
                playersName += player.name + " "
            ))
        }
        return ( 
            <div className="teamDetails">
                <img src={this.state.team.image_url} alt={this.state.team.name} width="300px" height="200px"/>
                <h1>{this.state.team.name}</h1>
                <p>Game : {this.state.videogame.name}</p>
                <span>{playersName}</span>
            </div>
        );
    }
}
 
export default withRouter(Team);