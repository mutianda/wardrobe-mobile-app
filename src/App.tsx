import { ConfigProvider } from 'antd-mobile'
import Router from './router'

function App() {
  return (
    <ConfigProvider
    >
      <Router />
    </ConfigProvider>
  )
}

export default App