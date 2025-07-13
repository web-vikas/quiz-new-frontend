/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create App component. Return Wrapper and navigation inside and wrap Redux Provider
 */

import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';


export const AntdProvider = ({ children }) => {
    return (

        <ConfigProvider
            locale={enUS}

            theme={{
                cssVar: true,
            }}

        >
            {children}
        </ConfigProvider>

    );
}

