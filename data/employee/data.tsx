"use server";
import { apiBaseUrl } from "../Definition";

export async function getEmployees() {
  try {
    const response = await fetch(`${apiBaseUrl}/allemployees`,{
      cache: 'no-cache',
    });
    const employees = await response.json();
    console.log(employees);
    return employees;
  } catch (error) {
    console.error('API Error:', error);
  }
}

export async function getEmployeeById(employeeid: string) {
  try {
    const response = await fetch(`${apiBaseUrl}/employee/${employeeid}`,{
      cache: 'no-cache',
    });
    const employee = response.json();
    return employee;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch employee data.');
  }
}

export async function getRoles() {
  try {
    const response = await fetch(`${apiBaseUrl}/allroles`,{
      cache: 'no-cache',
    });
    const roles = await response.json();
    return roles;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch roles data.');
  }
}

export async function getManagers() {
  try {
    const response = await fetch(`${apiBaseUrl}/allmanagers`,{
      cache: 'no-cache',
    });
    const managers = await response.json();
    return managers;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch managers data.');
  }
}