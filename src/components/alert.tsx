"use client";
import React, { use, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Alert() {
  const [alertOpen, setAlertOpen] = React.useState(false);

  useEffect(() => {
    setAlertOpen(true);
  }, []);

  return (
    <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            It’s transition week!
          </DialogTitle>
          <DialogDescription className="text-center">
            Years 6, 7 and 8 will be joining us this week, more details{" "}
            <Link className="underline font-semibold" href={"/starting-school"}>
              here
            </Link>
            <br />
            Year 10s and Year 12s are on Work Experience Year 9s are on a
            variety of themed events this week.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
