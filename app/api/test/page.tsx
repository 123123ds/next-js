import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await connection.query('SELECT * FROM your_table'); // your_table을 실제 테이블명으로 변경
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database query failed' });
    }
  } else if (req.method === 'POST') {
    const { data } = req.body; // 클라이언트에서 보낸 데이터

    try {
      const result = await connection.query('INSERT INTO your_table (column_name) VALUES (?)', [data]); // column_name을 실제 컬럼명으로 변경
      console.log('Inserted row:', result); // 콘솔에 삽입된 행 출력
      res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database insert failed' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
