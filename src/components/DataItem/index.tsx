import { Space } from "@mantine/core"
import { ThiccLine } from "../ThiccLine"
import "./index.css"

export interface DataItemProps {
    title: string,
    data: string,
    stars: number
}

export function DataItem({title, data, stars}: DataItemProps) {
    return (
        <div>
            <div className="dataItem">
                <h1 className="title">
                    {title}
                </h1>
                <span className="fa fa-star checked star"></span>
                <span className="fa fa-star checked star"></span>
                <span className="fa fa-star checked star"></span>
                <span className="fa fa-star unchecked star"></span>
                <span className="fa fa-star unchecked star"></span>
            
                <ThiccLine />
            </div>
            <Space h="xl" />
            <p> { data } </p>
        </div>
    )
}