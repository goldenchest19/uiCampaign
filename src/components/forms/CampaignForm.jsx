import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, message } from 'antd';

const { Option } = Select;

export default function CampaignForm({ closeModal }) {
    const [devices, setDevices] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        // Запрос на получение списка устройств
        fetch('http://localhost:8080/api/devices') 
            .then((response) => response.json())
            .then((data) => setDevices(data))
            .catch((error) => message.error('Ошибка загрузки списка устройств'));

        // Запрос на получение списка баннеров
        fetch('http://localhost:8080/api/banners')
            .then((response) => response.json())
            .then((data) => setBanners(data))
            .catch((error) => message.error('Ошибка загрузки списка баннеров'));
    }, []);

    const handleSubmit = (values) => {
        console.log('Received values:', values);
        message.success('Кампания успешно создана!');
        closeModal();
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Введите название кампании' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Описание"
                name="description"
                rules={[{ message: 'Введите описание кампании' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Дата старта"
                name="start_date"
                rules={[{ required: true, message: 'Выберите дату старта' }]}
            >
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
                label="Дата окончания"
                name="end_date"
                rules={[{ required: true, message: 'Выберите дату окончания' }]}
            >
                <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
                label="Устройства"
                name="devices"
                rules={[{ message: 'Выберите устройства' }]}
            >
                <Select mode="multiple" placeholder="Выберите устройства">
                    {devices.map((device) => (
                        <Option key={device.id} value={device.id}>
                            {device.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Баннер"
                name="banner"
                rules={[{ message: 'Выберите баннер' }]}
            >
                <Select placeholder="Выберите баннер">
                    {banners.map((banner) => (
                        <Option key={banner.id} value={banner.id}>
                            {banner.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Бюджет"
                name="budget"
                rules={[{ required: true, message: 'Введите бюджет' }]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Создать кампанию
                </Button>
            </Form.Item>
        </Form>
    );
}
