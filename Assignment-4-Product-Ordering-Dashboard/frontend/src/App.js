import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
              <Dashboard/>
            } 
          />
          <Route path="/orders" element={
              <Orders/>
            } 
          />
          <Route path="/placeorder" element={
              <PlaceOrder/>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
