import { CreateReviewRequest } from '../../types/reviews/requests/createReviewRequest';
import { httpClientAuth } from '../@axios';

export async function createReview(
  request: CreateReviewRequest,
): Promise<string> {
  const response = await httpClientAuth.post(`/review/`, request);
  return response.data;
}
