import { Button } from "@/components/ui/button";
import { DialogFooter } from "../ui/dialog";

export default function DialogActionFooter(props: any) {
  const {
    handleSaveDraft,
    handleActionConfimration,
    handleDiscard,
    confirmButtonLabel = "Confirm",
    cancelButtonLabel = "Cancel",
    isDraft = false,
    showBorder = false,
    isLoading = false,
    disableConfirm = false,
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
            {cancelButtonLabel}
          </Button>
          <Button
            className="btn-primary"
            onClick={handleActionConfimration}
            disabled={isLoading || disableConfirm}
          >
            {isLoading ? "Processing..." : confirmButtonLabel}
          </Button>
        </div>
      </div>
    </DialogFooter>
  );
}
