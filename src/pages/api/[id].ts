import { list } from "@vercel/blob"; 
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
     const { blobs } = await list();
     return NextResponse.json(blobs);

    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch the widget content.' });
    }
}
