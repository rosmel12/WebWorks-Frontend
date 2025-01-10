export interface CommentProfileSummary {
  id: number;
  score: number;
  comment: string;
  commentDate: Date;
  commentAuthor: string;
  id_user_comment: number;
  id_system_score: number;
}
