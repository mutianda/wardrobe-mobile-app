interface WardrobeHeaderProps {
    total: number
  }
  export default function WardrobeHeader({ total }: WardrobeHeaderProps) {
    return (
      <div className="page-header">
        <div className="header-label">CLOSET</div>
        <div className="header-row">
          <h1>我的衣橱</h1>
          <span className="total-text">{total} 件在架</span>
        </div>
      </div>
    )
  }