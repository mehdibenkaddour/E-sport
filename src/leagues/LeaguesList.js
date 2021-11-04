import React, { Component } from 'react';
import leaguesAPI from './LeaguesAPI';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import GameContext from '../Context/Game';
class LeaguesList extends Component {
    static contextType = GameContext;
    constructor(props) {
        super(props);
        this.state = { 
            leagues: [],
            x_page:1,
            x_per_page:5,
            x_total:0,
            game:""
         }
    }
    componentDidMount(){
        leaguesAPI(this.state.x_page,this.state.x_per_page).then(
            (response) => {
                this.setState({
                    x_total: response.headers.get("x-total"),
                })
                return response.json()
            }
        ).then(
            (response) => {
                console.log(this.context);
                this.setState({
                    game:this.context,
                    leagues: response,
                })
            }
        )
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(prevState.game);
        if(this.context !== prevState.game){
            leaguesAPI(this.state.x_page,this.state.x_per_page,this.context).then(
                (response) => {
                    this.setState({
                        x_total: response.headers.get("x-total"),
                    })
                    return response.json()
                }
            ).then(
                (response) => {
                    this.setState({
                        leagues: response,
                        game:this.context,
                    })
                }
            )    
        }
    }
    handlePageChange(event,value){

        this.setState({
            x_page: value,
        },() => {leaguesAPI(this.state.x_page,this.state.x_per_page).then(
            (response) => {
                return response.json()
            }
        ).then(
            (response) => {
                this.setState({
                    leagues: response,
                })
            }
        );});
    }
    render() { 
        return (
            <div className="listLeagues">
                {this.state.leagues.map(( leagues, index ) => {
                    return (
                        <Card sx={{ maxWidth: 345 }} className="card">
                            <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={leagues.image_url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {leagues.name}
                                </Typography>
                            </CardContent>
                            <CardActions className="details">
                            <Button variant="contained"><Link to={'leagues/'+leagues.id} className="nav-link">Details</Link></Button>
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
 
export default LeaguesList;