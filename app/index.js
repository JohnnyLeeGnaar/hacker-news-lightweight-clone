import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Posts from './components/Posts';
import Post from './components/Post';
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
                        <Route  exact path='/:id' component={Post} />
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