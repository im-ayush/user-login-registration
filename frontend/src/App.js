import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Dashboard from './components/user/Dashboard';

function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{'minHeight':'65vh'}}>
        <Dashboard/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
