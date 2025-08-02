import { Button } from "@/components/ui/button";

export function ConfigActionFooter(props: any) {
  const { handleSaveDraft, handleScheduleDrive, handleDiscard } = props;
  return (
    <div className="border-t pt-4 flex justify-between">
      <Button variant="outline" onClick={() => handleDiscard(false)}>
        Discard
      </Button>
      <div className="space-x-2">
        <Button variant="secondary" onClick={handleSaveDraft}>
          Save as Draft
        </Button>
        <Button onClick={handleScheduleDrive}>Schedule Placement</Button>
      </div>
    </div>
  );
}
