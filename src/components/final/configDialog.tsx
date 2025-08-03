import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardTabs from "../other/tabs";
import { ConfigActionFooter } from "./configActionFoooter";

export default function ConfigDialog(props: any) {
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
  } = props;

  const hasSingleTab = tabsDetails.length === 1;
  const SingleComponent = hasSingleTab ? tabsDetails[0].component : null;
  const singleTabProps = hasSingleTab ? tabsDetails[0].props : null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{actionButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-[700px] flex flex-col">
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
