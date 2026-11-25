import { Button, Input, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'

export default function Home() {
  const navigate = useNavigate()
  const logout = useUserStore(state => state.logout)
  const [account, setAccount] = useState('')
  const [pwd, setPwd] = useState('')

  const handleLogin = () => {
    if (!account || !pwd) {
      Toast.show('请输入账号密码')
      return
    }
    const mockToken = 'mock-token-' + Date.now()
    logout()
    Toast.show('登录成功')
    navigate('/')
  }

  return (
    <div style={{ padding: '40px 30px' }}>
      <h2 style={{ marginBottom: '30px' }}>衣橱系统登录</h2>
      <Input
        placeholder="请输入账号"
        value={account}
        onChange={setAccount}
        style={{ marginBottom: '16px' }}
      />
      <Input
        placeholder="请输入密码"
        value={pwd}
        onChange={setPwd}
        type="password"
        style={{ marginBottom: '24px' }}
      />
      <Button
        block
        color="primary"
        onClick={handleLogin}
        style={{ backgroundColor: '#2c2824' }}
      >
        登录
      </Button>
    </div>
  )
}
