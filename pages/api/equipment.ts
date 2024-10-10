import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mockEquipments = [
    { id: 1, name: "Fan Powered VAV", price: "120.00" },
    { id: 2, name: "RTU", price: "300.00" },
    { id: 3, name: "RGD", price: "20.00" },
    { id: 4, name: "Dalt", price: "100.00" },
  ];

  res.status(200).json(mockEquipments);
}