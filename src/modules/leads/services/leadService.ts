import { LeadData, LeadStatusUpdate } from "@/modules/leads/types/types";

import {
  leadListingResponse,
  leadDashboardResponse,
} from "../mockData/apiMock";

export const addLeadService = async (reqData: LeadData) => {
  try {
    console.log("addLeadService API call", reqData);

    // API MOCK
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;

    // const response = await axios.post("/leads", reqData);
    // return response.data;
  } catch (error: any) {
    console.error("Add lead error:", error);
    throw new Error(error?.response?.data?.message || "Failed to add lead");
  }
};

export const bulkInsertLeads = async (reqData: LeadData[]) => {
  try {
    console.log("bulkInsertLeads API call", reqData);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;

    // const response = await axios.post("/leads/bulk", { reqData });
    // return response.data;
  } catch (error: any) {
    console.error("Bulk insert error:", error);
    throw new Error(error?.response?.data?.message || "Failed to insert leads");
  }
};

export const getAllLeads = async (reqData: any) => {
  try {
    console.log("getAllLeads API call", reqData);

    // API MOCK
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return leadListingResponse;

    // const response = await axios.get(`/leads?${queryParams}`);
    // return response.data;
  } catch (error: any) {
    console.error("Get all leads error:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch leads");
  }
};

export const updateLeadStatus = async (reqData: LeadStatusUpdate) => {
  try {
    console.log("updateLeadStatus API call", reqData);

    // API MOCK
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;

    // const response = await axios.patch(`/leads/${reqData.id}/status`, {
    //   status: reqData.status,
    // });
    // return response.data;
  } catch (error: any) {
    console.error("Update lead status error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to update lead status"
    );
  }
};

export const addNoteToLead = async (reqData: any) => {
  try {
    console.log("addNoteToLead API call", reqData);

    // API MOCK
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;

    // const response = await axios.patch(`/leads/${reqData.id}/note`, {
    //   note: reqData.note,
    // });
    // return response.data;
  } catch (error: any) {
    console.error("Add note to lead error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to add note to lead"
    );
  }
};

export const getLeadById = async (reqData: any) => {
  try {
    console.log("getLeadById API call", reqData);

    // API MOCK
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;

    // const response = await axios.get(`/leads/${id}`);
    // return response.data;
  } catch (error: any) {
    console.error("Get lead by ID error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch lead profile"
    );
  }
};

export const getDashboardData = async () => {
  try {
    console.log("getDashboardData API call");

    // API MOCK
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

export const downloadLeadsReport = async (reqData: any) => {
  try {
    console.log("downloadLeadsReport API call", reqData);

    // API MOCK
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;

    // const response = await axios.get(`/leads/report?${queryString}`);
    // return response.data;
  } catch (error: any) {
    console.error("Download leads report error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to download leads report"
    );
  }
};
