import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

export default function Banners() {
    const [banners, setBanners] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetch("http://localhost:9000/api/banners")
            .then((response) => response.json())
            .then((data) => setBanners(data))
            .catch(() => message.error("Ошибка при загрузке баннеров"));
    }, []);

    const deleteBanner = (id) => {
        fetch(`http://localhost:9000/api/banners/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setBanners(banners.filter((banner) => banner.id !== id));
                message.success("Баннер удален");
            })
            .catch(() => message.error("Ошибка при удалении баннера"));
    };

    const handleAddBanner = (values) => {
        const { name, imageUrl } = values;

        const newBanner = { name, urlImage: imageUrl };  
        fetch("http://localhost:9000/api/banners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBanner),
        })
            .then((response) => response.json())
            .then((newBannerData) => {
                setBanners([...banners, newBannerData]);
                setIsModalVisible(false);
                message.success("Баннер добавлен");
                form.resetFields();
            })
            .catch(() => message.error("Ошибка при добавлении баннера"));
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ marginBottom: 20 }}
            >
                Добавить баннер
            </Button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                {banners.map((banner) => (
                    <div key={banner.id} style={{ width: 200, textAlign: "center" }}>
                        <img
                            src={banner.urlImage}
                            alt={banner.name}
                            style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: "8px" }}
                        />
                        <div style={{ marginTop: 10 }}>
                            <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                onClick={() => deleteBanner(banner.id)}
                                size="small"
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title="Добавить баннер"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    onFinish={handleAddBanner}
                    layout="vertical"
                >
                    <Form.Item
                        label="Имя баннера"
                        name="name"
                        rules={[{ required: true, message: "Введите имя баннера" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ссылка на картинку"
                        name="imageUrl"
                        rules={[{ required: true, message: "Введите ссылку на картинку" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить баннер
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
