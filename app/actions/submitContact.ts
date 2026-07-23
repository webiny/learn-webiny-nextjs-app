"use server";

import { sdk } from "@/lib/webiny";
import type { ContactSubmission } from "@/lib/types";

export async function submitContactForm(formData: ContactSubmission) {
    try {
        const response = await sdk.cms.createEntry<ContactSubmission>({
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

        return {
            success: true,
            data: response
        };
    } catch (error) {
        console.error("Failed to submit contact form:", error);

        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to submit contact form. Please try again."
        };
    }
}
