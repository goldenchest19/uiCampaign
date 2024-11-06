import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom'


const { Sider } = Layout;

export default function AppSider({ collapsed }) {
    return (
        <Sider width="20%" trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: <Link to="/campaigns">Рекламные кампании</Link>,
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: <Link to='/devices'>Группы устройств</Link>,
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: <Link to='/banners'>Баннеры</Link>,
                    },
                ]}
            />
        </Sider>
    );
}