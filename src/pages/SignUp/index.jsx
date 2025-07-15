import { useErrorLog } from '@/hooks';
import {
    ProCard,
    ProFormSelect,
    ProFormText,
    StepsForm,
} from '@ant-design/pro-components';
import { Button, Col, Input, Row, } from 'antd';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import HomeLayout from '../../layouts/Home';
import { API } from '../../services';
import { conFarmPasswordValuate, indianStates, passwordValidate } from '../../util';

export const SignUpPage = () => {

    //-------------- State & Variables --------------//

    const handleError = useErrorLog('pages/Login');
    const [isLoading, setIsLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const navigation = useNavigate();


    //-------------- Other Methods --------------//

    const onStep1Finish = async (data) => {
        return true
        try {
            setIsLoading(true);
            const res = await API.SignUp(data, 'Otp Sent Successfully', 'Sending OTP...');
            if (res) {
                setUserEmail(data.email);
                return true;
            }
            return false;
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onStep2Finish = async (data) => {
        try {
            setIsLoading(true);
            const res = await API.OtpVerification(
                { email: userEmail, otp: data.otp },
                'OTP Verified Successfully',
                'Verifying OTP...'
            );
            if (res) {
                navigation('/');
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const res = await API.ResendOtp({ email: userEmail }, 'Otp send Successfully', 'Otp Sending');
            if (res) {
                setIsResendDisabled(true);
                setCountdown(60);
            }
        } catch (error) {
            handleError(error);
        }
    }


    //-------------- Timeout Methods --------------//

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && isResendDisabled) {
            setIsResendDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, isResendDisabled]);



    //-------------- Other Components --------------//

    const renderButtons = (props) => {
        if (props.step === 0) {
            return (
                <div className="flex justify-center">
                    <Button type="primary" size='large' onClick={props.onSubmit} loading={isLoading}>
                        Continue to OTP <ArrowRight size={16} />
                    </Button>
                </div>
            );
        }

        return (
            <div className="flex justify-center">
                <div className="flex gap-4 items-center">
                    <Button onClick={props.onPre} size='large'>
                        Go Back
                    </Button>
                    <Button
                        type="primary"
                        onClick={props.onSubmit}
                        loading={isLoading}
                        size='large'
                    >
                        Complete Signup <Check size={16} />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <HomeLayout title={'Sign Up'}>
            <div className="max-w-3xl mx-auto p-6">
                <ProCard className="shadow-md p-5" >
                    <StepsForm submitter={{ render: renderButtons }}>
                        <StepsForm.StepForm
                            size='large'
                            name="userDetails"
                            title="User Registration"
                            onFinish={onStep1Finish}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <ProFormText
                                        name="name"
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        rules={[
                                            { required: true, message: 'Full name is required' },
                                            { min: 2, message: 'Name must be at least 2 characters' }
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText
                                        name="email"
                                        label="Email Address"
                                        placeholder="Enter your email"
                                        rules={[
                                            { required: true, message: 'Email is required' },
                                            { type: 'email', message: 'Please Enter a valid email' }
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText
                                        name="phone"
                                        label="Phone Number"
                                        placeholder="Enter 10-digit mobile number"
                                        rules={[
                                            { required: true, message: 'Phone number is required' },
                                            { pattern: /^[0-9]{10}$/, message: 'Enter valid 10-digit phone number' }
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText
                                        name="designation"
                                        label="Job Title"
                                        placeholder="Enter your job title"
                                        rules={[{ required: true, message: 'Job title is required' }]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormSelect
                                        name="state"
                                        label="State"
                                        placeholder="Select your state"
                                        rules={[{ required: true, message: 'State is required' }]}
                                        options={indianStates}
                                        showSearch
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText
                                        name="district"
                                        label="District"
                                        placeholder="Enter your district"
                                        rules={[{ required: true, message: 'District is required' }]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText.Password
                                        name="password"
                                        label="Password"
                                        placeholder="At least 8 characters with uppercase, lowercase, and number"
                                        rules={[
                                            { required: true, message: 'Password is required' },
                                            {
                                                validator: passwordValidate
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText.Password
                                        name="confirm_password"
                                        label="Confirm Password"
                                        placeholder="Re-enter your password"
                                        rules={[
                                            { required: true, message: 'Please confirm your password' },
                                            conFarmPasswordValuate
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </StepsForm.StepForm>

                        <StepsForm.StepForm
                            name="otp"
                            title="OTP Verification"
                            onFinish={onStep2Finish}
                        >
                            <div className="text-center py-8">
                                <p className="mb-4 text-gray-600">
                                    We've sent a 6-digit OTP to {userEmail}
                                </p>
                                <ProFormText
                                    name="otp"
                                    rules={[
                                        { required: true, message: 'Please enter OTP' },
                                        { len: 6, message: 'OTP must be 6 digits' }
                                    ]}
                                >
                                    <Input.OTP length={6} size="large" />
                                </ProFormText>
                                <div className="mt-6">
                                    <Button
                                        type="link"
                                        onClick={handleResendOtp}
                                        disabled={isResendDisabled}
                                        className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                                    >
                                        {isResendDisabled
                                            ? `Resend OTP in ${countdown}s`
                                            : "Didn't receive OTP? Resend"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </StepsForm.StepForm>
                    </StepsForm>
                </ProCard>
            </div>
        </HomeLayout>
    );
};