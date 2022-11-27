import React, { useState, useEffect } from "react";
import {
  ReadOutlined,
  HighlightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import classes from "./posts.module.css";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const items = [
    {
      label: "Posts",
      key: "posts",
      icon: <ReadOutlined />,
    },
    {
      label: "Create Post",
      key: "create_post",
      icon: <HighlightOutlined />,
    },
    {
      label: "",
      key: "signup",
      icon: <UserOutlined style={{"marginLeft": "10px"}}/>,
    },
  ];
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/posts"
      : location.pathname
  );
  console.log(location.pathname.split('/')[1]);
  console.log("current", current);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname.split('/')[1]);
      }
    }
  }, [location, current]);

  const navigate = useNavigate();
  const onClick = (e = "") => {
    navigate(`/${e.key}`);
    setCurrent(e.key);
    console.log("key cicked in menu item", e.key);
  };

  return (
    <Menu
      className={classes.navBarMain}
      onClick={onClick}
      selectedKeys={[current]}
      defaultSelectedKeys={["posts"]}
      mode="horizontal"
      items={items}
    />
  );
}

export default Navbar;
