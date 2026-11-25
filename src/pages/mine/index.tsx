
import { useEffect, useState } from "react"
import { Button, Input } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../../store/userStore"
import { getMe } from '../../api/user'
import './mine.scss'

export default function Mine() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        city: '',
        likeStyle: '',
        dislikeStyle: '',
        dislikeColor: '',
    })

    const list = [
        { label: '昵称', key: 'nickname' },
        { label: '城市', key: 'city' },
        { label: '喜欢的风格', key: 'likeStyle' },
        { label: '不喜欢的风格', key: 'dislikeStyle' },
        { label: '不喜欢的颜色', key: 'dislikeColor' },
    ]



    const handleChange = (key, val) => {
        setUserInfo(pre => ({ ...pre, [key]: val }))
    }
    const save = () => {

    }
    const getUserInfo = async () => {
        const res = await getMe()
        const info = res.data
        setUserInfo({
            nickname: info.nickname,
            city: info.city,
            likeStyle: info.likeStyle,
            dislikeStyle: info.dislikeStyle,
            dislikeColor: info.dislikeColor,
        })
    }
    const logout = () => {
        // const logout = useUserStore.getState().logout
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="mine-page">
            <div className="form-warp">
                {list.map(item => (
                    <div className="form-item" key={item.key}>
                        <div className="item-label">{item.label}</div>
                        <div className="item-input">
                            <Input
                                value={userInfo[item.key]}
                                onChange={(val) => handleChange(item.key, val)}
                                placeholder="请输入称呼"
                            />
                        </div>

                    </div>
                ))}
            </div>
            <div className="btn-warp">
                <Button onClick={() => save()}>保存</Button>
                <Button onClick={() => logout()}>退出</Button>
            </div>
        </div>
    )
}