"use server";

import { sdk } from "@/lib/webiny";
import type { ContactSubmission } from "@/lib/types";

export async function submitContactForm(formData: ContactSubmission) {
  const result = await sdk.cms.createEntry<ContactSubmission>({
    modelId: "contactSubmission",
    fields: ["id"],
    data: {
      values: {
        name: formData.name,
        email: formData.email,
        message: formData.message
      }
    }
  });

  if (result.isOk()) {
    return {
      success: true,
      data: result.value
    };
  }

  console.error("Failed to submit contact form:", result.error);

  return {
    success: false,
    error: result.error.message
  };
}
