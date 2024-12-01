import './FilterBoardItem.less'

export type Props ={
    title: string;
}
// The Items component is responsible for rendering a single todo item.
export function Items({title}:Props){
    return <div className="Item">
        <p>{title}</p>
    </div>
}