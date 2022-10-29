
import { Navigate, Outlet} from 'react-router';
import MainLayout from '../adminlayout/main_layout';
import { isAuthenticated } from '../service/token.service';
import IdleTimer from '../shared/Idel-time-out-handler';
const ProtectedRoute = ({redirectPath = 'admin/dashboard'}) => {

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (   
    <>  
    <IdleTimer/>
    <MainLayout />
   </>
  
  )
}
export default ProtectedRoute
