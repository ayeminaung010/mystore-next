import { query } from "@/app/db"; //calling db.ts -> ts is typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any){
    const sql = "SELECT * FROM Products ORDER BY Id DESC"; //standard SELECT statement
    const result = await query(sql,""); //query function come from db.ts 

    try{
        return NextResponse.json(result); //return next to json response 
    }catch(error){
        return NextResponse.json(error); //can see error with json response
    }
}

export async function POST(req: NextRequest){
    const data = await req.formData(); //get data from form data
    const sql = "INSERT INTO Products (Name, BuyPrice, SellPrice) VALUES (?, ?, ?)"; //standard INSERT statement
    
    const values = [
        data.get("name" || ""),
        data.get("buyPrice" || ""),
        data.get("sellPrice" || ""),
    ];

    try{
        await query(sql, values);
        return NextResponse.json({
            status: "success",
            message: "Successfully created",
        }); 
    }catch(error){
        console.log("Error.. :",error);
        return NextResponse.json({
            status: "error",
            message: "Error processing creation ",
            error,
        }); //can see error with json response
    }
}