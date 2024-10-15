import { Types } from "mongoose"

export const workAllPipeline = ({
  characterId
}: {
  characterId: Types.ObjectId
}) => [
  {
    $match: {
      characterId: characterId // หรือตรงกับ field characterId ของ work
    }
  },
  {
    $lookup: {
      from: "tasks", // ชื่อ collection ที่มี task
      localField: "_id", // field ใน work ที่เราต้องการใช้เชื่อมกับ task (work._id)
      foreignField: "workId", // field ใน task ที่เชื่อมกับ work (task.workId)
      as: "tasks" // ชื่อ field ที่จะสร้างเพื่อเก็บ task ที่ดึงมา
    }
  },
  {
    $project: {
      name: 1,
      description: 1,
      tasks: 1 // เลือกให้แสดง work พร้อมกับ tasks ที่ดึงมา
    }
  }
]
