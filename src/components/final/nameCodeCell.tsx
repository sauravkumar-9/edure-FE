interface LeadNameWithCodeProps {
  fullName: string;
  code: string;
}

export function NameCodeCell({ fullName, code }: LeadNameWithCodeProps) {
  return (
    <p className="text-sm text-muted-foreground">
      {fullName} ({code})
    </p>
  );
}
