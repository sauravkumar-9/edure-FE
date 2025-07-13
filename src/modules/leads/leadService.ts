import axios from "@/lib/axios";
import { LeadData, LeadStatusUpdate } from "@/modules/leads/types";

import { leadListingResponse, leadDashboardResponse } from "./mockData/apiMock";

export const addLeadService = async (data: LeadData) => {
  try {
    console.log("data", data);
    return;
    const response = await axios.post("/leads", data);
    return response.data;
  } catch (error: any) {
    console.error("Add lead error:", error);
    throw new Error(error?.response?.data?.message || "Failed to add lead");
  }
};

export const bulkInsertLeads = async (leads: LeadData[]) => {
  try {
    const response = await axios.post("/leads/bulk", { leads });
    return response.data;
  } catch (error: any) {
    console.error("Bulk insert error:", error);
    throw new Error(error?.response?.data?.message || "Failed to insert leads");
  }
};

export const getAllLeads = async (payload: any) => {
  try {
    const { queryParams } = payload;
    console.log("queryParams", queryParams);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return leadListingResponse;
    // const response = await axios.get(`/leads?${queryParams}`);
    // return response.data;
  } catch (error: any) {
    console.error("Get all leads error:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch leads");
  }
};

export const updateLeadStatus = async ({ id, status }: LeadStatusUpdate) => {
  try {
    const response = await axios.patch(`/leads/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    console.error("Update lead status error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to update lead status"
    );
  }
};

export const getLeadById = async (id: string) => {
  try {
    const response = await axios.get(`/leads/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Get lead by ID error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch lead profile"
    );
  }
};

export const getDashboardData = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return leadDashboardResponse;

    // const response = await axios.get(`/leads/dashboard`);
    // return response.data;
  } catch (error: any) {
    console.error("Get dashboard data error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};
