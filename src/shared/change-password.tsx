
import { Icon } from '@iconify/react';
import { Button, Form, Input, Modal, notification } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userEndPoint } from '../api/primecareApi.endpoint';
import { httpService } from '../service/http.service';
import { useNavigate } from 'react-router';
const ChangePassword = () => {
  const [resetPasswordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  let userInfo=localStorage.getItem('user'); 
  const loggedInUser = JSON.parse(userInfo ?? '{}');



  const passwordRequirements = (
    <div>
      <p>
        Your password must be a minimum of 8 characters in length.
      </p>
      <ul style={{ listStyle: 'disc', paddingLeft: '30px' }}>
        <li>Must have at least 1 Uppercase letter (A-Z)</li>
        <li>Must have at least 1 lowercase letter (a-z)</li>
        <li>Must have at least 1 number (0-9)</li>
        <li>Must have at least 1 symbol (!@#$%^&*()?)"</li>
        <li>Must not contain part of your username</li>
      </ul>
    </div>
  );
  function warning() {
    Modal.warning({
      title: 'Password Requirements',
      centered: true,
      content: passwordRequirements,
      okText: 'Got It!',
    });
  }
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&()?><}{+-_~.:;|/[\\]*])'
  );
  const showSuccess = () => {
    setLoading(false);
    notification.success({
      message: `Password reset`,
      description: `Your password has been reset successfully.Please Login In again`,
    });
    localStorage.clear();
    sessionStorage.clear()
    navigate('/')
   // window.location.reload();
  };
   const onResetPassword = (values: any) => {
    setLoading(true);
    setMessage('');
    const url = { changePassword: "changePassword"};

    const formData={
      password:values?.password,
      userId:loggedInUser?.id
    };

    httpService
    .post(userEndPoint[url.changePassword], formData)
    .then((response) => {       
            showSuccess();
          })
          .catch(function (error) {
            setLoading(false);
            setMessage( "Unable to change the password, please contact system admin")
          });    
    };
 
  return (
    <div className="">
      <div className="h-full">
      
        <div className="standardList  flex flex-wrap justify-center items-center bg-no-repeat ">
          <div className="relative mx-6 md:mx-auto w-full z-20 ">
            <span className="font-medium text-gray-900 text-2xl">
              Reset Password
            </span>
            {passwordRequirements}
            <div className="mt-10">             
                {message ? (
                  <div className="bg-white py-2.5 px-4 text-black font-semibold text-justify text-sm rounded-sm error-boundary flex flex-row items-center">
                    <div className="w-1/6">
                      <Icon
                        className="w-5 h-5"
                        icon="ant-design:exclamation-circle-filled"
                        color="#ffa940"
                      />
                    </div>
                    <div className="w-5/6">
                      <span>{message}</span>
                    </div>
                  </div>
                ) : null}
       
            </div>
            <div className="mt-10">
            
                <Form
                  form={resetPasswordForm}
                  layout="vertical"
                  onFinish={onResetPassword}
                  requiredMark={false}
                >
                  <div>
                    <div>
                      <Form.Item
                        name="password"
                        label={<div>Enter New Password</div>}
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            validator: (_, value) =>
                              value && strongRegex.test(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    'Password does not match criteria.'
                                  ),
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type={'password'}
                          placeholder="Password"
                          name="password"
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  'The two passwords that you entered do not match!'
                                )
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input
                          type={'password'}
                          placeholder="Password"
                          name="password"
                        />
                      </Form.Item>
                    </div>
                    <div className="mt-10 text-center login-btn-container">
                      <Button
                        id="submit"
                        type="primary"
                        htmlType="submit"
                        className="login-btn-container-btn w-full flex justify-center space-x-3"
                      >
                        {loading ? (
                          <svg
                            style={{
                              background: 'none',
                              shapeRendering: 'auto',
                            }}
                            width="16px"
                            height="16px"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="8"
                              r="42"
                              strokeDasharray="113.09733552923255 150"
                              transform="rotate(306.582 50 50)"
                            >
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                repeatCount="indefinite"
                                dur="1s"
                                values="0 50 50;360 50 50"
                                keyTimes="0;1"
                              >
                                <span>Submit</span>
                              </animateTransform>
                            </circle>
                          </svg>
                        ) : null}
                        <span>Submit</span>
                      </Button>
                    </div>
                  </div>
                </Form>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
