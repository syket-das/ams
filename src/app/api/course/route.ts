import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        faculty: true,
        Attendenence: true,
        SectionOnCourse: {
          include: {
            course: true,
            section: true
          }
        }
      }
    })

    return Response.json({
      success: true,
      data: courses
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
    const { name, code, credit, facultyId } = await request.json()

    const faculty = await prisma.course.create({
      data: {
        name,
        code,
        credit,
        facultyId
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
