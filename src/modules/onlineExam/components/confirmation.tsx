import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Camera,
  Wifi,
  Globe2,
  MonitorSmartphone,
} from "lucide-react";
import { format } from "date-fns";

export function ConfirmationPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [webcamAllowed, setWebcamAllowed] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<number | null>(null);
  const [browserInfo, setBrowserInfo] = useState({ name: "", version: "" });
  const [stream, setStream] = useState<MediaStream | null>(null);

  const examDetails = {
    date: new Date(),
    timeSlot: "2:00 PM - 3:00 PM",
    examId: "EXM-2023-00123",
    amountPaid: "₹500.00",
    email: "saurav.kumar@example.com",
  };

  // Browser info
  useEffect(() => {
    const ua = navigator.userAgent;
    let name = "Unknown",
      version = "Unknown";
    if (/Chrome/.test(ua) && !/Edge/.test(ua)) {
      name = "Chrome";
      version = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown";
    } else if (/Firefox/.test(ua)) {
      name = "Firefox";
      version = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown";
    } else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
      name = "Safari";
      version = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
    }
    setBrowserInfo({ name, version });
  }, []);

  // Webcam test
  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setWebcamAllowed(true);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      setWebcamAllowed(false);
    }
  };

  const stopWebcam = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setWebcamAllowed(false);
  };

  // Internet Speed Test (basic ping)
  const testConnectionSpeed = async () => {
    const start = Date.now();
    try {
      await fetch("https://www.google.com/images/phd/px.gif", {
        cache: "no-cache",
      });
      const ping = Date.now() - start;
      setConnectionSpeed(ping);
    } catch {
      setConnectionSpeed(null);
    }
  };

  const isAllOkay =
    webcamAllowed && connectionSpeed !== null && connectionSpeed < 200;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            Registration Confirmed!
          </h1>
          <p className="text-muted-foreground text-sm">
            Your exam slot has been successfully booked.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Exam Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div>
              <p>
                <span className="font-medium">Exam ID:</span>{" "}
                {examDetails.examId}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {format(examDetails.date, "PPP")}
              </p>
              <p>
                <span className="font-medium">Time Slot:</span>{" "}
                {examDetails.timeSlot}
              </p>
              <p>
                <span className="font-medium">Amount Paid:</span>{" "}
                {examDetails.amountPaid}
              </p>
            </div>

            <div className="pt-4 border-t space-y-2">
              <p>
                A confirmation email has been sent to{" "}
                <span className="font-medium text-indigo-600">
                  {examDetails.email}
                </span>
                .
              </p>
              <p>
                Your exam link will be shared via email and also shown on this
                portal.
              </p>
              <p>
                To know more, use the <strong>About the Exam</strong> and{" "}
                <strong>Contact Us</strong> options in the sidebar.
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="font-semibold text-green-600">
                ✅ Your registration is complete.
              </p>
              <p className="mt-1 text-gray-800 font-medium">
                Best of luck for your examination!
              </p>
            </div>

            {/* Browser Check Trigger */}
            <div className="pt-4 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-2" variant="outline">
                    Test Your Browser
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>System Compatibility Check</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <MonitorSmartphone className="text-blue-600" />
                      <span>
                        <strong>Browser:</strong> {browserInfo.name}{" "}
                        {browserInfo.version}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Wifi className="text-blue-600" />
                      <span>
                        <strong>Connection:</strong>{" "}
                        {connectionSpeed !== null
                          ? `${connectionSpeed} ms ping`
                          : "Testing..."}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Camera className="text-blue-600" />
                        <span>
                          <strong>Webcam:</strong>{" "}
                          {webcamAllowed ? "Accessible" : "Not Allowed"}
                        </span>
                      </div>
                      {webcamAllowed && (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="rounded border w-full max-h-40"
                        />
                      )}
                    </div>

                    <div className="text-center pt-3 font-medium">
                      {isAllOkay ? (
                        <span className="text-green-600">
                          ✅ Your system is ready for the exam.
                        </span>
                      ) : (
                        <span className="text-red-600">
                          ⚠️ One or more checks failed. Please fix the issues
                          above.
                        </span>
                      )}
                    </div>

                    <div className="text-right pt-4">
                      <Button variant="destructive" onClick={stopWebcam}>
                        Stop Test
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
