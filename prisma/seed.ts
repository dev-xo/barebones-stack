import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
	// Cleanup existing database.
	await prisma.welcome.deleteMany({})

	// Create seed.
	await prisma.welcome.create({
		data: {
			message: '😳 If you see this message, support us with a star on Github!',
		},
	})

	console.log(`Database has been successfully seeded. 🌱`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
