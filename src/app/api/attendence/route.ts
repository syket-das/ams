import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const attendence = await prisma.attendenence.findMany({
      include: {
        course: true,
        section: true
      }
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

export async function POST(request: Request) {
  try {
    const {
      courseId,
      sectionId
    }: {
      courseId: any
      sectionId: any
    } = await request.json()

    const attendence = await prisma.attendenence.create({
      data: {
        courseId,
        sectionId,
        date: new Date()
      }
    })

    return Response.json({
      success: true,
      data: attendence
    })
  } catch (error) {
    console.log(error)

    return Response.json({
      success: false,
      message: error.message
    })
  }
}
