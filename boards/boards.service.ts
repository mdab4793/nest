import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  //id로특정게시물찾을때
  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  //삭제메소드
  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
  //업데이트(수정)메소드
  updateBoardStatus(id: string, status: BoardStatus): Board {
    //업데이트하고싶은 정보(board)
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
