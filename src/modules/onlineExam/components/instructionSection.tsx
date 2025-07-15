import {
  BadgeCheck,
  Camera,
  Chrome,
  Clock,
  Globe2,
  IdCard,
  Info,
} from "lucide-react";

export function InstructionSection() {
  return (
    <>
      {/* Instructions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <Clock className="text-blue-600 h-5 w-5 mt-0.5" />
            <span>Duration: 60 minutes</span>
          </li>
          <li className="flex items-start gap-3">
            <Info className="text-blue-600 h-5 w-5 mt-0.5" />
            <span>This exam consists of 50 multiple-choice questions</span>
          </li>
          <li className="flex items-start gap-3">
            <Globe2 className="text-blue-600 h-5 w-5 mt-0.5" />
            <span>Ensure a stable internet connection</span>
          </li>
          <li className="flex items-start gap-3">
            <BadgeCheck className="text-blue-600 h-5 w-5 mt-0.5" />
            <span>No external resources are allowed</span>
          </li>
        </ul>
      </section>

      {/* Requirements */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Camera className="text-blue-600 h-5 w-5" />
            <div>
              <h4 className="font-medium text-gray-900">Webcam & Microphone</h4>
              <p className="text-muted-foreground">Required for proctoring</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Chrome className="text-blue-600 h-5 w-5" />
            <div>
              <h4 className="font-medium text-gray-900">Chrome Browser</h4>
              <p className="text-muted-foreground">Version 90 or above</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Globe2 className="text-blue-600 h-5 w-5" />
            <div>
              <h4 className="font-medium text-gray-900">Internet Speed</h4>
              <p className="text-muted-foreground">Minimum 5 Mbps</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <IdCard className="text-blue-600 h-5 w-5" />
            <div>
              <h4 className="font-medium text-gray-900">Valid ID</h4>
              <p className="text-muted-foreground">For verification</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
