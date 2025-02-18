import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './About';  // Importing components
import Home from './Home';
import Login from './Login';



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
            default:
                return <Home />;
        }
    };

    return (
      <div>
          <div class="tab">
              <button class="tablinks" onClick={() => tabClick('About') }>About</button>
              <button class="tablinks" onClick={() => tabClick('Home')}>Home</button>
              <button class="tablinks" onClick={() => tabClick('Login')}>Login</button>
          </div>

          <div class="tab-content">
              {openTabContent()}
          </div>

      </div>
  )
}

export default App
