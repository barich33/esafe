import { Modal } from 'antd';
import { useIdleTimer } from 'react-idle-timer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const IdleTimer = () => {

  let modalTimer;
  const secondsToGo = 5; // duration to show modal
  const navigate = useNavigate()
  const onSignOut = async () => {    
    localStorage.clear();
    sessionStorage.clear()
    navigate('/')
    window.location.reload();
  };

  const [visible, setVisible] = useState(false);
  const [secondsToGo$, setSecondsToGo] = useState(5);

  const showTimeoutModal = () => {
    setVisible(true);
    setSecondsToGo(5);

    modalTimer = setInterval(() => {
      setSecondsToGo(prevState => prevState - 1);
    }, 1000);

    setTimeout(() => {
      closeTimeoutModal();
      localStorage.clear();
       onSignOut();
    }, secondsToGo * 1000);

  };

  const closeTimeoutModal = () => {
    clearInterval(modalTimer);
    setVisible(false);
  };

  const onIdle = () => {
    showTimeoutModal();
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onActive = () => {
  };

  useIdleTimer({ onIdle, onActive, timeout: 1000 * 30 * 10}); // 10 minutes
  return <Modal
    visible={visible}
    title="You have been idle!"
    footer={[]}
    closable={false}
  >
    <p>{(`you will be logged out in  ${secondsToGo$} seconds.`)}</p>
  </Modal>;
};

export default IdleTimer;
