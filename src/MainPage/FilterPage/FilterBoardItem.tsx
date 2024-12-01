import './FilterBoardItem.less'

export type Props ={
    title: string;
}

export function Items({title}:Props){
    return <div className="Item">
        <p>{title}</p>
    </div>
}