import { Icon } from '@iconify/react';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { userEndPoint } from '../api/primecareApi.endpoint';
import { httpService } from '../service/http.service';
import { setToken} from '../service/token.service';
import Logo from '../features/icons/logo.png';
const LoginPage = ()=>{
    const [loginForm] = Form.useForm();
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const onLogin =(values)=>{
      setLoading(true);
      setMessage('');
     const userName=values.userName;
      const password=values.password;       
        httpService.post(userEndPoint.authenticate,{userName,password})
        .then((res)=>{
          localStorage.setItem('user', JSON.stringify(res.data));
            setToken(res.data.token);          
           navigate('/dashboard')  
           setLoading(false); 
        })
        .catch(error=>{
          console.log(error);
          setMessage(
           error.response.data.error
          );
          setLoading(false); 
        }); 
       
    }
    return (
    
      <div className="w-3/3">
      <div className="h-full">
        <div className="standardList  flex flex-wrap justify-center items-center bg-no-repeat h-screen">
      
          <div className="relative mx-6 md:mx-auto w-full md:w-1/2 lg:w-96 z-20 ">
          
          <img width={250} style={{height:'3em'}}
            src={Logo}
            className="cursor-pointer h-8"
            alt="PrimeCare"
          />   
            <span className="font-medium text-gray-900 text-2xl">            
              Login into PrimeCare
            </span>
            <div className="mt-10">
              <div>
                {message ? (
                  <div className="bg-white py-2.5 px-4 text-red font-semibold text-justify text-sm rounded-sm error-boundary flex flex-row items-center">
                    <div className="w-1/6">
                      <Icon
                        className="w-5 h-5"
                        icon="ant-design:exclamation-circle-filled"
                        color="#ffa940"
                      /> 
                    </div>
                    <div className="w-5/6">
                      <span style={{color:'red'}}>{message}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
              <Form
                  form={loginForm}
                  layout="vertical"
                  onFinish={onLogin}
                  requiredMark={false}
                >
                  <div>
                    <div className="mb-2">
                      <Form.Item
                        name="userName"
                        label="UserName"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter a valid UserName.',
                          },
                        ]}
                      >
                       <Input
                          autoComplete="userName"
                          type="text"
                          placeholder={'UserName'}
                          name="userName"
                        /> 
                      </Form.Item>
                    </div>

                    <div>
                     <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter a valid password',
                          },
                        ]}
                      >
                        <Input
                          type={'password'}
                          placeholder="Password"
                          name="password"
                        />
                      </Form.Item>
                    </div>
                    
                    <Button
                        style={{width:'100%'}}
                        id="submit"
                        type="primary"
                        htmlType="submit"
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
                                <span>Log in</span>
                              </animateTransform>
                            </circle>
                          </svg>
                        ) : null}
                        <span>{'Log in' }</span>
                      </Button>
                  </div>
                </Form>
                </div>
        </div>
      </div>
    </div>
    
    )
}

export default LoginPage