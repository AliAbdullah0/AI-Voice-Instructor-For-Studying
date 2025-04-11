"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UpdateUserDialog from "./UpdateUser";

const UpdateUserModalButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='btn-secondary hover:border-green-[#62F6B5] hover:bg-transparent hover:backdrop-blur-md hover:text-[#62F6B5] hover:border hover:transition-all lg:px-5 justify-evenly items-center gap-2 lg:py-2 px-4 py-2 flex mt-2 w-[60%]'>
          Update
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="text-2xl font-semibold mb-6 text-[#62F6B5]">Update Profile</DialogTitle>
        <UpdateUserDialog />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModalButton;
