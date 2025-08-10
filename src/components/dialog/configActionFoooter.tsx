import { Button } from "@/components/ui/button";

export function ConfigActionFooter(props: any) {
  const {
    handleSaveDraft,
    handleActionConfimration,
    handleDiscard,
    confirmActionButtonLabel,
    isDraft = false,
    isSubmissionAllowed,
  } = props;

  return (
    <div className="border-t pt-4 flex justify-between">
      <div>
        {isDraft && (
          <Button variant="secondary" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        <div className="space-x-2">
          <Button variant="outline" onClick={() => handleDiscard(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleActionConfimration}
            disabled={!isSubmissionAllowed}
          >
            {confirmActionButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
