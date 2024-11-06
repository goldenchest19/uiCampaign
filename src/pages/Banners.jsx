import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Upload, message } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

export default function Banners() {
    const [banners, setBanners] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/banners")
            .then((response) => response.json())
            .then((data) => setBanners(data))
            .catch(() => message.error("Ошибка при загрузке баннеров"));
    }, []);

    const deleteBanner = (id) => {
        fetch(`http://localhost:8080/api/banners/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setBanners(banners.filter((banner) => banner.id !== id));
                message.success("Баннер удален");
            })
            .catch(() => message.error("Ошибка при удалении баннера"));
    };

    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:8080/api/banners/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((newBanner) => {
                setBanners([...banners, newBanner]);
                setIsModalVisible(false);
                message.success("Баннер добавлен");
            })
            .catch(() => message.error("Ошибка при загрузке баннера"));
    };

    const columns = [
        {
            title: "Изображение",
            dataIndex: "image",
            key: "image",
            render: (image) => <img src={image} alt="banner" style={{ width: 100 }} />,
        },
        {
            title: "Действия",
            key: "action",
            render: (_, record) => (
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteBanner(record.id)}
                >
                    Удалить
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                Добавить баннер
            </Button>

            <Table
                dataSource={banners}
                columns={columns}
                rowKey="id"
                style={{ marginTop: 20 }}
            />

            <Modal
                title="Добавить баннер"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Upload
                    customRequest={({ file, onSuccess, onError }) => {
                        handleUpload(file);
                        onSuccess();
                    }}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Выберите файл</Button>
                </Upload>
            </Modal>
        </div>
    );
};

