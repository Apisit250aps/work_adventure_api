"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workAllPipeline = void 0;
const workAllPipeline = ({ characterId }) => [
    {
        $match: {
            characterId: characterId // หรือตรงกับ field characterId ของ work
        }
    },
    {
        $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "workId",
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
];
exports.workAllPipeline = workAllPipeline;
//# sourceMappingURL=work.pipeline.js.map