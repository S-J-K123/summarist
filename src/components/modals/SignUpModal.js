import { Modal } from "@mui/material";
import React, { useState, useEffect } from "react";


export default function () {
    const [isOpen, setIsOpen] = useState(false)
    const handleClose =() => isOpen(false)
  return (
    <div>
      <button className="text-[#116BE9] flex justify-center mb-1 w-full">
        Don't have an account?
      </button>

<Modal
open={isOpen}
onClose={handleClose}
>

<div>

</div>

</Modal>


    </div>
  );
}
