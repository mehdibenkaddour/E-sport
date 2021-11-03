import './App.css';
import LeaguesList from './leagues/LeaguesList';
import Menu from './menu/Menu';
function App() {
  return (
    <div className="App">
      <Menu />
      <LeaguesList />
    </div>
  );
}

export default App;
