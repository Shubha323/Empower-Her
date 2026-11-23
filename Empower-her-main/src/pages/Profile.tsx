import { useUser, useClerk } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings } from 'lucide-react';

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Demo user if no login
  const demoUser = {
    fullName: "Demo User",
    firstName: "Demo",
    lastName: "User",
    email: "demo@gmail.com",
    imageUrl: ""
  };

  const displayUser = user
    ? {
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
        imageUrl: user.imageUrl
      }
    : demoUser;

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={displayUser.imageUrl} />
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle>{displayUser.fullName}</CardTitle>
            <CardDescription>{displayUser.email}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Account Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">First Name</p>
                <p>{displayUser.firstName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Last Name</p>
                <p>{displayUser.lastName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{displayUser.email}</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>

            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;