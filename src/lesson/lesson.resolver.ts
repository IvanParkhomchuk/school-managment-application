import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { Lesson } from './lesson.entity';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonsService: LessonService) {}

  @Query((returns) => [LessonType])
  allLessons(): Promise<Lesson[]> {
    return this.lessonsService.allLessons();
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

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonsService.createLesson(createLessonInput);
  }
}
