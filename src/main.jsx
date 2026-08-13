import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import Protected from './components/AuthLayout.jsx'

import AddPost from './pages/AddPost.jsx'
import MyPosts from './pages/MyPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import store from './store/store.js'
import Post from './pages/Post.jsx'
import NotFound from './pages/NotFound.jsx'


// Login/Sign Up are wrapped with authentication={false} (guest-only);
// post routes are wrapped with authentication={true} (must be logged in).
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element= {<Home />} />
      <Route path='/login' element={
        <Protected authentication={false}>
          <Login />
        </Protected>
      } />
      <Route path='/signup' element={
        <Protected authentication={false}>
          <SignUp />
        </Protected>
      } />
      <Route path='/forgot-password' element={
        <Protected authentication={false}>
          <ForgotPassword />
        </Protected>
      } />
      <Route path='/reset-password' element={
        <Protected authentication={false}>
          <ResetPassword />
        </Protected>
      } />
      <Route path='/add-post' element={
        <Protected authentication>
          <AddPost />
        </Protected>
      } />
      <Route path='/my-posts' element={
        <Protected authentication>
          <MyPosts />
        </Protected>
      } />
      <Route path='/edit-post/:slug' element={
        <Protected authentication>
          <EditPost />
        </Protected>
      } />
      <Route path='/post/:slug' element={
        <Protected authentication>
          <Post />
        </Protected>
      } />

      {/* Catch-all route for any undefined paths */}
      <Route path='*' element={<NotFound />} />

    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store= {store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
  
)

