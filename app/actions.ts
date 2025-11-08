'use server';

import { supabaseServerClient } from "@/lib/supabase";

export type LeadFormPayload = {
  name: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  company: string;
  service: string;
};

const isValidPayload = (payload: LeadFormPayload) => {
  if (!payload.name?.trim()) return false;
  if (!payload.email?.trim()) return false;
  if (!payload.phoneNumber?.trim()) return false;
  if (!payload.phoneCountryCode?.trim()) return false;
  return true;
};

export async function submitLead(payload: LeadFormPayload) {
  if (!isValidPayload(payload)) {
    throw new Error("Invalid lead data. Please check the required fields.");
  }

  const supabase = supabaseServerClient();

  const { error } = await supabase.from("strategy_call_requests").insert({
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone_country_code: payload.phoneCountryCode.trim(),
    phone_number: payload.phoneNumber.trim(),
    company: payload.company.trim() || null,
    service_interest: payload.service.trim() || null,
  });

  if (error) {
    console.error("Error inserting lead", error);
    throw new Error("Unable to submit the form right now. Please try again later.");
  }

  return { success: true } as const;
}

