import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MonitorSmartphone, Wifi, Camera } from "lucide-react";

function getBrowserInfo() {
  const ua = navigator.userAgent;
  const match =
    ua.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  const browser = match[1];
  const version = match[2];

  return {
    name: browser === "Trident" ? "IE" : browser,
    version,
  };
}

export function SystemCheckDialog() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [webcamAllowed, setWebcamAllowed] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<number | null>(null);
  const [browserInfo] = useState(getBrowserInfo());
  const [isAllOkay, setIsAllOkay] = useState(false);

  useEffect(() => {
    testConnectionSpeed();
    startWebcam();
    return () => {
      stopWebcam();
    };
  }, []);

  useEffect(() => {
    const ok =
      browserInfo.name?.toLowerCase() === "chrome" &&
      parseInt(browserInfo.version) >= 90 &&
      webcamAllowed &&
      connectionSpeed !== null &&
      connectionSpeed < 150;
    setIsAllOkay(ok);
  }, [browserInfo, webcamAllowed, connectionSpeed]);

  const testConnectionSpeed = () => {
    const startTime = Date.now();
    fetch("https://www.google.com/images/phd/px.gif")
      .then(() => {
        const latency = Date.now() - startTime;
        setConnectionSpeed(latency);
      })
      .catch(() => {
        setConnectionSpeed(null);
      });
  };

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setWebcamAllowed(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        setWebcamAllowed(false);
      });
  };

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
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
                  ⚠️ One or more checks failed. Please fix the issues above.
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
  );
}
