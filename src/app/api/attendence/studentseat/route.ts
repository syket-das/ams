import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const attendence = await prisma.studentSeat.findMany({
      include: {
        student: true,
        Attendenence: true
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
      attendenenceId,
      seatNo,
      studentId
    }: {
      attendenenceId: any
      seatNo: any
      studentId: any
    } = await request.json()

    const attendence = await prisma.studentSeat.create({
      data: {
        seatNo,
        attendenenceId,
        studentId
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
