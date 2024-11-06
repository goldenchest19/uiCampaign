import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Typography, Drawer } from 'antd';
import DeviceForm from '../components/forms/DeviceForm';

const initialData = [
    {
        id: 1,
        name: 'БГ 1',
        count_devices: 10,
        status: 'Active',
    },
    {
        id: 2,
        name: 'БГ 2',
        count_devices: 15,
        status: 'Inactive',
    },
    {
        id: 3,
        name: 'БГ 3',
        count_devices: 20,
        status: 'Active ',
    },
];

export default function DeviceGroups() {
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
            title: 'Количество устройств',
            dataIndex: 'count_devices',
            key: 'count_devices',
        },
        {
            title: 'Status',
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
                        title="Вы уверены, что хотите удалить эту группу?"
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
                Добавить группу устройств
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
                title="Add business group"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose>
                <DeviceForm closeModal={() => setDrawer(false)} />
            </Drawer>
        </div>
    );
}