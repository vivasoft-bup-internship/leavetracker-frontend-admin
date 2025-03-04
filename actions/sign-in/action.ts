// const handleSubmit = async (formData) => {
//     const rawFormData = new FormData(formData.currentTarget);
//     console.log(rawFormData);
//     console.log(username, password);
//     const res = await signIn('credentials', {
//         redirect: false,
//         username,
//         password
//     });
//     if (!res.error) {
//         window.location.href = '/settings';
//     }
// }

import { signIn } from "next-auth/react";

export async function login(formData: FormData) {
    const rawFormData = Object.fromEntries(formData);
    const res  = await signIn('credentials', {
        redirect: true,
        username: rawFormData.username,
        password: rawFormData.password
    });
    return null;
}