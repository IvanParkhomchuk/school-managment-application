import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @MinLength(4)
  @IsString()
  @Field()
  firstname: string;

  @MinLength(4)
  @IsString()
  @Field()
  lastname: string;
}
