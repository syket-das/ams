import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const sections = await prisma.section.findMany({
      include: {
        students: true,
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
      data: sections
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
    const { name, studentIds, courseId } = await request.json()

    const faculty = await prisma.section.create({
      data: {
        name,
        students: {
          connect: studentIds.map(id => ({ id }))
        },

        SectionOnCourse: {
          create: {
            course: {
              connect: {
                id: courseId
              }
            }
          }
        }
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
