import React, { Component } from 'react';
import axios from 'axios';
import Login from './login.js';
import Navbar from './navbar'
import Signup from './signup.js';
import Profile from './profile.js';
import RecipeDisplay from './recipeDisplay.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isAuthenticated: false,
    }
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('auth', this.state.isAuthenticated)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  handleSignUpSubmit() {
    axios.post('/signup',
    { username: this.state.username,
      password: this.state.password })
      .then((response) => {
        if (response.status === 200) {
          console.log('200 status')
          this.setState({ isAuthenticated: true });

        } else {
          this.setState({ isAuthenticated: false });

        }
      });

  }




  handleLoginSubmit() {
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {

          this.setState({ isAuthenticated: true });


        } else if(response.status === 400) {

          this.setState({ isAuthenticated: false});
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('in catch')
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (

            <div>
              <Navbar />
              <Login
                handleSignUpClick={this.handleSignUpClick}
                handleChange={this.handleChange}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            </div>
          )} />
          <Route exact path="/signup" render={() => (
            <div>
              <Navbar />
              <Signup
                handleChange={this.handleChange}
                handleSignUpSubmit={this.handleSignUpSubmit}
                isAuthenticated={this.state.isAuthenticated}
              />
            </div>
          )} />
          <Route exact path="/profile" render={() => (
            this.state.isAuthenticated ?
            (<div>
              <Navbar />
              <Profile
                username={this.state.username}
                isAuthenticated={this.state.isAuthenticated}
              />
            </div> ): <p>Please <Link to="/">Log in</Link></p>
            // (
            //     <Redirect to={{
            //       pathname: '/',
            //     }}/>
              // )
            )}/>

          <Route exact path="/recipedisplay" render={()=>(
          this.state.isAuthenticated ?
          (<div>
            <Navbar />
            <RecipeDisplay
              username={this.state.username}
              handleProfileClick={this.handleProfileClick}
              handleChange={this.handleChange}
              handleSignUpClick={this.handleSignUpClick}
              handleLoginSubmit={this.handleLoginSubmit}
            />
          </div> ): <p>Please <Link to="/">Log in</Link></p>
          // (
          //     <Redirect to={{
          //       pathname: '/',
          //     }}/>
          //   )
          )}/>
        </div>
      </Router>

    )
  }
}


module.exports = App;



// import React, { Component } from 'react';
// import axios from 'axios';
// import Recipe from './recipe.js';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
//
//

// class Nav extends Component {
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     return (
//       <div className="navBarDiv">
//         <Link className="navBarLinks" to="/">Login</Link>
//         <Link className="navBarLinks" to="/signup">Register</Link>
//         <Link className="navBarLinks" to="/profile">Profile</Link>
//         <Link className="navBarLinks" to="/search">Search Recipes</Link>
//       </div>
//     )
//   }
// }
//
// module.exports = Nav;
