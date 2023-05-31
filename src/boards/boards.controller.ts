import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
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
    @Get()
    getAllTask() : Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/user')
    getUserBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`${user.username}의 유저가 게시판을 불러오도록 요청`);
        return this.boardsService.getUserBoards(user);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User) : Promise<Board> {
        this.logger.verbose(`${user.username}의 유저가 게시글 작성 요청 Payload:${JSON.stringify(createBoardDto)}`);
        return this.boardsService.createBoard(createBoardDto,user);
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
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Delete('userboard/:id')
    deleteUserBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<void> {
        return this.boardsService.deleteUserBoard(id, user);
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
