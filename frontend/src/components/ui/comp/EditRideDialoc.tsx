import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditRideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ride: any;
  onSave: (updatedRide: any) => void;
}

export function EditRideDialog({ isOpen, onClose, ride, onSave }: EditRideDialogProps) {
  const [editedRide, setEditedRide] = React.useState(ride);

  const handleSave = () => {
    onSave(editedRide);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ride</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Ride Name</label>
            <Input
              value={editedRide.Ride_name}
              onChange={(e) => setEditedRide({ ...editedRide, Ride_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Start Location</label>
              <Input
                value={editedRide.start_location}
                onChange={(e) => setEditedRide({ ...editedRide, start_location: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">End Location</label>
              <Input
                value={editedRide.end_location}
                onChange={(e) => setEditedRide({ ...editedRide, end_location: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Start Time</label>
              <Input
                type="datetime-local"
                value={editedRide.start_time}
                onChange={(e) => setEditedRide({ ...editedRide, start_time: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">End Time</label>
              <Input
                type="datetime-local"
                value={editedRide.end_time}
                onChange={(e) => setEditedRide({ ...editedRide, end_time: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={editedRide.ride_discription}
              onChange={(e) => setEditedRide({ ...editedRide, ride_discription: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Available Seats</label>
              <Input
                type="number"
                value={editedRide.available_seats}
                onChange={(e) => setEditedRide({ ...editedRide, available_seats: parseInt(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Cost</label>
              <Input
                type="number"
                value={editedRide.cost}
                onChange={(e) => setEditedRide({ ...editedRide, cost: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}