// src/types/monaco-editor.d.ts
declare module "monaco-editor" {
  export namespace editor {
    /**
     * モデル変更イベント。
     * ここでは具体的なフィールドを定義せず、
     * 任意のキー・値ペアを許可する Record 型を使用します。
     */
    export type IModelContentChangedEvent = Record<string, unknown>;
  }
}
