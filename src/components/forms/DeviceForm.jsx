import React, { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';

export default function DeviceForm({ closeModal }) {
    const [deviceIds, setDeviceIds] = useState([]);

    const handleDeviceChange = (value) => {
        setDeviceIds(value);
    };

    const handleSubmit = (values) => {
        console.log('Received values:', values);
        message.success('Группа успешно создана!');
        closeModal();
    };

    return (
        <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Введите название группы' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
                rules={[{ message: 'Введите описание группы' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Город"
                name="city"
                rules={[{ required: true, message: 'Введите город' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Устройства"
                name="devices"
                rules={[{ required: true, message: 'Выберите устройства' }]}
            >
                <Select
                    mode="tags" // Используем режим tags для поддержки добавления тегов
                    placeholder="Выберите или добавьте устройства"
                    onChange={handleDeviceChange}
                    value={deviceIds}
>   
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Создать группу
                </Button>
            </Form.Item>
        </Form>
    );
}
