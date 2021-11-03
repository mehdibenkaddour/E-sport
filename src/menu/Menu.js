import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import League from '../leagues/League';
import LeaguesList from '../leagues/LeaguesList';
import './Menu.css';
function Menu() {
    return ( 
        <Router className="menu">
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/leagues'} className="nav-link">Leagues</Link></li>
                        <li><Link to={'/teams'} className="nav-link"> Teams </Link></li>
                    </ul>
                </nav>
                <hr />
                <Switch>
                    <Route exact path='/'>
                        <Redirect to="/leagues" />
                    </Route>
                    <Route path='/leagues' component={LeaguesList} />
                    <Route path="/leagues/:idLeague" component={League}/>
                </Switch>
            </div>
      </Router>
    );
}

export default Menu;