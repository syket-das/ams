import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { uid, password } = await request.json()

    const faculty = await prisma.faculty.findFirst({
      where: {
        uid: uid
      }
    })

    if (!faculty) {
      return Response.json({
        success: false,
        message: 'Faculty not found'
      })
    }

    const sectionOnCourseForFaculty = await prisma.sectionOnCourse.findMany({
      where: {
        course: {
          facultyId: faculty.id
        }
      },
      include: {
        section: true,
        course: {
          include: {
            Attendenence: {
              include: {
                students: true
              }
            }
          }
        }
      }
    })

    if (!faculty) {
      return Response.json({
        success: false,
        message: 'Faculty not found'
      })
    }

    if (faculty.password !== password) {
      return Response.json({
        success: false,
        message: 'Invalid password'
      })
    }

    return Response.json({
      success: true,
      data: {
        faculty,
        sectionOnCourseForFaculty
      }
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
