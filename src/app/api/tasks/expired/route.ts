import { TaskDocument, TaskModel } from "@/models/task";
import { connectDb } from "@/utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentDate = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  try {
    await connectDb();
    const expiredTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: false,
      //$ltはより小さい
      dueDate: { $lt: currentDate },
    });

    return NextResponse.json({
      message: "タスク取得成功",
      tasks: expiredTasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
};
//キャッシュを利用しないようにしている
export const dynamic = "force-dynamic";
