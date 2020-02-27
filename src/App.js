import React from 'react';
import Layout from './hoc/Layout/layout';
import Home from './page/home/home';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './page/about/about';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/about'} component={About} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
