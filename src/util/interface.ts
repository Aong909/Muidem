import { JSONContent } from "@tiptap/core"



export interface Ifunc {
    setTiptapContent:(json: JSONContent) => void
    setTiptapTitle:(tilte: string) => void
}

export type Itiptap = IOneContent[]

export interface IOneContent {
  id: string
  content: JSONContent
  title: string
  date: string
  like:number
  comments: IComment[] 
}

export interface IComment {
  user: string
  comment: string
  date: string
  like: number
}