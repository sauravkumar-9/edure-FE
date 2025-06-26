import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Notification() {
  const [sendReminders, setSendReminders] = useState(true);
  const [notifyStudents, setNotifyStudents] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3 p-4 border rounded-lg">
        <Checkbox
          id="reminders"
          checked={sendReminders}
          onCheckedChange={(checked) => setSendReminders(!!checked)}
          className="mt-1"
        />
        <div className="space-y-1">
          <Label htmlFor="reminders" className="font-medium">
            Send reminders to students
          </Label>
          <p className="text-sm text-muted-foreground">
            Automatic reminders will be sent 3 days and 1 day before the drive
            date.
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 border rounded-lg">
        <Checkbox
          id="notifications"
          checked={notifyStudents}
          onCheckedChange={(checked) => setNotifyStudents(!!checked)}
          className="mt-1"
        />
        <div className="space-y-1">
          <Label htmlFor="notifications" className="font-medium">
            Notify eligible students
          </Label>
          <p className="text-sm text-muted-foreground">
            All eligible students will receive a notification when this drive is
            scheduled.
          </p>
        </div>
      </div>
    </div>
  );
}
