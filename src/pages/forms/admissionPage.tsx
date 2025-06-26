import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  BookOpen,
  Users,
  Phone,
  Home,
  FileText,
  CheckCircle,
} from "lucide-react";

// Form validation schema
const formSchema = z.object({
  personal: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dob: z.string().min(10, "Please enter a valid date"),
    gender: z.string().min(1, "Please select a gender"),
    nationality: z.string().min(2, "Please enter your nationality"),
  }),
  education: z.object({
    highSchool: z.string().min(2, "School name is required"),
    yearOfCompletion: z.string().min(4, "Year must be 4 digits"),
    percentage: z.string().min(1, "Percentage is required"),
    board: z.string().min(2, "Board name is required"),
  }),
  family: z.object({
    fatherName: z.string().min(2, "Father's name is required"),
    motherName: z.string().min(2, "Mother's name is required"),
    occupation: z.string().min(2, "Occupation is required"),
    annualIncome: z.string().min(1, "Annual income is required"),
  }),
  contact: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be 10 digits"),
    alternatePhone: z.string().optional(),
  }),
  address: z.object({
    current: z.string().min(5, "Address is required"),
    permanent: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().min(6, "Pincode must be 6 digits"),
  }),
  documents: z.object({
    photo: z.string().optional(),
    idProof: z.string().optional(),
    marksheet: z.string().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function AdmissionForm() {
  const [activeTab, setActiveTab] = React.useState("personal");
  const [showReview, setShowReview] = React.useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personal: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        nationality: "",
      },
      education: {
        highSchool: "",
        yearOfCompletion: "",
        percentage: "",
        board: "",
      },
      family: {
        fatherName: "",
        motherName: "",
        occupation: "",
        annualIncome: "",
      },
      contact: {
        email: "",
        phone: "",
        alternatePhone: "",
      },
      address: {
        current: "",
        permanent: "",
        city: "",
        state: "",
        pincode: "",
      },
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Submit logic here
  };

  const navigateToTab = async (tab: string) => {
    // Validate current tab before navigating
    if (activeTab === "personal") await trigger("personal");
    if (activeTab === "education") await trigger("education");
    if (activeTab === "family") await trigger("family");
    if (activeTab === "contact") await trigger("contact");
    if (activeTab === "address") await trigger("address");

    setActiveTab(tab);
  };

  if (showReview) {
    return (
      <ReviewPage
        formData={methods.getValues()}
        onEdit={() => setShowReview(false)}
        onSubmit={handleSubmit(onSubmit)}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Left Side Navigation */}
        <div className="w-full md:w-64 bg-gray-50 rounded-lg p-4">
          <Tabs value={activeTab} orientation="vertical" className="space-y-4">
            <TabsList className="flex flex-col items-start gap-2 bg-transparent">
              <TabsTrigger
                value="personal"
                onClick={() => navigateToTab("personal")}
                className="w-full justify-start gap-2"
              >
                <User className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="education"
                onClick={() => navigateToTab("education")}
                className="w-full justify-start gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="family"
                onClick={() => navigateToTab("family")}
                className="w-full justify-start gap-2"
              >
                <Users className="h-4 w-4" />
                Family Info
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                onClick={() => navigateToTab("contact")}
                className="w-full justify-start gap-2"
              >
                <Phone className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger
                value="address"
                onClick={() => navigateToTab("address")}
                className="w-full justify-start gap-2"
              >
                <Home className="h-4 w-4" />
                Address
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                onClick={() => navigateToTab("documents")}
                className="w-full justify-start gap-2"
              >
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Right Side Form Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <Tabs value={activeTab} className="w-full">
                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...methods.register("personal.firstName")}
                      />
                      {methods.formState.errors.personal?.firstName && (
                        <p className="text-sm text-red-500">
                          {methods.formState.errors.personal.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...methods.register("personal.lastName")}
                      />
                      {methods.formState.errors.personal?.lastName && (
                        <p className="text-sm text-red-500">
                          {methods.formState.errors.personal.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      type="date"
                      id="dob"
                      {...methods.register("personal.dob")}
                    />
                    {methods.formState.errors.personal?.dob && (
                      <p className="text-sm text-red-500">
                        {methods.formState.errors.personal.dob.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={(value) =>
                        methods.setValue("personal.gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {methods.formState.errors.personal?.gender && (
                      <p className="text-sm text-red-500">
                        {methods.formState.errors.personal.gender.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      {...methods.register("personal.nationality")}
                    />
                    {methods.formState.errors.personal?.nationality && (
                      <p className="text-sm text-red-500">
                        {methods.formState.errors.personal.nationality.message}
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Education Tab - Similar structure */}
                <TabsContent value="education" className="space-y-4">
                  {/* Education form fields */}
                </TabsContent>

                {/* Family Tab - Similar structure */}
                <TabsContent value="family" className="space-y-4">
                  {/* Family form fields */}
                </TabsContent>

                {/* Contact Tab - Similar structure */}
                <TabsContent value="contact" className="space-y-4">
                  {/* Contact form fields */}
                </TabsContent>

                {/* Address Tab - Similar structure */}
                <TabsContent value="address" className="space-y-4">
                  {/* Address form fields */}
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Upload
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <Label>Passport Size Photo</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        {...methods.register("documents.photo")}
                      />
                    </div>

                    <div>
                      <Label>ID Proof (Aadhar/Passport)</Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...methods.register("documents.idProof")}
                      />
                    </div>

                    <div>
                      <Label>Marksheet (10th/12th)</Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        {...methods.register("documents.marksheet")}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>

            <div className="flex justify-between">
              {activeTab !== "personal" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = [
                      "personal",
                      "education",
                      "family",
                      "contact",
                      "address",
                      "documents",
                    ];
                    const currentIndex = tabs.indexOf(activeTab);
                    navigateToTab(tabs[currentIndex - 1]);
                  }}
                >
                  Previous
                </Button>
              )}

              {activeTab !== "documents" ? (
                <Button
                  type="button"
                  onClick={() => {
                    const tabs = [
                      "personal",
                      "education",
                      "family",
                      "contact",
                      "address",
                      "documents",
                    ];
                    const currentIndex = tabs.indexOf(activeTab);
                    navigateToTab(tabs[currentIndex + 1]);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setShowReview(true)}
                  disabled={!isValid}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Review Application
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

// Review Page Component
function ReviewPage({
  formData,
  onEdit,
  onSubmit,
}: {
  formData: FormValues;
  onEdit: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Review Your Application</h1>
          <Button variant="outline" onClick={onEdit}>
            Edit Application
          </Button>
        </div>

        <Section title="Personal Information" data={formData.personal} />
        <Section title="Education Details" data={formData.education} />
        <Section title="Family Information" data={formData.family} />
        <Section title="Contact Details" data={formData.contact} />
        <Section title="Address Information" data={formData.address} />
        <Section title="Documents" data={formData.documents} />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onEdit}>
            Back to Edit
          </Button>
          <Button onClick={onSubmit}>Submit Application</Button>
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component for Review Page
function Section({
  title,
  data,
}: {
  title: string;
  data: Record<string, any>;
}) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <p className="text-sm text-gray-500 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
            <p className="font-medium">
              {value instanceof File ? value.name : value || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
