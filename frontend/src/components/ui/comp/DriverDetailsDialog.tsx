import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, User, CheckCircle, XCircle } from 'lucide-react';

interface DriverDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  driverDetails: {
    name: string;
    phone: string;
    email: string;
    status: string;
  } | null;
  isLoading: boolean;
}

export const DriverDetailsDialog: React.FC<DriverDetailsDialogProps> = ({
  isOpen,
  onClose,
  driverDetails,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
          <DialogDescription>
            Contact information and status of the ride driver
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
          </div>
        ) : driverDetails ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{driverDetails.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{driverDetails.phone}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{driverDetails.email}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {driverDetails.status === 'verified' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <Badge variant={driverDetails.status === 'verified' ? 'default' : 'destructive'}>
                {driverDetails.status.charAt(0).toUpperCase() + driverDetails.status.slice(1)}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No driver details available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}