import { useErrorLog } from '@/hooks';
import {
    ProCard,
    ProFormSelect,
    ProFormText,
    StepsForm,
} from '@ant-design/pro-components';
import { Button, Col, Input, Row, } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { API } from '../../services';
import { indianStates, isValidPassword } from '../../util';
import HomeLayout from '../../layouts/Home';

export const SignUpPage = () => {


    //-------------- State & Variables --------------//

    const handleError = useErrorLog('pages/Login');
    const [isLoading, setIsLoading] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigation = useNavigate();


    //-------------- Api call here --------------//

    const onStep1Finish = async (data) => {
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
        console.log(data)
        try {
            setIsLoading(true);
            const res = await API.OtpVerification(
                { email: userEmail, otp: otpValue },
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
            await API.ResendOtp({ email: userEmail }, 'Otp send Successfully', 'Otp Sending');
        } catch (error) {
            handleError(error);
        }
    }


    //-------------- Custom components render --------------//

    const renderButtons = (props) => {
        if (props.step === 0) {
            return (
                <Button type="primary" onClick={props.onSubmit} loading={isLoading} className="h-10">
                    Continue to OTP →
                </Button>
            );
        }

        return (
            <div className="flex gap-4 items-center">
                <Button onClick={props.onPre} size='large'>
                    Go Back
                </Button>
                <Button
                    type="primary"
                    onClick={props.onSubmit}
                    disabled={otpValue.length !== 6}
                    loading={isLoading}
                    className="h-10"
                >
                    Complete Signup ✓
                </Button>
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
                                        fieldProps={{ className: "rounded-lg" }}
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
                                            // { type: 'number', message: 'Enter Valid Phone' }
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
                                                validator: (_, value) => {
                                                    if (!value || isValidPassword(value)) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Password must be at least 8 characters with uppercase, lowercase, and number'));
                                                }
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
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Passwords do not match'));
                                                },
                                            }),
                                        ]}
                                        fieldProps={{
                                            visibilityToggle: true,
                                            className: "rounded-lg"
                                        }}
                                    />
                                </Col>
                            </Row>
                        </StepsForm.StepForm>

                        <StepsForm.StepForm
                            name="otp"
                            title="OTP Verification"
                            onFinish={onStep2Finish}
                        >

                            <Input.OTP value={otpValue} onChange={(e) => setOtpValue(e.target.value)} />

                            <div className="text-center mt-4">
                                <Button
                                    type="link"
                                    onClick={handleResendOtp}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Didn't receive OTP? Resend
                                </Button>
                            </div>
                        </StepsForm.StepForm>
                    </StepsForm>
                </ProCard>
            </div>
        </HomeLayout>
    );
};
