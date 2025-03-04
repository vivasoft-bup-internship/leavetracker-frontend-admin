'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { apiBaseUrl } from '../../data/Definition';

export async function createLeaveRequest(formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    const response = await fetch(`${apiBaseUrl}/createleaverequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });
    const data = await response.json();
    console.log(data.id);

    revalidatePath(`/leave-request/${data.id}/view`);
    redirect(`/leave-request/${data.id}/view`);
}

export async function updateLeaveRequest(id: string, formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    const response = await fetch(`${apiBaseUrl}/updateleaverequest/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });
    const data = await response.json();
    console.log(data);
    console.log(rawFormData);
    revalidatePath('/dashboard/leave-type');
    redirect('/dashboard/leave-type');
}

export async function approveLeaveRequest(id: string) {
    try {
        const response = await fetch(`${apiBaseUrl}/approveleaverequest/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });
        const data = await response.json();
        console.log(data);
        revalidatePath(`/leave-request/21/view`);
    } catch (error) {
        console.error('Error approving leave request:', error);
    }
}

export async function rejectLeaveRequest(id: string) {
    const response = await fetch(`${apiBaseUrl}/rejectleaverequest/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
    revalidatePath(`/leave-request/${id.toString()}/view`);
}

export async function deleteLeaveRequest(id: string) {
    const response = await fetch(`${apiBaseUrl}/deleteleaverequest/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
}

export async function createLeaveType(formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    console.log(rawFormData);
    const response = await fetch(`${apiBaseUrl}/createleavetype`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
}

export async function deleteLeaveType(id: string) {
    const response = await fetch(`${apiBaseUrl}/deleteleavetype/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
}