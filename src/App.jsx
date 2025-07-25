import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Homepage from './pages/HomePage'
import Register from './components/Register'
import Categories from './components/Categories'

function App() {
  const route = createRoutesFromElements(
    <Route>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/categories' element={<Categories/>}/>
      {/* <Route path='/categories:categoryName' element={<Categories/>}/> */}
    </Route>
  );

  const router = createBrowserRouter(route)

  return (
    <>
      <RouterProvider  router={router}/>
    </>
  )
}

export default App
