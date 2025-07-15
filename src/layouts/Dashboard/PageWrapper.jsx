import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Button } from 'antd'

export const PageWrapper = ({ children }) => {
    return (
        <PageContainer
         
            // extra={[
            //     <Button key="3">操作</Button>,
            //     <Button key="2">操作</Button>,

            // ]}
            // subTitle="简单的描述"
            // footer={[
            //     <Button key="3">重置</Button>,
            //     <Button key="2" type="primary">
            //         提交
            //     </Button>,
            // ]}
        >
            <ProCard
                style={{
                    height: '200vh',
                    minHeight: 800,
                }}
            >
                {children}
            </ProCard>
        </PageContainer>
    )
}
