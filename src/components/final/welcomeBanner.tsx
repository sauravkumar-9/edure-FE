import { ReactNode } from "react";

interface WelcomeBannerProps {
  welcomeMessage: string;
  subMessage: string;
  imageUrl?: string;
  imageAlt?: string;
  actionElement?: ReactNode;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  className?: string;
  imageCustomClass?: string;
}

export function WelcomeBanner({
  welcomeMessage,
  subMessage,
  imageUrl,
  imageAlt = "Welcome Illustration",
  actionElement,
  className = "",
  imageCustomClass,
}: WelcomeBannerProps) {
  return (
    <div
      className={`rounded-xl px-2  flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${className}`}
    >
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {welcomeMessage.split(" ")[0]}
          </span>{" "}
          {welcomeMessage.split(" ").slice(1).join(" ")}
        </h2>
        <p className="text-gray-600 max-w-2xl">
          {subMessage.replace(
            /(important|urgent|new)/gi,
            (match) =>
              `<span class="font-semibold text-indigo-600">${match}</span>`
          )}
        </p>

        {actionElement ? actionElement : null}
      </div>

      <img
        src={imageUrl}
        alt={imageAlt}
        className={` h-auto object-contain order-first md:order-last ${imageCustomClass}`}
      />
    </div>
  );
}
