import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './About';  // Importing components
import Home from './Home';
import Login from './Login';
import RequestOffer from './RequestOffer';



function App() {
    const [activeTab, setActiveTab] = useState('Home');

    const tabClick = (tabName) => {
        setActiveTab(tabName);
    }

    const openTabContent = () => {
        switch (activeTab) {
            case 'About':
                return <About />;
            case 'Home':
                return <Home />;
            case 'Login':
                return <Login />;
            case 'Request/Offer':
                return <RequestOffer />;
            default:
                return <Home />;
        }
    };


    return (
      <div>
            <div style={{
                position: 'fixed', // Keeps the tabs fixed at the top
                top: 0,
                right: 0,
                backgroundColor: '#e8eb6a', // Background color
                justifyContent: 'center'
                
            }}>
              
              <button class="tablinks" onClick={() => tabClick('About') }>About</button>
              <button class="tablinks" onClick={() => tabClick('Home')}>Home</button>
              <button class="tablinks" onClick={() => tabClick('Login')}>Login</button>
              <button class="tablinks" onClick={() => tabClick('Request/Offer')}>Request/Offer</button>
          </div>

          <div class="tab-content">
                {openTabContent()}
          </div>

      </div>
  )
}

export default App
