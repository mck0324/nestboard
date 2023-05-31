import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { NotFoundException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./boards-status.enum";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { User } from "src/auth/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

   async getAllBoards(): Promise<Board[]> {
      const allBoards = await this.find();
      return allBoards;
   }

   async getUserBoards(user: User): Promise<Board[]> {
      const query = this.createQueryBuilder('board');
      query.where('board.userId = :userId', { userId: user.id });
      const boards = await query.getMany();
      return boards;
   }

   async getBoardById(id: number): Promise<Board> {
      const found = await this.findOne({where : { id }});
      if(!found) {
         throw new NotFoundException(`${id}의 게시물을 찾을 수 없습니다.`);
      }
      return found;
   }

   async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
      const { title, description } = createBoardDto;

      const board = this.create({
         title,
         description,
         status: BoardStatus.PUBLIC,
         user
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
   async deleteUserBoard(id: number, user: User): Promise<void> {
      const result = await this.delete({ id , user: { id: user.id }});
      if(result.affected === 0) {
         throw new NotFoundException(`${user.username}는 ${id}번 게시판을 지울 권한이 없습니다.`);
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

