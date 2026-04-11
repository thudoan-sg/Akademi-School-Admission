import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function ManageTeachers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);

    const API = "https://mindx-mockup-server.vercel.app/api/resources/teachers?apiKey=69ca789b3bb225ca08190764";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            setUsers(data.data.data); // đúng format mới
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (_id) => {
        if (!window.confirm("Delete this teacher?")) return;

        await fetch(
            `https://mindx-mockup-server.vercel.app/api/resources/teachers/${_id}?apiKey=69ca789b3bb225ca08190764`,
            { method: "DELETE" }
        );

        setUsers(users.filter((u) => u._id !== _id));
    };

    const handleUpdate = async () => {
        await fetch(
            `https://mindx-mockup-server.vercel.app/api/resources/teachers/${editingUser._id}?apiKey=69ca789b3bb225ca08190764`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingUser),
            }
        );

        setUsers(
            users.map((u) =>
                u._id === editingUser._id ? editingUser : u
            )
        );

        setEditingUser(null);
    };

    const handleAdd = async () => {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editingUser),
        });

        const data = await res.json();

        setUsers([...users, data.data]);
        setEditingUser(null);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24 }}>
            <h2 className="section-title">Manage Teachers</h2>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 16, background: "#20c997", borderColor: "#20c997" }}
                onClick={() =>
                    setEditingUser({ name: "", subject: "", email: "" })
                }
            >
                Add Teacher
            </Button>

            <Table
                dataSource={users}
                rowKey="_id"
                columns={[
                    { title: "Name", dataIndex: "name" },
                    { title: "Subject", dataIndex: "subject" },
                    { title: "Email", dataIndex: "email" },
                    {
                        title: "Actions",
                        render: (_, record) => (
                            <>
                                <Button
                                    style={{ border: "1px solid #20c997", color: "#20c997" }}
                                    onClick={() => setEditingUser(record)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    style={{ marginLeft: 8 }}
                                    onClick={() => handleDelete(record._id)}
                                >
                                    Delete
                                </Button>
                            </>
                        ),
                    },
                ]}
            />

            <Modal
                open={!!editingUser}
                onCancel={() => setEditingUser(null)}
                onOk={() => {
                    if (editingUser._id) {
                        handleUpdate();
                    } else {
                        handleAdd();
                    }
                }}
                title={editingUser?._id ? "Edit Teacher" : "Add Teacher"}
                okButtonProps={{
                    style: {
                        backgroundColor: "#20c997",
                        borderColor: "#20c997",
                    },
                }}
            >
                {editingUser && (
                    <>
                        <Input
                            placeholder="Name"
                            value={editingUser.name}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    name: e.target.value,
                                })
                            }
                            style={{ marginBottom: 8 }}
                        />

                        <Input
                            placeholder="Subject"
                            value={editingUser.subject}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    subject: e.target.value,
                                })
                            }
                            style={{ marginBottom: 8 }}
                        />

                        <Input
                            placeholder="Email"
                            value={editingUser.email}
                            onChange={(e) =>
                                setEditingUser({
                                    ...editingUser,
                                    email: e.target.value,
                                })
                            }
                        />
                    </>
                )}
            </Modal>
        </div>
    );
}

export default ManageTeachers;