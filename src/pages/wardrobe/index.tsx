
import { useCallback, useEffect, useState } from "react"
import { getClothList, getClothDetail, type ClothParams, type ClothItem } from "../../api/cloth"
import ClothCard from "../../components/clothCard"
import Header from './header'
import './wardrobe.scss'
export default function Wardrobe() {
    const [clothParams, setClothParams] = useState<ClothParams>({
        page: 1,
        size: 50,
        keyword: '',
        category: ''

    })
    const [total, setTotal] = useState<number>(0)
    const [list, setList] = useState<ClothItem[]>([])
    const [loading, setLoading] = useState(false)
    const getList = async () => {
        setLoading(true)
        try {
            const res = await getClothList(clothParams)
            setList(res.data.items)
            setTotal(res.data.total)
        } catch (err) {
            console.error('加载衣橱失败：', err)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        getList()

    }, [clothParams])
    const onClickCard = useCallback((item: ClothItem) => {
        console.log('点击衣物', item)
    }, [])



    return (
        <div className="wardrobe-page">
            <Header total={total}></Header>
            <div className="card-box">
                {list.map(item => (<ClothCard key={item.id} item={item} onItemClick={onClickCard} />))}
            </div>

        </div>
    )
}