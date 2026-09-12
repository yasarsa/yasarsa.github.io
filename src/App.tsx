import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {

  useEffect(() => {
    console.log("v1.1.0")
  }, [])

  return <RouterProvider router={router} />
}
