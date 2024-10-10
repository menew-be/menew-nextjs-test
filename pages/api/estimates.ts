import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mock data for estimates
  const mockEstimates = [
    {
      id: 1,
      note: "Estimate for Project A",
      created_by: { id: 1, username: "john_doe" },
      archive: false,
      equipments: [
        { id: 1, name: "Fan Powered VAV", price: "120.00", quantity: 2 },
        { id: 2, name: "RTU", price: "300.00", quantity: 1 },
      ],
    },
    {
      id: 2,
      note: "Estimate for Project B",
      created_by: { id: 2, username: "jane_smith" },
      archive: true,
      equipments: [
        { id: 3, name: "RGD", price: "20.00", quantity: 5 },
      ],
    },
  ];

  if (req.method === "GET") {
    // Return the list of mock estimates
    res.status(200).json(mockEstimates);
  } else if (req.method === "POST") {
    // Handle adding a new estimate with equipments
    const newEstimate = {
      id: mockEstimates.length + 1, // Incrementing ID for the new estimate
      note: req.body.note || "New Estimate",
      created_by: { id: req.body.created_by || 1, username: "mock_user" }, // Mocking user
      archive: false,
      equipments: req.body.equipments || [], // Expecting list of equipments in request body
    };

    // Simulate adding the estimate
    mockEstimates.push(newEstimate);
    res.status(201).json(newEstimate);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
