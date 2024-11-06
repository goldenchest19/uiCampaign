import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm, Typography } from 'antd';

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
    const [data, setData] = useState(initialData);

    // Функция для удаления строки
    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    // Функция для добавления новой кампании
    const handleAdd = () => {
        const newData = {
            id: data.length + 1,
            name: `Campaign ${data.length + 1}`,
            budget: 1000 * (data.length + 1),
            count_devices: 10 + data.length,
            status: 'Active',
        };
        setData([...data, newData]);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
        },
        {
            title: 'Count Devices',
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
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
                Добавить кампанию
            </Button>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
}
