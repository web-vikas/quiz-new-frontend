import { AntdProvider } from './antd';
import { CustomWrapper } from './Custom';

export const Providers = ({ children }) => {
    console.log('Providers', children);

    return (
        <AntdProvider>
            <CustomWrapper>
                {children}
            </CustomWrapper>
        </AntdProvider>
    )
}

