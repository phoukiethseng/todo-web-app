import { TodoCard } from "@/components/v2/TodoCard";

import { useMemo } from "react";

export default function TestPage() {
  const date = useMemo(() => new Date("2023-05-19T10:30:00"));
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <TodoCard
        title={"Go party with Jimmy at Jason home"}
        priority={1}
        completed
      />
      <TodoCard title={"Meet up with colleage"} priority={0} date={date} />
      <TodoCard title={"Meeting with executives"} priority={2} />
    </div>
  );
}
