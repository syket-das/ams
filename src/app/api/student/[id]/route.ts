import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }) {
  const { id } = params

  try {
    const students = await prisma.student.findUnique({
      where: {
        id
      },
      include: {
        Section: true
      }
    })

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
