import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const faculties = await prisma.faculty.findMany({})

    return Response.json({
      success: true,
      data: faculties
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, uid, password } = await request.json()

    const faculty = await prisma.faculty.create({
      data: {
        name,
        email,
        phone,
        uid,
        password
      }
    })

    return Response.json({
      success: true,
      data: faculty
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    })
  }
}
