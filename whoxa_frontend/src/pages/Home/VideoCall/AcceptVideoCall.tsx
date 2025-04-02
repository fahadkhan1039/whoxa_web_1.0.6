import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TextTranslate from "../../../utils/TextTranslate";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { updateViewState } from "../../../store/Slices/ViewManagerSlice";

export default function AcceptVideoCall() {
  let navigate = useNavigate();
  const ViewManager = useAppSelector((state) => state.ViewManager);
  const CallData = useAppSelector((state) => state.CallData);
  const dispatch = useAppDispatch();

  function yesLogout() {
    dispatch(updateViewState({ show_accept_call_modal: false }));
    Cookies.remove("token");
    navigate("/login");
  }

  function acceptCall() {
    navigate("video-call");
    dispatch(updateViewState({ show_accept_call_modal: false }));
  }

  function declineCall() {
    dispatch(updateViewState({ show_accept_call_modal: false }));
  }

  return (
    <>
      <Dialog
        open={ViewManager.show_accept_call_modal}
        as="div"
        className="relative z-10"
        onClose={() => {}}
      >
        <div className="fixed inset-0 z-10 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] w-full max-w-lg rounded-2xl bg-modalBg p-6 text-center shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out data-[closed]:opacity-0"
            >
              {/* <div className="mx-auto my-4 grid h-16 w-16 place-content-center rounded-full bg-primary"> */}
              <img
                className="mx-auto my-4 h-14 w-14 rounded-full object-cover"
                src={
                  CallData.sender_profile_image
                    ? CallData.sender_profile_image
                    : "/CallIcons/accept_call.png"
                }
                alt=""
              />
              {/* </div> */}
              <DialogTitle as="h3" className="text-xl font-medium">
                <TextTranslate
                  text={`A Request from ${CallData.senderName} to accept a call `}
                />
              </DialogTitle>
              <p className="mt-2 text-sm opacity-70">
                <TextTranslate text="Accept the call to get started discussion" />
              </p>
              <div className="mt-10 flex gap-3">
                <button
                  onClick={acceptCall}
                  className={`relative h-11 w-full overflow-hidden rounded-lg bg-[#76CC76] px-4 py-2 text-base font-medium text-black outline-none lg:px-9 lg:text-lg`}
                >
                  <span className="">Accept</span>
                </button>
                <button
                  onClick={declineCall}
                  className={`relative h-11 w-full overflow-hidden rounded-lg bg-[#EA5F5F] px-4 py-2 text-base font-medium text-black outline-none lg:px-9 lg:text-lg`}
                >
                  <span className="">Reject</span>
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
