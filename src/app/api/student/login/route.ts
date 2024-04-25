import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json()

    console.log(phone, password)

    const student = await prisma.student.findFirst({
      where: {
        phone: phone
      }
    })

    if (!student) {
      return Response.json({
        success: false,
        message: 'Student not found'
      })
    }

    if (student.password !== password) {
      return Response.json({
        success: false,
        message: 'Invalid password'
      })
    }

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

export async function GET(request: Request) {
  try {
    return Response.json({
      success: true
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    })
  }
}
