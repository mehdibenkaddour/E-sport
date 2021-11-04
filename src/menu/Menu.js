import React, { useContext,useRef,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import League from '../leagues/League';
import LeaguesList from '../leagues/LeaguesList';
import './Menu.css';
import TeamsList from '../Teams/TeamsList';
import Team from '../Teams/Team'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import GameContext from '../Context/Game';
function Menu() {
    const {gameContext, setGameContext} = useContext(GameContext);
    const handleChange = event => setGameContext(event.target.value);
    const mounted = useRef();
    useEffect(() => {
    if (!mounted.current) {
        // do componentDidMount logic
        mounted.current = true;
    } else {
        console.log("Componenet did update :");
        console.log(gameContext);
    }
    });
    return (
        <Router className="menu">
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <h3><Link to={'/'} className="slogon">E-sport game API</Link></h3>
                        <li><Link to={'/leagues'} className="nav-link">Leagues</Link></li>
                        <li><Link to={'/teams'} className="nav-link"> Teams </Link></li>
                        <li>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gameContext ?? " "}
                                onChange={handleChange}
                                className="menuGame"
                                >
                                    <MenuItem value={"all-games"}>All games</MenuItem>
                                    <MenuItem value={"csgo"}>CS-go</MenuItem>
                                    <MenuItem value={"codmw"}>Call of Duty</MenuItem>
                                    <MenuItem value={"dota2"}>Dota 2</MenuItem>
                                    <MenuItem value={"lol"}>League Of Legend</MenuItem>
                                    <MenuItem value={"pubg"}>PUBG</MenuItem>
                                    <MenuItem value={"ow"}>Overwatch</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </li>
                    </ul>
                </nav>
                <Switch>
                        <Route exact path='/'>
                            <Redirect to="/leagues" />
                        </Route>
                        <Route exact path='/leagues/' >
                            <GameContext.Provider value={gameContext}>
                                <LeaguesList />
                            </GameContext.Provider>
                        </Route>
                        <Route path="/leagues/:idLeague" component={League}/>
                        <Route exact path='/teams/'>
                            <GameContext.Provider value={gameContext}>
                                <TeamsList />
                            </GameContext.Provider>
                        </Route>
                        <Route path="/teams/:idTeam" component={Team}/>
                </Switch>
            </div>
        </Router>
    );
}

export default Menu;