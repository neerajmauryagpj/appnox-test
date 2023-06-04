import { Col, Row, Form, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import API from "../services/api";
const { confirm } = Modal;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [userForm] = Form.useForm();
  useEffect(() => {
    getUsers();
  }, []);
  const handleSaveUser = () => {
    const validationFields = ["name", "email", "phone", "website"];
    userForm
      .validateFields(validationFields)
      .then(() => {
        const _users = [...users];
        const index = users.findIndex((row) => row.id === currentUserId);
        const fieldsValue = userForm.getFieldsValue([
          "name",
          "email",
          "phone",
          "website",
        ]);
        _users[index] = { ..._users[index], ...fieldsValue };
        setUsers(_users);
        setOpen(false);
      })
      .catch(() => {
        //console.log(e);
      });
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getUsers = async () => {
    setPageLoading(true);
    try {
      const { data } = await API.get("users");
      setUsers(data);
    } catch (e) {
      console.log(e);
    } finally {
      /* SetTimeout is used only for showing loader */
      setTimeout(() => {
        setPageLoading(false);
      }, 1500);
    }
  };
  const updateUser = (id) => {
    setOpen(true);
    setCurrentUserId(id);
    const currentUser = users.find((row) => row.id === id);
    userForm.setFieldsValue({
      ...currentUser,
    });
  };
  const deleteUser = (id) => {
    const _users = [...users];
    const index = users.findIndex((row) => row.id === id);
    _users.splice(index, 1);
    setUsers(_users);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure ?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Do you really want to delete user? this process cannot be reversible",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUser(id);
      },
      onCancel() {
        //console.log("Cancel");
      },
    });
  };
  return (
    <>
      {!pageLoading ? (
        <Row>
          {users.map((row, key) => (
            <Col key={key} xs={24} sm={24} md={12} lg={8} xl={6}>
              <UserCard
                data={row}
                onUpdate={updateUser}
                onDelete={showDeleteConfirm}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Loader />
      )}
      <Modal
        title="User Update"
        open={open}
        onOk={handleSaveUser}
        onCancel={handleCancel}
      >
        <Form {...layout} form={userForm}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
              {
                type: "email",
                message: "Invalid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserListing;
