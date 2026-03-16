import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {

const sql = neon(process.env.DATABASE_URL);

if (req.method === "POST") {

const {name,email,password,role} = req.body;

await sql`
INSERT INTO users (name,email,password,role)
VALUES (${name},${email},${password},${role})
`;

return res.status(200).json({message:"User created"});
}

}
