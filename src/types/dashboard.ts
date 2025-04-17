/** ダッシュボードで表示する完了レッスン */
export interface LessonProgress {
  id: string;
  title: string;
}

/** ダッシュボードで表示するバッジ */
export interface Badge {
  id: string;
  name: string;
}

/** ダミーデータの型 */
export interface ProgressData {
  completedLessons: LessonProgress[];
  badges: Badge[];
}
