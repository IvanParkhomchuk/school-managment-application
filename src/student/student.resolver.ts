import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
