import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function AppContent({ colorBgContainer, borderRadiusLG }) {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}>
            <Outlet />
        </Content>
    )
}