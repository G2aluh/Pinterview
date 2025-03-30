'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK= 60 * 60 * 24 * 7; // 1 week in milliseconds
export async function signUp(params: SignUpParams){
    const {uid, name, email} = params;
    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return{
                succes: false,
                message: "Pengguna sudah ada"
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
        })

        return {
            succes: true,
            message: "Akun berhasil dibuat. Silahkan masuk",
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any){
        console.error('Error saat membuat pengguna', e);

        if(e.code === 'auth/email-already-exist'){
            return{
                succes: false,
                message: "Email ini sudah digunakan"
            }
        }
        return{
            succes: false,
            message: "Gagal membuat akun"
    }
}
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;

    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return{
                succes: false,
                message: "Pengguna tidak ditemukan. Buat akun"
            }
        }

        await setSessionCookie(idToken);
    }catch(e){
        console.log(e);

        return{
            succes: false,
            message: "Gagal masuk",
        }
    }

}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const setSessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,      

    })


    cookieStore.set('session', setSessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
         // 7 days
    })
}

export async function getCurrentUser(): Promise<User | null>{
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie){
        return null;
    }

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.
        collection('users')
        .doc(decodedClaims.uid)
        .get();

        if(!userRecord.exists)
            return null;
        
        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    }catch(e){
        console.log(e);
        return null;
    }
}


export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user; 
}

