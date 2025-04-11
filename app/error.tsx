"use client"

import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-primary">
      <h1 className="text-4xl font-bold mb-4">OOPS! An error occurred!</h1>
      <p className="text-lg mb-8">Please Try Again.</p>
      <Link href={'/'} className="btn-primary">
        Go Back
      </Link>
    </div>
  );
}
