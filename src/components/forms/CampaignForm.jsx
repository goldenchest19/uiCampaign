import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, message } from 'antd';

const { Option } = Select;

export default function CampaignForm({ closeModal }) {
    const [devices, setDevices] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        // Запрос на получение списка устройств
        fetch('http://localhost:9000/api/device-groups')  // Исправил URL для получения устройств
            .then((response) => response.json())
            .then((data) => {
                setDevices(data);  // Обновление состояния devices
            })
            .catch((error) => message.error('Ошибка загрузки списка устройств'));

        // Запрос на получение списка баннеров
        fetch('http://localhost:9000/api/banners')  // Исправил URL для получения баннеров
            .then((response) => response.json())
            .then((data) => {
                setBanners(data);  // Обновление состояния banners
            })
            .catch((error) => message.error('Ошибка загрузки списка баннеров'));
    }, []);  // Пустой массив зависимостей для выполнения только при монтировании компонента

    const handleSubmit = (values) => {
        // Формируем объект с данными из формы
        const campaignData = {
            name: values.name,
            budget: values.budget,
            countDevices: values.devices.length,  // Количество выбранных устройств
            status: 'Active',  // Устанавливаем статус как активный по умолчанию
            description: values.description,
            startDate: values.start_date.format('YYYY-MM-DD'),
            endDate: values.end_date.format('YYYY-MM-DD'),
            deviceId: values.devices,  // Список выбранных устройств
            bannerId: values.banner,  // ID выбранного баннера
        };

        // Отправка POST запроса на создание кампании
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
                    closeModal();  // Закрытие модального окна
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
