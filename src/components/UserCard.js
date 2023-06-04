import PropTypes from "prop-types";
import {
  EditOutlined,
  HeartFilled,
  DeleteFilled,
  MailOutlined,
  HeartOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useEffect, useState } from "react";
const UserCard = ({ data, onDelete, onUpdate }) => {
  const [isLike, setIsLike] = useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(data);
  }, [data]);
  const handleUpdateUser = (id) => {
    onUpdate(id);
  };
  const handleDeleteUser = (id) => {
    onDelete(id);
  };
  return (
    <>
      <Card
        style={{ margin: 15 }}
        cover={
          <div className="cardHeadImage">
            <img
              alt="example"
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              height={200}
              width={200}
            />
          </div>
        }
        actions={[
          isLike ? (
            <HeartOutlined
              key="heart"
              style={{ fontSize: "18px", color: "red" }}
              onClick={() => setIsLike(!isLike)}
            />
          ) : (
            <HeartFilled
              key="heart"
              style={{ fontSize: "18px", color: "red" }}
              onClick={() => setIsLike(!isLike)}
            />
          ),
          <EditOutlined
            key="edit"
            onClick={() => handleUpdateUser(user.id)}
            style={{ fontSize: "18px" }}
          />,
          <DeleteFilled
            key="delete"
            onClick={() => handleDeleteUser(user.id)}
            style={{ fontSize: "18px" }}
          />,
        ]}
      >
        <h3>{user.name}</h3>
        <div style={{ display: "flex" }}>
          <MailOutlined style={{ fontSize: 18 }} />
          <p style={{ marginLeft: 10 }}>{user.email}</p>
        </div>
        <div style={{ display: "flex" }}>
          <PhoneOutlined style={{ fontSize: 18 }} />
          <p style={{ marginLeft: 10 }}>{user.phone}</p>
        </div>
        <div style={{ display: "flex" }}>
          <GlobalOutlined style={{ fontSize: 18 }} />
          <p style={{ marginLeft: 10 }}>http://{user.website}</p>
        </div>
      </Card>
    </>
  );
};
UserCard.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};
export default UserCard;
