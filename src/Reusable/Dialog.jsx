import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

function Dialog(props) {
  // const [openModal, setOpenModal] = useState(false);
  const { openModal = false, setOpenModal } = props;
  let navigate = useNavigate(); // use to navigate to page

  console.log(openModal);
  const handleClick = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    navigate("/", { replace: "true" });
  };

  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={openModal}
        onOk={handleClick}
        onCancel={handleClick}
        destroyOnClose={true}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
        <Link to={'/login'}>Login </Link>
      </Modal>
    </>
  );
}

export default Dialog;
