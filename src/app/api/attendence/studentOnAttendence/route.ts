import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const attendence = await prisma.studentOnAttendence.findMany({
      include: {}
    })

    return Response.json({
      success: true,
      data: attendence
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    })
  }
}
