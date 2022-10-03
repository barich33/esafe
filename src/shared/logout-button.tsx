
import React from 'react';
import { useNavigate } from 'react-router';

export function LogoutButton() {

  const navigate = useNavigate()
  const onSignOut = async () => {    
    localStorage.clear();
    sessionStorage.clear()
    navigate('/')
    window.location.reload();
  };

  return (
    <span>
      <div className="px-2" title={'Logout'}>
        <span className={'px-2'}>|</span>{' '}
        <span className={'bottom-icons cursor-pointer h-8'} onClick={onSignOut} >
          <u>Logout</u>
          
        </span>
        
      </div>
    </span>
  );
}

export default LogoutButton;
