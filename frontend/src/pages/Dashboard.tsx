import { Info, Users, Save } from "lucide-react";
import { useHealthCheck } from "@/hooks/useHealth";
import { useUpdateAccount } from "@/hooks/useAccount";
import { FadeIn } from "@/components/ui/FadeIn";
import { toast } from "@/components/ui/Toaster";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

const accountFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function Dashboard() {
  const { data: healthData, isLoading: isHealthLoading, isError } = useHealthCheck();
  const { mutateAsync: saveAccount, isPending: isSaving } = useUpdateAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const isOnline = !isError && healthData;
  const status = isHealthLoading ? "Checking..." : (healthData?.message ? `Backend is online: ${healthData.message}` : "Backend offline or unreachable.");

  const onSubmit = async (data: AccountFormValues) => {
    toast.promise(saveAccount(data), {
      loading: "Saving account settings...",
      success: "Settings saved successfully!",
      error: "Failed to save settings.",
    });
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-20">
      <FadeIn duration="500">
        <h1 className="text-4xl font-display font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
          Manage your application and check system health.
        </p>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2">
        <FadeIn delay="150" duration="700">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>API Connection</CardTitle>
              <CardDescription>Real-time status of your backend services.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              {!status ? (
                <div className="flex items-center space-x-3 py-1">
                  <Spinner size="sm" />
                  <Skeleton className="h-4 w-50 max-w-full" />
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Alert variant={isOnline ? "success" : "destructive"}>
                    <Info className="h-4 w-4" />
                    <AlertTitle>{isOnline ? "Operational" : "Degraded"}</AlertTitle>
                    <AlertDescription>{status}</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay="300" duration="700">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Account Controls</CardTitle>
              <CardDescription>Update your notification settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                    Secondary Recovery Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="backup@example.com" 
                    error={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                     <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" type="button">Advanced...</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-106.25">
                      <DialogHeader>
                        <DialogTitle>Advanced Settings</DialogTitle>
                        <DialogDescription>
                          Make changes to your system profile here.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">System Name</Label>
                          <Input id="name" defaultValue="Production-01" />
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox id="downtime" defaultChecked />
                          <Label htmlFor="downtime">Email on downtime</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button">Configure</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button type="submit" isLoading={isSaving}>
                    {!isSaving && <Save className="h-4 w-4 mr-2" />}
                    Save Config
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay="500" duration="700">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Users who have signed up recently.</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState 
              icon={<Users />}
              title="No users found"
              description="Your database doesn't have any users registered yet. When users sign up, they will appear here."
              action={<Button variant="outline" size="sm">Invite Users</Button>}
            />
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
