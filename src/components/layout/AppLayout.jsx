import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';

export default function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSider collapsed={collapsed} />
            <Layout>
                <AppHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    colorBgContainer={colorBgContainer}
                />
                <AppContent colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
            </Layout>
        </Layout>
    )
}