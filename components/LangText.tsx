import { langRuns } from "@/lib/markup";

/**
 * Plain text that mixes English and Japanese (a lesson title), with lang="ja" on each Japanese run. A leaf component:
 * InspectorLine can't use Rich, since Jp.tsx imports InspectorLine.
 */
export function LangText({ text }: { text: string }) {
  return langRuns(text).map((run, i) =>
    run.ja ? (
      <span key={i} lang="ja">
        {run.text}
      </span>
    ) : (
      run.text
    ),
  );
}
