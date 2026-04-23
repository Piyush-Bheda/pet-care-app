const Service = require("../models/Service");

const DEFAULT_SERVICES = [
  {
    name: "Grooming",
    price: 500,
    description: "Basic grooming session for your pet."
  },
  {
    name: "Vet Consultation",
    price: 800,
    description: "General health check and consultation."
  },
  {
    name: "Training",
    price: 700,
    description: "Obedience and behavior training session."
  }
];

async function seedServicesIfEmpty() {
  const count = await Service.countDocuments();
  if (count > 0) return;
  await Service.insertMany(DEFAULT_SERVICES);
  console.log(`Seeded ${DEFAULT_SERVICES.length} services`);
}

module.exports = { seedServicesIfEmpty };

