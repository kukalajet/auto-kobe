import { IsNotEmpty } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  name: string;
}
