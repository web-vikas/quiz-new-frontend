import {
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined
} from '@ant-design/icons';
import {
    ProConfigProvider,
    ProLayout
} from '@ant-design/pro-components';
import {
    ConfigProvider,
    Dropdown,
    Input,
    theme
} from 'antd';
import { useState } from 'react';
import { PageWrapper } from './PageWrapper';
import path from './path';
import { Link, useLocation } from 'react-router';


const SearchInput = () => {
    const { token } = theme.useToken();
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <SearchOutlined
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    />
                }
                placeholder="搜索方案"
                variant="borderless"
            />
            <PlusCircleFilled
                style={{
                    color: token.colorPrimary,
                    fontSize: 24,
                }}
            />
        </div>
    );
};

export const DashboardWarper = ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname;

    if (typeof document === 'undefined') {
        return <div />;
    }
    return (
        <div
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                >
                    <ProLayout
                        prefixCls="my-prefix"
                        layout='mix'
                        fixSiderbar={true}
                        splitMenus={false}
                        navTheme="light"
                        contentWidth="Fluid"
                        colorPrimary="#F5222D"
                        siderMenuType="sub"
                        bgLayoutImgList={[
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                left: 85,
                                bottom: 100,
                                height: '303px',
                            },

                        ]}
                        {...path}
                        location={{
                            pathname,
                        }}


                        avatarProps={{
                            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                            size: 'small',
                            render: (props, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'logout',
                                                    icon: <LogoutOutlined />,
                                                    label: 'Logout',
                                                },
                                            ],
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        menuItemRender={(item, dom) => {
                            if (item.isUrl || !item.path) return dom;
                            return <Link to={item.path}>{dom}</Link>;
                        }}
                        headerTitleRender={(logo, title, _) => {
                            const defaultDom = (
                                <a>
                                    {logo}
                                    {title}
                                </a>
                            );
                            if (typeof window === 'undefined') return defaultDom;
                            if (document.body.clientWidth < 1400) {
                                return defaultDom;
                            }
                            if (_.isMobile) return defaultDom;
                            return (
                                <>
                                    {defaultDom}
                                </>
                            );
                        }}
                        menuFooterRender={(props) => {
                            if (props?.collapsed) return undefined;
                            return (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        paddingBlockStart: 12,
                                    }}
                                >
                                    <div>© 2025 Made with love</div>
                                    <div>by Ant Design</div>
                                </div>
                            );
                        }}

                    >
                        <PageWrapper>
                            {children}
                        </PageWrapper>
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};