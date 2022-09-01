import { Application } from '../core';
import './header.css';
import Logo from '../features/icons/logo.png';
import LogoutButton from '../shared/logout-button';
import { useDispatch } from 'react-redux';
import { useNavigate  } from 'react-router';
const PrimeCareHeader = () => {

  const dispatch = useDispatch();
  const history =useNavigate();
  const goToHome = () => {
    const application: Application = {
      name: 'Home',
      code: 'HOME',
      url: '/dashboard',
    };
    dispatch({ type: application });
    history('/dashboard')
  };

  let userInfo=localStorage.getItem('user'); 
  const loggedInUser = JSON.parse(userInfo ?? '{}');
  const user = `Welcome ${loggedInUser?.firstName} ${loggedInUser?.lastName}`;

  return (
    <div className="flex w-full p-3 header-bg">

      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <img
            src={Logo}
            className="cursor-pointer h-8"
            alt="PrimeCare"
            onClick={goToHome}
          />
        </div>

        <div className={'flex flex-col'}>
          <div className="flex space-x-2 items-center w-full justify-end">
            <div
              className="flex h-full overflow-hidden"
              style={{
             //   backgroundImage: "url('/assets/icons/sample-company.png')",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            ></div>

         
            <span>{user}</span>
            <LogoutButton/>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default PrimeCareHeader;
