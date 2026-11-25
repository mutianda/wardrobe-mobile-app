import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthRoute, LoginRoute } from './auth'
import { Suspense, lazy } from 'react'
const Login = lazy(() => import('../pages/login'))
const Home = lazy(() => import('../pages/home'))
const Layout = lazy(() => import('../components/layout'))
const Wardrobe = lazy(() => import('../pages/wardrobe'))
const Mine = lazy(() => import('../pages/mine'))
const Loading = () => {
  return <div>页面加载中...</div>
}
const router = createBrowserRouter([
  {
    element: <LoginRoute />, // ✅ 改成函数！
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Login></Login>
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <AuthRoute />, // ✅ 改成函数！
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading></Loading>}>
            <Layout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading></Loading>}>
                <Home></Home>
              </Suspense>
            ),
          },
          {
            path: 'wardrobe',
            element: (
              <Suspense fallback={<Loading></Loading>}>
                <Wardrobe />
              </Suspense>
            ),
          },
          {
            path: 'mine',
            element: (
              <Suspense fallback={<Loading></Loading>}>
                <Mine />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
