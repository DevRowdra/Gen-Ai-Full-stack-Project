import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.cotext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
