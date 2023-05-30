import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository 
    ){}
    async deleteBoard(id: number): Promise<void> {
        return this.boardRepository.deleteBoard(id);
    }
    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise <Board> {
        return this.boardRepository.getBoardById(id);
    }
    async updateBoardStatus(id:number, status:BoardStatus) : Promise<Board> {
        return this.boardRepository.updateBoardStatus(id,status);
    }
    async getAllBoards() : Promise<Board[]> {
        return this.boardRepository.getAllBoards();
    }

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };

    //     this.boards.push(board);
    //     return board;
    // }
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if(!found) {
    //         throw new NotFoundException(`${id}의 게시물을 찾을 수 없습니다.`);
    //     }
    //     return found;
    // }


    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status:BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
