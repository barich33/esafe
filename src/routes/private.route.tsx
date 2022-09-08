
import { Navigate, Outlet} from 'react-router';
import MainLayout from '../adminlayout/main_layout';
import { isAuthenticated } from '../service/token.service';
const ProtectedRoute = ({redirectPath = 'admin/dashboard'}) => {

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (
   <MainLayout />
  )
}
export default ProtectedRoute
