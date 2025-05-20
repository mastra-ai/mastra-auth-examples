import { RouterProvider } from "react-router-dom";
import routes from "@/router";

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <RouterProvider router={routes} />
    </div>
  );
}
