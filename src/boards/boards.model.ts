export interface Board { 
    id: string;
    title: string;
    description: string;
    // status는 공개글 비공개글
    status: BoardStatus
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}