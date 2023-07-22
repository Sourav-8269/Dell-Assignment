import './App.css';
import { store } from './Redux/store';
import MainRoutes from './Routes/MainRoutes';

function App() {
  console.log(store.getState())
  return (
    <div className="App">
      <MainRoutes/>
    </div>
  );
}

export default App;
