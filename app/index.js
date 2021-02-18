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
                        <Route exact path='/' component={Posts} />
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