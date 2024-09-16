import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/GlobalStyles.css';

function App() {
    return (
            <Router>
                <Layout />
            </Router>
        
    );
}

export default App;