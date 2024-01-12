import { Question } from "./question.model"

export interface Series {
    response_code: number
    results: Array<Question>
}