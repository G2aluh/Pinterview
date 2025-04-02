import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { generateText } from "ai"; // Adjust the path based on your project structure
import {google} from "@ai-sdk/google";
export async function GET() {
    return Response.json({succes: true, data: "selamat"}, {status: 200});
}

export async function POST(request: Request) {
        const {type, role, level, techstack, amount, userid} = await request.json();
        
        try{
            const {text: questions} = await generateText({
                model: google ('gemini-2.0-flash-001'),
                prompt: 
               `Siapkan pertanyaan untuk wawancara kerja.
Peran pekerjaan adalah ${role}.
Tingkat pengalaman kerja adalah ${level}.
Teknologi yang digunakan dalam pekerjaan adalah: ${techstack}.
Fokus antara pertanyaan perilaku dan teknis harus condong ke: ${type}.
Jumlah pertanyaan yang dibutuhkan adalah: ${amount}.
Harap kembalikan hanya pertanyaannya, tanpa teks tambahan.
Pertanyaan-pertanyaan ini akan dibacakan oleh asisten suara, jadi jangan gunakan karakter khusus seperti "/" atau "*" atau karakter lain yang dapat mengganggu asisten suara.
Kembalikan pertanyaan dalam format berikut:
["Pertanyaan 1", "Pertanyaan 2", "Pertanyaan 3"]

Terima kasih! <3
`,

            })

            const interview = {
                role, type, level,
                techstack: techstack.split(','),
                questions: JSON.parse(questions),
                userid: userid,
                finalized: true,
                coverImage: getRandomInterviewCover(),
                createdAt: new Date().toISOString()
            }

            await db.collection('interviews').add(interview);

            return Response.json({
                succes: true
            }, {status:200})
        } catch (error){
            console.error(error);
        }
}



