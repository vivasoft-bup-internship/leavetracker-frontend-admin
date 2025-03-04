"use server";
import { apiBaseUrl } from '../Definition';
import { AllStats } from '../Definition';
import {
  Briefcase,
  ListTask,
  People,
  Bullseye
} from 'react-bootstrap-icons';


export async function getLeaveTypes() {
  const response = await fetch(`${apiBaseUrl}/allleavetypes`,
  {
    cache: 'no-cache',
  }
  );
  const leaveTypes = await response.json();
  return leaveTypes;
}

export async function getLeaveTypesById(id: string) {
  const response = await fetch(`${apiBaseUrl}/leavetype/${id}`,{
    cache: 'no-cache',
  });
  const leaveType = await response.json();
  return leaveType;
}

export async function getLeaveRequests() {
  try {
    const response = await fetch(`${apiBaseUrl}/allleaverequests`, {
      cache: 'no-cache',
    });
    const leaveRequests = await response.json();
    return leaveRequests;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch leave requests data.');
  }
}

export async function getLeaveRequest(id: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/leaverequest/${id}`,{
      cache: 'no-cache',
    });
    const leaveRequest = await response.json();
    return leaveRequest;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch leave request data.');
  }
}

export async function getAllStats() {
  try {
    const response = await fetch(`${apiBaseUrl}/allstats`,{
      cache: 'no-cache',
    });
    const stats = response.json();
    const statsData: AllStats = await stats;
    const allstats = [
      {
        id: 1,
        title: "Leave Requests",
        value: statsData.totalrequests,
        icon: <Briefcase size={18} />,
        statInfo: '<span className="text-dark me-2">This month</span>'
      },
      {
        id: 2,
        title: "Approved Leave",
        value: statsData.totalapproved,
        icon: <ListTask size={18} />,
        statInfo: '<span className="text-dark me-2">This month</span>'
      },
      {
        id: 3,
        title: "Rejected Leave",
        value: statsData.totalrejected,
        icon: <People size={18} />,
        statInfo: '<span className="text-dark me-2">This month</span>'
      },
      {
        id: 4,
        title: "Pending Leave",
        value: statsData.totalpending,
        icon: <Bullseye size={18} />,
        statInfo: '<span className="text-dark me-2">This Company</span>'
      }
    ];
    return allstats;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch employee data.');
  }
}


export async function getLRByEmployeeID(id: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/leaverequestsbyemployeeid/${id}`,{
      cache: 'no-cache',
    });
    const leaveRequests = await response.json();
    console.log(leaveRequests);
    return leaveRequests;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch leave requests data.');
  }
}

export async function getAllStatsByEmployeeID(id: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/allstatsbyemployeeid/${id}`,{
      cache: 'no-cache',
    });
    const stats = await response.json();
    const statsData: AllStats = await stats;
    const allstats = [
      {
        id: 1,
        title: "Leave Requests",
        value: statsData.totalrequests,
        icon: <Briefcase size={18} />,
        statInfo: '<span className="text-dark me-2">This month</span>'
      },
      {
        id: 2,
        title: "Approved Leave",
        value: statsData.totalapproved,
        icon: <ListTask size={18} />,
        statInfo: '<span className="text-dark me-2">This month</span>'
      },
      {
        id: 3,
        title: "Rejected Leave",
        value: statsData.totalrejected,
        icon: <People size={18} />,
        statInfo: '<span className="text-dark me-2">This month</span>'
      },
      {
        id: 4,
        title: "Pending Leave",
        value: statsData.totalpending,
        icon: <Bullseye size={18} />,
        statInfo: '<span className="text-dark me-2">This Company</span>'
      }
    ];
    return allstats;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch employee data.');
  }
}