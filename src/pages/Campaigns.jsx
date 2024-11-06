import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Typography, Drawer } from 'antd';
import CampaignForm from '../components/forms/CampaignForm';

const initialData = [
    {
        id: 1,
        name: 'Campaign 1',
        budget: 1000,
        count_devices: 10,
        status: 'Active',
    },
    {
        id: 2,
        name: 'Campaign 2',
        budget: 2000,
        count_devices: 15,
        status: 'Inactive',
    },
    {
        id: 3,
        name: 'Campaign 3',
        budget: 3000,
        count_devices: 20,
        status: 'Paused',
    },
];

export default function Campaigns() {
    const [data, setData] = useState(initialData)
    const [drawer, setDrawer] = useState(false)

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id)
        setData(updatedData)
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Бюджет',
            dataIndex: 'budget',
            key: 'budget',
        },
        {
            title: 'Количество устройств',
            dataIndex: 'count_devices',
            key: 'count_devices',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Typography.Text style={{ color: status === 'Active' ? 'green' : status === 'Inactive' ? 'red' : 'default' }}>
                    {status}
                </Typography.Text>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Вы уверены, что хотите удалить эту кампанию?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button type="link" danger>
                            Удалить
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary"
                onClick={() => setDrawer(true)}
                style={{ marginBottom: 16 }}>
                Добавить кампанию
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />

            <Drawer
                width={600}
                title="Add campaign"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose>
                <CampaignForm closeModal={() => setDrawer(false)} />
            </Drawer>
        </div>
    );
}
