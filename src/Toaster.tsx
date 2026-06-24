"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToaster() {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        className: "customToast",
        iconTheme: {
          primary: "#16130f",
          secondary: "#e9e1da",
        },
      }}
    />
  );
}
