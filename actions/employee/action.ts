'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { apiBaseUrl } from '../../data/Definition';
import { writeFile } from "fs/promises";
import path from "path";
import { buffer } from 'stream/consumers';

export async function createEmployee(formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    console.log(rawFormData);
    const response = await fetch(`${apiBaseUrl}/createemployee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
    });
    const data = await response.json();
    console.log(data.id);
    revalidatePath(`/leave-request`);
    redirect(`/leave-request`);
}

export async function updateProfilePicture(filepath: string, id : string) {
    const formData = new FormData();
    formData.append("profilephoto", filepath);
    const rawFormData = Object.fromEntries(formData);
    const response = await fetch(`${apiBaseUrl}/updateprofilephoto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
}

export async function savePhoto(id: string, formData: FormData) {
    console.log(formData);
    const file = formData.get("profilePhoto");
    const buffer = Buffer.from(await (file as File).arrayBuffer());
    const filename = (file as File).name.replaceAll(" ", "_");
    const filepath = path.join("/images/avatar/", filename);
    console.log(filepath); // filepath
    try {
        await writeFile(
            filepath, buffer
        )
    }
    catch (error) {
        console.log("Error occured ", error);
    }
    updateProfilePicture(filepath, id);
}

export async function updateEmployee(id: string, formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    console.log(rawFormData);
    const response = await fetch(`${apiBaseUrl}/updateemployee/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rawFormData),
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
}

export async function createRole(formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    const response = await fetch(`${apiBaseUrl}/createrole`, {
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

export async function deleteRole(id: string) {
    const response = await fetch(`${apiBaseUrl}/deleterole/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
    });
    const data = await response.json();
    console.log(data);
}