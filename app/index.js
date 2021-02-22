import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Posts from './components/Posts';
import Nav from './components/Nav'

class App extends React.Component {
    render() {

        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/'
                         render={(props) => (
                             <Posts {...props} post={'topstories'} />
                         )} />
                         <Route exact path='/new'
                         render={(props) => (
                             <Posts {...props} post={'newstories'} />
                         )} />
                    </Switch>
                </div>
            </Router>


        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)