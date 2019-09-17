import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Create from './pages/create';
import Update from './pages/update';
import Show from './pages/show';


const Routes = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/create" component={Create}/>
            <Route exact path="/edit/:id" component={Update}/>
            <Route exact path="/show/:id" component={Show}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;