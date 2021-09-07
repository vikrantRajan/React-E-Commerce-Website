import {
  EuiPage,
  EuiPageBody
} from '@elastic/eui';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStateContextProvider from './contexts/GlobalStateContext';
import Navbar from './global/Navbar';
import './scss/app.scss';
import Home from './views/Home/Home';
import NotFound from './views/NotFound/NotFound';
import ProductDetails from './views/ProductDetails/ProductDetails';


const App = () => (
  <div>
    <Router>
      <div className="App">
        <GlobalStateContextProvider>
          <EuiPage paddingSize="none">
            <EuiPageBody panelled>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/productdetails/:id" component={ProductDetails} />
                <Route path="*" component={NotFound} />
              </Switch>
            </EuiPageBody>
          </EuiPage>
        </GlobalStateContextProvider>
      </div>
    </Router>
  </div>
);

export default App;
