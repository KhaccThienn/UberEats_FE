import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Toast = ({ icon, title }) => {
  useEffect(() => {
    const toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    toast.fire({
      icon: icon,
      title: title,
    });
  }, [icon, title]);

  return null; // Toast component doesn't render anything
};

export default Toast;
