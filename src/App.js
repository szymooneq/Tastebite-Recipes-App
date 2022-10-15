import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components//Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import NewMenu from './components/Menu/Menu';
import AppContext from './context/AppContext';

function App() {     
  return (
    <Router>
      <AppContext>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-1'>
            <Header />
            <NewMenu />
            <div className='container'>
              <Content />
            </div>
          </div>
          <Footer />
        </div>
      </AppContext>
    </Router>
  )
}

export default App;
