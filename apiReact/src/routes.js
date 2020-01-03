import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Create from './pages/create';
import Update from './pages/update';



const Routes = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/create" component={Create}/>
            <Route exact path="/edit/:id" component={Update}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;