import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from '../student/student.service';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonsService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => [LessonType])
  getLessons(): Promise<Lesson[]> {
    return this.lessonsService.getLessons();
  }

  @Query((returns) => LessonType)
  lesson() {
    return {
      id: '1fqwer234',
      name: 'Physics class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonsService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    return this.lessonsService.assignStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
