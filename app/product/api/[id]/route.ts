import { query } from "@/app/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    {params} : {params: {id: string}} //folder name [id] -> Next already know id because of app router
) {
    const id = params.id;
    const sql = `
        DELETE FROM Products
        WHERE Id = ?
    `;

    try{
        const data = await query(sql, [id]);
        return NextResponse.json(data); 
    }catch(error){
        return NextResponse.json(error); //can see error with json response
    }
}
