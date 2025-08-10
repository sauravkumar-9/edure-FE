import { Button } from "@/components/ui/button";
import { DialogFooter } from "../ui/dialog";

export default function DialogActionBar(props: any) {
  const {
    handleSaveDraft,
    handleActionConfimration,
    handleDiscard,
    confirmActionButtonLabel,
    isDraft = false,
    isSubmissionAllowed,
    showBorder = false,
  } = props;

  return (
    <DialogFooter
      className={`flex justify-between ${showBorder ? "border-t pt-4" : ""}`}
    >
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
    </DialogFooter>
  );
}
