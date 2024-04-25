import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const students = await prisma.student.findMany({})

    return Response.json({
      success: true,
      data: students
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
    const { name, email, phone, regNo, password } = await request.json()

    const student = await prisma.student.create({
      data: {
        name,
        email,
        phone,
        regNo,
        password
      }
    })

    return Response.json({
      success: true,
      data: student
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    })
  }
}
