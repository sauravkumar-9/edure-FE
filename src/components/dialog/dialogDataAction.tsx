import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardTabs from "../other/tabs";
import { ConfigActionFooter } from "../final/configActionFoooter";

const dialogSizeMap: any = {
  LARGE: { height: 700, width: 900 },
  MEDIUM: { height: 500, width: 700 },
  SMALL: { height: 400, width: 500 },
  ALERT: { height: 300, width: 400 },
  DEFAULT: { height: 700, width: 900 },
};

export default function DialogDataAction(props: any) {
  const {
    isDialogOpen,
    setIsDialogOpen,
    tabsDetails,
    actionButtonLabel,
    dialogTitle,
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
      <DialogTrigger asChild>
        <Button variant="default">{actionButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[${dialogSize.width}px] h-[${dialogSize.height}px] flex flex-col`}
      >
        <DialogHeader className="pb-2">
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {hasSingleTab ? (
            <SingleComponent {...singleTabProps} />
          ) : (
            <DashboardTabs tabs={tabsDetails} />
          )}
        </div>

        <ConfigActionFooter
          handleSaveDraft={handleSaveDraft}
          handleActionConfimration={handleActionConfimration}
          handleDiscard={handleDiscard}
          confirmActionButtonLabel={actionButtonLabel}
          isDraft={isDraft}
          isSubmissionAllowed={isSubmissionAllowed}
        />
      </DialogContent>
    </Dialog>
  );
}
