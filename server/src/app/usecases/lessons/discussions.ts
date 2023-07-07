import HttpStatusCodes from '../../../constants/HttpStatusCodes';
import AppError from '../../../utils/appError';
import { AddDiscussionInterface } from '../../../types/discussion';
import { DiscussionDbInterface } from '../../../app/repositories/discussionDbRepository';

export const addDiscussionU = async (
  userId:string|undefined,
  lessonId: string,
  discussion: AddDiscussionInterface,
  discussionDbRepository: ReturnType<DiscussionDbInterface>
) => {
  if (!discussion) {
    throw new AppError('Please provide data', HttpStatusCodes.BAD_REQUEST);
  }
  if(!userId){
    throw new AppError('user not found', HttpStatusCodes.BAD_REQUEST);
  }
  discussion.lessonId=lessonId
  discussion.userId=userId
  await discussionDbRepository.addDiscussion(discussion);
};
