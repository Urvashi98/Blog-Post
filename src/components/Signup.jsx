import React, { useState } from "react";
import Dialog from "../Reusable/Dialog";

function Signup() {
    const [openModal, setOpenModal] = useState(true);
  return (
    <div>
      <Dialog openModal={openModal} setOpenModal={() => setOpenModal(false)}/>
    </div>
  );
}

export default Signup;
