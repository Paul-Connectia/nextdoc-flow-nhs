import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DebugPanelProps {
  payload?: any;
  session?: any;
}

export function DebugPanel({ payload, session }: DebugPanelProps) {
  // Only render in development
  if (import.meta.env.PROD) return null;
  
  return (
    <Card className="border-purple-200 bg-purple-50 mt-6">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          🔍 Debug Info <Badge variant="outline" className="text-xs">Dev Only</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-3 font-mono">
        {payload && (
          <>
            <div>
              <Badge variant="outline" className="mr-2">PresetId</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">{payload.presetId}</code>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">QBank Version</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">{payload.qbankVersion}</code>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">Mix</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">{JSON.stringify(payload.mix)}</code>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">Focus Tags</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">{JSON.stringify(payload.focusAreas)}</code>
            </div>
          </>
        )}
        {session && (
          <>
            <div>
              <Badge variant="outline" className="mr-2">Session ID</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">{session.sessionId}</code>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">Questions Loaded</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">{session.questions.length} questions</code>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">Specialty Match</Badge>
              <code className="bg-purple-100 px-2 py-1 rounded">
                {session.questions.every((q: any) => q.specialty === session.config.specialty) ? '✅ All match' : '❌ Mismatch'}
              </code>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
