import { PageContainer } from '@ant-design/pro-components'
import { Button, Typography } from 'antd'
import { LogsIcon, SquareLibrary } from 'lucide-react'
import React from 'react'

const HomeLayout = ({ children, title }) => {
    return (
        <PageContainer
            fixedHeader

            header={{
                title: <SquareLibrary className='text-emerald-600' />,
                ghost: false,

            }}
            extra={<Typography.Text className='font-semibold'>{title}</Typography.Text>
            }
            footer={
                <Typography.Paragraph className='p-4'>@2025 All Right Reserved</Typography.Paragraph>
            }>
            {children}
        </PageContainer>
    )
}

export default HomeLayout