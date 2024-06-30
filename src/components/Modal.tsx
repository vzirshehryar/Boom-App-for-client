"use client";
import { useEffect, useState } from "react";

const Modal = ({ trialClaimed }: { trialClaimed: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const again = localStorage.getItem("again");
    if (again !== "true") {
      setShowModal(true);
      localStorage.setItem("again", "true");
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  if (trialClaimed) {
    return null;
  }
  return <ModalSection show={showModal} handleClose={handleClose} />;
};

export default Modal;

function ModalSection({ show, handleClose }) {
  const showHideClassName = show ? "flex" : "hidden";

  return (
    <div
      className={`fixed left-0 top-0 z-20 h-screen w-screen overflow-hidden bg-[#00000040] ${showHideClassName} items-center justify-center`}
    >
      <section className="flex h-[400px] w-[400px] flex-col border-[1px] border-[#888] bg-[#fefefe] px-5 py-4 text-black">
        <div className="flex h-[80%] flex-col items-center justify-center">
          <h2 className="text-black">Welcome!</h2>
          <p className="text-black">You are on your Trial Period</p>
        </div>
        <button
          onClick={handleClose}
          className="w-full rounded-md bg-primary p-2 text-white"
        >
          Okay
        </button>
      </section>
    </div>
  );
}
