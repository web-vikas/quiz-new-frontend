import { useState } from 'react';
import { useErrorLog } from '@/hooks';
import { Button, Checkbox, Form, Input } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { API } from '../../services';
import { Link } from 'react-router';
import HomeLayout from '../../layouts/Home';
export const LoginPage = () => {

    //-------------- State & Variables --------------//

    const handleError = useErrorLog('pages/Login');
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);


    //-------------- Other Methods --------------//

    const onLogin = async (values) => {
        try {
            const res = await API.Login(values, 'Login Success!', 'Authenticating...')
            console.log(res, 'Login');

            if (res) {
                console.log(res);
            }

        } catch (error) {
            handleError(error);
            console.debug('[Login Error] : ', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <HomeLayout title={'Login'}>
            <section className="w-full flex h-screen">
                <div className=" sm:w-[400px] m-auto rounded-2xl sm:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] p-7 ">
                    <div className=" mb-8">
                        <h1 className="text-center text-2xl font-bold">Tools</h1>
                        <p className=" text-center text-xl mt-3 ">Welcome! Login in to your Account.</p>
                    </div>

                    <Form
                        size='large'

                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={onLogin}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your ID!'
                                }
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="ID" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>

                        <div className='flex justify-between mb-4' >
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="!font-semibold">Remember me</Checkbox>
                            </Form.Item>
                            <div>
                                <Link to='/sign-up'>New Here?</Link>
                            </div>
                        </div>

                        <Form.Item className="mb-0">
                            <Button block type="primary" htmlType="submit" loading={isLoading}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </HomeLayout>
    )
}

