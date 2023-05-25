import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}


    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto) : Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }
    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) : Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoard(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardsService.updateBoardStatus(id,status);
    // }
}
