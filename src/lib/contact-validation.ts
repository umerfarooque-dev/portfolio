import { CONTACT_COPY, CONTACT_LIMITS, CONTACT_SERVICES } from "@/data/contact";
import { z } from "zod";

/** Shared by the form and API so the selected service cannot be silently dropped. */
export const contactSchema = z.object({
    name: z.string().trim().max(CONTACT_LIMITS.name, CONTACT_COPY.nameError).optional(),
    email: z.string().trim().email(CONTACT_COPY.emailError).max(CONTACT_LIMITS.email, CONTACT_COPY.emailError),
    service: z.string(CONTACT_COPY.serviceError).refine(value => CONTACT_SERVICES.some(service => service.value === value), CONTACT_COPY.serviceError),
    subject: z.string().trim().max(CONTACT_LIMITS.subject, CONTACT_COPY.subjectError).optional(),
    message: z.string().trim().min(1, CONTACT_COPY.messageError).max(CONTACT_LIMITS.message, CONTACT_COPY.messageLengthError),
});
