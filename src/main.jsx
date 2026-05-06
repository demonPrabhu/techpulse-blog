import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import Protected from './components/AuthLayout.jsx'

import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import store from './store/store.js'
import Post from './pages/Post.jsx'

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
      <Route path='/add-post' element={
        <Protected authentication>
          <AddPost />
        </Protected>
      } />
      <Route path='/all-posts' element={
        <Protected authentication>
          <AllPosts />
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

