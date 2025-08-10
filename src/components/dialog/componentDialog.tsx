import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TabLayout from "../comman/tabs";
import DialogActionFooter from "./dialogActionFooter";

const dialogSizeMap: any = {
  LARGE: { height: 700, width: 900 },
  MEDIUM: { height: 500, width: 700 },
  SMALL: { height: 300, width: 300 },
  ALERT: { height: 300, width: 400 },
  DEFAULT: { height: 700, width: 900 },
};

export default function ComponentDialog(props: any) {
  const {
    isDialogOpen,
    setIsDialogOpen,
    tabsDetails,
    actionButtonLabel,
    dialogTitle,
    dialogDescription,
    handleSaveDraft,
    handleActionConfimration,
    handleDiscard,
    isDraft,
    isSubmissionAllowed,
    dialogType = "DEFAULT",
  } = props;

  const hasSingleTab = tabsDetails.length === 1;
  const SingleComponent = hasSingleTab ? tabsDetails[0].component : null;
  const singleTabProps = hasSingleTab ? tabsDetails[0].props : null;

  const dialogSize = dialogSizeMap[dialogType];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        // if hasSingleTab then dont fix the size
        className={`${
          hasSingleTab
            ? ""
            : `sm:max-w-[${dialogSize.width}px] h-[${dialogSize.height}px] flex flex-col`
        }`}
      >
        <DialogHeader className="pb-2">
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <p className="text-sm text-muted-foreground">{dialogDescription}</p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {hasSingleTab ? (
            <SingleComponent {...singleTabProps} />
          ) : (
            <TabLayout tabs={tabsDetails} />
          )}
        </div>

        <DialogActionFooter
          handleSaveDraft={handleSaveDraft}
          handleActionConfimration={handleActionConfimration}
          handleDiscard={handleDiscard}
          confirmButtonLabel={actionButtonLabel}
          isDraft={isDraft}
          showBorder={!hasSingleTab}
          isSubmissionAllowed={isSubmissionAllowed}
        />
      </DialogContent>
    </Dialog>
  );
}
