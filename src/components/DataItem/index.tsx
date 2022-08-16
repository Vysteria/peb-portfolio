import { Space } from "@mantine/core"
import { ThiccLine } from "../ThiccLine"
import "./index.css"

export interface DataItemProps {
    title: string,
    data: string,
    stars: number
}

export function DataItem({title, data, stars}: DataItemProps) {

    const starSpans = []

    for (let i = 0; i < stars; i++) {
        starSpans.push(
            <span className="fa fa-star checked star"></span>
        )
    }

    return (
        <div>
            <div className="dataItem">
                <h1 className="title">
                    {title}
                </h1>
                
                { starSpans }
                <ThiccLine />
            </div>
            <Space h="xl" />
            <p> { data } </p>
        </div>
    )
}