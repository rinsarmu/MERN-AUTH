import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store.js'
import './index.css'
import HomeScreen from './components/screens/HomeScreen.jsx'
import LoginScreen from './components/screens/LoginScreen.jsx'
import RegisterScreen from './components/screens/RegisterScreen.jsx'
import { PasswordGenerator } from './components/ReactModal.jsx'
import ProfileScreen from './components/screens/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/modal' element={<PasswordGenerator />}/>
      <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<ProfileScreen />}/>

      </Route>


    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>,
)
