import type { ClothItem } from "../../api/cloth";
import './ClothCard.scss'
import { memo } from 'react'


interface ClothCardProps {
    item: ClothItem
    onItemClick: (item: ClothItem) => void
}


function ClothCard({ item, onItemClick }: ClothCardProps) {


    return (
        <div className="cloth-card" onClick={() => onItemClick(item)}>
            <div className="cloth-img">
                <img src={item.image_url}></img>
            </div>
            <div className="cloth-info">
                <div className="cloth-name">{item.name}</div>
                <div className="cloth-des">{item.summary}</div>
            </div>
        </div>
    )

}
export default memo(ClothCard)