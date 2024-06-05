
import Swal, { SweetAlertOptions } from "sweetalert2";

const toast = ({
  title,
  icon = "success",
  timer = 2500,
  position = "bottom-end",
}: SweetAlertOptions) => {
  toast;
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer,
    animation: true,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    title,
    icon,
  });
};

export default toast;
