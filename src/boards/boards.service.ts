import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

}
