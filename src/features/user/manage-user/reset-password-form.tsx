
import React, { useState } from 'react'
import { Button, Form, Input, Modal, notification } from 'antd'
import { Icon } from '@iconify/react';

const ResetPasswordForm=(form, isEditMode, modalConfig)=> {
  const [message, setMessage] = useState('');
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
  return (
    <Form
    form={form}
    layout={"horizontal"}
    preserve={false}
    size="small"
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 30 }}
     
 
     >
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
                 
                </div>
            
          </div>
        </div>
      </div>
    </div>
    </Form>
  )
}

export default ResetPasswordForm