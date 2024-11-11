import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, message } from 'antd';

const { Option } = Select;

export default function CampaignForm({ closeModal }) {
    const [devices, setDevices] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/api/device-groups')  
            .then((response) => response.json())
            .then((data) => {
                setDevices(data);  
            })
            .catch((error) => message.error('Ошибка загрузки списка устройств'));

        fetch('http://localhost:9000/api/banners')  
            .then((response) => response.json())
            .then((data) => {
                setBanners(data);  
            })
            .catch((error) => message.error('Ошибка загрузки списка баннеров'));
    }, []);  

    const handleSubmit = (values) => {
        const campaignData = {
            name: values.name,
            budget: values.budget,
            countDevices: values.devices.length,  
            status: 'Active',  
            description: values.description,
            startDate: values.start_date.format('YYYY-MM-DD'),
            endDate: values.end_date.format('YYYY-MM-DD'),
            deviceId: values.devices,  
            bannerId: values.banner,  
        };

        fetch('http://localhost:9000/api/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData),
        })
            .then((response) => {
                if (response.ok) {
                    message.success('Кампания успешно создана!');
                    closeModal();  
                } else {
                    message.error('Ошибка создания кампании');
                }
            })
            .catch((error) => {
                message.error('Ошибка при отправке данных');
                console.error(error);
            });
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
            >
                <Select placeholder="Выберите устройства">
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
