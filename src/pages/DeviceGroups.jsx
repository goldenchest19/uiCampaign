import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Typography, Drawer } from 'antd';
import DeviceForm from '../components/forms/DeviceForm';


export default function DeviceGroups() {
    const [data, setData] = useState([])
    const [drawer, setDrawer] = useState(false)

    const handleDelete = (id) => {
        fetch(`http://localhost:9000/api/device-groups/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedData = data.filter((item) => item.id !== id);
                    setData(updatedData);
                } else {
                    console.error('Ошибка при удалении группы устройств');
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса', error);
            });
    };

    useEffect(() => {
        fetch('http://localhost:9000/api/device-groups')
            .then((response) => response.json())
            .then((data) => {
                const formattedData = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    count_devices: item.countDevices, 
                    status: item.status,
                }));
                setData(formattedData);  
            })
            .catch((error) => {
                console.error('Ошибка загрузки данных:', error);
            });
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