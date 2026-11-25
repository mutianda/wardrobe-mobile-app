import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import './layout.scss'

const tabs = [
  {
    path: '/',
    label: 'Ai',
  },
  {
    path: '/wardrobe',
    label: '衣橱',
  },
  {
    path: '/mine',
    label: '我的',
  },
]

export default function HomeLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const onTabClick = item => {
    navigate(item.path)
  }
  return (
    <div className='home-warp'>
      <div className='home-content'>
        <Outlet></Outlet>
      </div>
      <div className='home-bar'>
        {tabs.map(item => (
          <div key={item.path}
            className={`tab-item ${item.path === location.pathname ? 'active-tab' : ''} `}

            onClick={() => onTabClick(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
