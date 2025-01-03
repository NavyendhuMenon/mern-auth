

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


// export default function PrivateRoute() {

//     const {currentUser}= useSelector(state=>state.user)
//   return currentUser ? <Outlet/> : <Navigate to='/signin'/>
// }
export default function PrivateRoute() {
  const { currentUser } = useSelector(state => state.user)
  
  // If there's no currentUser, redirect to signin
  if (!currentUser) {
      return <Navigate to='/signin'/>
  }

  // If the user is not an admin and tries to access /admin-dashboard, redirect them to /
  if (currentUser.isAdmin === false && window.location.pathname === '/admin-dashboard') {
      return <Navigate to='/' />
  }

  return <Outlet/>
}