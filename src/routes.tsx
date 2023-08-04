import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Detail } from "./components/pages/Detail";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/pages/NotFound";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [{
            path: "/",
            element: <Home />
        },
        {
            path: "/detail/:cripto",
            element: <Detail />
        },
        {
            path: "*",
            element: <NotFound />
        }
        ]
    }
])

export { router }