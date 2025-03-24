import { RouterProvider } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import { router } from "./components/routing/AllRoutes";
import Toast from "./components/ui/Toast";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {/* Gloabl toast provider component */}
        <Toast />
        <RouterProvider router={router} />
      </I18nextProvider>
    </Provider>
  );
}

export default App;
