import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Typography, Drawer } from 'antd';
import CampaignForm from '../components/forms/CampaignForm';



export default function Campaigns() {
    const [data, setData] = useState([])
    const [drawer, setDrawer] = useState(false)

    const handleDelete = (id) => {
        fetch(`http://localhost:9000/api/campaigns/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedData = data.filter((item) => item.id !== id);
                    setData(updatedData);
                } else {
                    console.error('Ошибка при удалении кампании');
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса', error);
            });
    };

    useEffect(() => {
        fetch('http://localhost:9000/api/campaigns')
            .then((response) => response.json()) 
            .then((data) => setData(data)) 
            .catch((error) => console.error('Ошибка при получении данных:', error)); 
    }, []);

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
            dataIndex: 'countDevices',
            key: 'countDevices',
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
