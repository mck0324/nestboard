import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { NotFoundException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards-status.enum";
import { CustomRepository } from "src/typeorm-ex.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

   async getAllBoards(): Promise<Board[]> {
      const allBoards = await this.find();
      return allBoards;
   }

   async getBoardById(id: number): Promise<Board> {
      const found = await this.findOne({where : { id }});
      if(!found) {
         throw new NotFoundException(`${id}의 게시물을 찾을 수 없습니다.`);
      }
      return found;
   }

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
   async updateBoardStatus(id:number, status:BoardStatus) : Promise<Board> {
      const board = await this.getBoardById(id);
      board.status = status;
      await this.save(board);

      return board;
   }

}

