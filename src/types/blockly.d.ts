// declare module 'blockly' として最低限必要な型情報だけを定義
declare module "blockly" {
  namespace Blockly {
    /**
     * WorkspaceSvg に含まれる newGenerator を利用してコードを生成する想定
     */
    interface WorkspaceSvg {
      newGenerator: {
        workspaceToCode(): string;
      };
    }
  }
  // CommonJS 形式で export される想定
  const Blockly: typeof Blockly;
  export = Blockly;
}
