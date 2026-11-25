import { Button, Input, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { User, Lock } from 'lucide-react'
import { loginApi, type LoginParams } from '../../api/user'
import './login.scss'
export default function Login() {
  const navigate = useNavigate()
  const login = useUserStore(state => state.login)
  const [account, setAccount] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    if (!account || !pwd) {
      Toast.show({
        content: '请输入账号密码',
        position: 'top',
      })
      return
    }
    setLoading(true)
    // 模拟请求延迟，让 loading 状态可见
    const params: LoginParams = {
      username: account,
      password: pwd
    }
    const res = await loginApi(params)
    setLoading(false)
    login(account, res.data.access_token,)
    Toast.show({ icon: 'success', content: '登录成功' })

    navigate('/', { replace: true })
  }

  return (
    <div className="login-page">
      {/* 顶部品牌区 */}
      <div className="login-header">
        <div className="login-logo">
          <span>👗</span>
        </div>
        <h1 className="login-title">衣橱系统</h1>
        <p className="login-subtitle">管理你的每一件衣物</p>
      </div>

      {/* 表单区 */}
      <div className="login-form">
        <div className="login-field">
          <User size={18} className="login-field-icon" />
          <Input
            placeholder="请输入账号"
            value={account}
            onChange={setAccount}
            clearable
          />
        </div>

        <div className="login-field">
          <Lock size={18} className="login-field-icon" />
          <Input
            placeholder="请输入密码"
            value={pwd}
            onChange={setPwd}
            type="password"
            clearable
            onEnterPress={handleLogin}
          />
        </div>

        <Button
          block
          color="primary"
          loading={loading}
          onClick={handleLogin}
          className="login-submit"
        >
          登 录
        </Button>

        <p className="login-tip">登录即表示同意《用户协议》与《隐私政策》</p>
      </div>

      {/* 底部装饰 */}
      <div className="login-footer">Wardrobe · 让穿搭更简单</div>
    </div>
  )
}