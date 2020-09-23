import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Regiseter from './components/auth/Register'
import './App.css'
//redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Regiseter} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)

export default App