// src/types/dashboard.ts

/** 完了したレッスン情報 */
export interface LessonProgress {
  /** レッスンID */
  id: string;
  /** レッスンタイトル */
  title: string;
  /** 完了日時（ISO 文字列など） */
  completedAt: string;
}

/** 次に控えているレッスン情報 */
export interface UpcomingLesson {
  /** レッスンID */
  id: string;
  /** レッスンタイトル */
  title: string;
}

/** 獲得バッジ情報 */
export interface Badge {
  /** バッジID */
  id: string;
  /** バッジ名 */
  name: string;
  /** バッジの説明（省略可） */
  description?: string;
}

/** ダッシュボードで使う全データ */
export interface ProgressData {
  /** ユーザーのメールアドレス */
  userEmail: string;
  /** 全レッスン数 */
  totalLessons: number;
  /** 完了したレッスン数 */
  completedCount: number;
  /** 完了率（0〜100 のパーセンテージ） */
  completionRate: number;
  /** 連続ログイン日数 */
  loginStreak: number;
  /** 総学習時間（分） */
  totalTimeSpentMinutes: number;
  /** まだ完了していない、次にやるレッスン一覧 */
  upcomingLessons: UpcomingLesson[];
  /** 完了レッスン一覧 */
  completedLessons: LessonProgress[];
  /** 獲得済みバッジ一覧 */
  badges: Badge[];
}
