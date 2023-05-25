import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/typeorm-ex.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
   async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
      const { title, description } = createBoardDto;

      const board = this.create({
         title,
         description,
         status: BoardStatus.PUBLIC,
      });
      
      await this.save(board);
      return board;

   }
   async deleteBoard(id: number): Promise<void> {
      const result = await this.delete(id);
      if(result.affected === 0) {
         throw new NotFoundException(`게시판에서 ${id}를 찾을 수 없습니다.`);
      }
      console.log('result',result);
      
   }
}

