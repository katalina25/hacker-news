import './App.css';
import { Header, ListOfNews } from './components'

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <ListOfNews />
      </div>
    </div>
  );
}

export default App;
