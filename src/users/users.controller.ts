import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get('/:id')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.getUserById(id, user);
  }
}
