import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts/new">Create Post</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/posts/new" component={CreatePost} />
          <Route path="/posts/:id" component={PostDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
