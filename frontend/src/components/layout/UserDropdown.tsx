import React, { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, Camera, ArrowLeft, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";

export function UserDropdown() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<"menu" | "edit">("menu");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize edit fields when user is loaded and view changes to edit
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user, view]);

  if (!isLoaded) {
    return (
      <div className="h-11 w-11 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!isSignedIn || !user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to sign out");
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.warning("Profile image must be less than 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      await user.setProfileImage({ file });
      toast.success("Profile picture updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      // Reset input value to allow uploading the same file again
      e.target.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!firstName.trim() || !lastName.trim()) {
      toast.warning("First name and last name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      toast.success("Account details updated successfully!");
      setView("menu");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => {
      if (!open) {
        // Reset view when dropdown closes
        setView("menu");
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted outline-none transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-primary/20 focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
          <img
            src={user.imageUrl}
            alt={user.fullName || "User profile"}
            className="h-full w-full rounded-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 border border-border bg-popover/98 backdrop-blur shadow-xl rounded-xl overflow-hidden focus:outline-none transition-all duration-300 animate-in fade-in-50 zoom-in-95"
      >
        {view === "menu" ? (
          <div className="flex flex-col">
            {/* Header: User Profile Summary */}
            <div className="flex flex-col items-center px-6 pt-6 pb-5 text-center bg-muted/20">
              <div className="relative group mb-3">
                <div className="h-16 w-16 rounded-full border-2 border-border shadow-md overflow-hidden bg-background">
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User profile"}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-foreground tracking-tight">
                {user.fullName || "User Account"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-full px-2">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            <DropdownMenuSeparator className="m-0" />

            {/* Menu Options */}
            <div className="p-1.5 space-y-0.5">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // Keep dropdown open to switch view
                  setView("edit");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-foreground hover:bg-secondary cursor-pointer transition-colors"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Manage account</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-destructive hover:bg-destructive/10 cursor-pointer transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </div>
          </div>
        ) : (
          /* View 2: Manage Account Details Form */
          <div className="flex flex-col px-6 py-5" onClick={(e) => e.stopPropagation()}>
            {/* Form Header */}
            <div className="flex items-center gap-2 mb-4 border-b border-border/40 pb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setView("menu");
                }}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Back to main menu"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h3 className="font-semibold text-sm text-foreground">
                Manage Account
              </h3>
            </div>

            {/* Edit Avatar */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative group cursor-pointer animate-in fade-in zoom-in-95 duration-200" onClick={handleImageClick}>
                <div className="h-16 w-16 rounded-full border-2 border-border shadow-md overflow-hidden bg-black/5">
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User profile"}
                    className={cn(
                      "h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-75",
                      isUploading && "opacity-40 animate-pulse"
                    )}
                  />
                </div>
                {/* Upload Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  ) : (
                    <Camera className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                disabled={isUploading || isSaving}
              />
              <button
                type="button"
                onClick={handleImageClick}
                className="text-[11px] font-medium text-primary hover:underline mt-3 cursor-pointer"
                disabled={isUploading || isSaving}
              >
                {isUploading ? "Uploading..." : "Change photo"}
              </button>
            </div>

            {/* Edit Fields Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Input
                  label="First Name"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isSaving || isUploading}
                  placeholder="First name"
                  className="text-sm"
                  required
                />
              </div>

              <div>
                <Input
                  label="Last Name"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isSaving || isUploading}
                  placeholder="Last name"
                  className="text-sm"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setView("menu");
                  }}
                  className="flex-1 text-xs h-10 border border-zinc-300 dark:border-zinc-700 hover:bg-muted text-foreground cursor-pointer"
                  disabled={isSaving || isUploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="flex-1 text-xs h-10 bg-primary text-primary-foreground hover:bg-primary/95 cursor-pointer"
                  isLoading={isSaving}
                  disabled={isUploading}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
