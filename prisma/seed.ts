import { Weighing } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface MockWeighing extends Omit<Weighing, "createdAt" | "date" | "id"> {
  createdAt: string;
  date: string;
}

const MockWeighing: MockWeighing[] = [
  {
    createdAt: "2024-01-15T10:00:00.000Z",
    date: "2024-01-15T10:00:00.000Z",
    weight: 70,
    notes: "Morning weigh-in before breakfast.",
  },
  {
    createdAt: "2024-01-16T09:30:00.000Z",
    date: "2024-01-16T09:30:00.000Z",
    weight: 70,
    notes: null,
  },
  {
    createdAt: "2024-01-17T08:45:00.000Z",
    date: "2024-01-17T08:45:00.000Z",
    weight: 70,
    notes: "Felt a bit bloated.",
  },
  {
    createdAt: "2024-01-18T11:00:00.000Z",
    date: "2024-01-18T11:00:00.000Z",
    weight: 69,
    notes: "Good progress!",
  },
  {
    createdAt: "2024-01-19T09:00:00.000Z",
    date: "2024-01-19T09:00:00.000Z",
    weight: 69,
    notes: null,
  },
  {
    createdAt: "2024-01-20T09:15:00.000Z",
    date: "2024-01-20T09:15:00.000Z",
    weight: 69,
    notes: "After a workout.",
  },
  {
    createdAt: "2024-01-21T10:30:00.000Z",
    date: "2024-01-21T10:30:00.000Z",
    weight: 69,
    notes: null,
  },
  {
    createdAt: "2024-01-22T08:00:00.000Z",
    date: "2024-01-22T08:00:00.000Z",
    weight: 68,
    notes: "Hitting new lows!",
  },
  {
    createdAt: "2024-01-23T09:45:00.000Z",
    date: "2024-01-23T09:45:00.000Z",
    weight: 68,
    notes: null,
  },
  {
    createdAt: "2024-01-24T10:10:00.000Z",
    date: "2024-01-24T10:10:00.000Z",
    weight: 68,
    notes: "Consistent weight.",
  },
  {
    createdAt: "2024-01-25T09:00:00.000Z",
    date: "2024-01-25T09:00:00.000Z",
    weight: 68,
    notes: null,
  },
  {
    createdAt: "2024-01-26T09:20:00.000Z",
    date: "2024-01-26T09:20:00.000Z",
    weight: 67,
    notes: "Excited about this trend!",
  },
  {
    createdAt: "2024-01-27T08:30:00.000Z",
    date: "2024-01-27T08:30:00.000Z",
    weight: 67,
    notes: null,
  },
  {
    createdAt: "2024-01-28T10:00:00.000Z",
    date: "2024-01-28T10:00:00.000Z",
    weight: 67,
    notes: "After weekend indulgences, still holding steady.",
  },
  {
    createdAt: "2024-01-29T09:50:00.000Z",
    date: "2024-01-29T09:50:00.000Z",
    weight: 67,
    notes: null,
  },
  {
    createdAt: "2024-01-30T11:15:00.000Z",
    date: "2024-01-30T11:15:00.000Z",
    weight: 66,
    notes: "Feeling lighter.",
  },
  {
    createdAt: "2024-01-31T09:00:00.000Z",
    date: "2024-01-31T09:00:00.000Z",
    weight: 66,
    notes: null,
  },
  {
    createdAt: "2024-02-01T08:55:00.000Z",
    date: "2024-02-01T08:55:00.000Z",
    weight: 66,
    notes: "First day of the month, on track.",
  },
  {
    createdAt: "2024-02-02T10:20:00.000Z",
    date: "2024-02-02T10:20:00.000Z",
    weight: 66,
    notes: null,
  },
  {
    createdAt: "2024-02-03T09:30:00.000Z",
    date: "2024-02-03T09:30:00.000Z",
    weight: 65,
    notes: "Breakthrough!",
  },
  {
    createdAt: "2024-02-04T08:15:00.000Z",
    date: "2024-02-04T08:15:00.000Z",
    weight: 65,
    notes: null,
  },
  {
    createdAt: "2024-02-05T09:40:00.000Z",
    date: "2024-02-05T09:40:00.000Z",
    weight: 65,
    notes: "Maintaining well.",
  },
  {
    createdAt: "2024-02-06T10:00:00.000Z",
    date: "2024-02-06T10:00:00.000Z",
    weight: 65,
    notes: null,
  },
  {
    createdAt: "2024-02-07T08:45:00.000Z",
    date: "2024-02-07T08:45:00.000Z",
    weight: 64,
    notes: "Almost at my goal!",
  },
  {
    createdAt: "2024-02-08T09:05:00.000Z",
    date: "2024-02-08T09:05:00.000Z",
    weight: 64,
    notes: null,
  },
  {
    createdAt: "2024-02-09T10:15:00.000Z",
    date: "2024-02-09T10:15:00.000Z",
    weight: 64,
    notes: "Feeling great!",
  },
  {
    createdAt: "2024-02-10T09:00:00.000Z",
    date: "2024-02-10T09:00:00.000Z",
    weight: 64,
    notes: null,
  },
  {
    createdAt: "2024-02-11T09:25:00.000Z",
    date: "2024-02-11T09:25:00.000Z",
    weight: 63,
    notes: "Goal weight reached!",
  },
  {
    createdAt: "2024-02-12T08:30:00.000Z",
    date: "2024-02-12T08:30:00.000Z",
    weight: 63,
    notes: "Maintaining after reaching goal.",
  },
  {
    createdAt: "2024-02-13T10:00:00.000Z",
    date: "2024-02-13T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-14T09:10:00.000Z",
    date: "2024-02-14T09:10:00.000Z",
    weight: 63,
    notes: "Happy Valentine's Day weigh-in.",
  },
  {
    createdAt: "2024-02-15T11:00:00.000Z",
    date: "2024-02-15T11:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-16T09:45:00.000Z",
    date: "2024-02-16T09:45:00.000Z",
    weight: 63,
    notes: "Steady as she goes.",
  },
  {
    createdAt: "2024-02-17T08:50:00.000Z",
    date: "2024-02-17T08:50:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-18T10:30:00.000Z",
    date: "2024-02-18T10:30:00.000Z",
    weight: 63,
    notes: "Weekend maintenance.",
  },
  {
    createdAt: "2024-02-19T09:00:00.000Z",
    date: "2024-02-19T09:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-20T09:15:00.000Z",
    date: "2024-02-20T09:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-21T10:00:00.000Z",
    date: "2024-02-21T10:00:00.000Z",
    weight: 63,
    notes: "On track for maintenance.",
  },
  {
    createdAt: "2024-02-22T08:40:00.000Z",
    date: "2024-02-22T08:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-23T09:55:00.000Z",
    date: "2024-02-23T09:55:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-24T09:20:00.000Z",
    date: "2024-02-24T09:20:00.000Z",
    weight: 63,
    notes: "Weekend check.",
  },
  {
    createdAt: "2024-02-25T10:00:00.000Z",
    date: "2024-02-25T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-26T08:30:00.000Z",
    date: "2024-02-26T08:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-27T09:40:00.000Z",
    date: "2024-02-27T09:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-02-28T11:00:00.000Z",
    date: "2024-02-28T11:00:00.000Z",
    weight: 63,
    notes: "End of Feb, solid maintenance.",
  },
  {
    createdAt: "2024-02-29T09:00:00.000Z",
    date: "2024-02-29T09:00:00.000Z",
    weight: 63,
    notes: "Leap day weigh-in.",
  },
  {
    createdAt: "2024-03-01T08:50:00.000Z",
    date: "2024-03-01T08:50:00.000Z",
    weight: 63,
    notes: "New month, same great weight.",
  },
  {
    createdAt: "2024-03-02T10:20:00.000Z",
    date: "2024-03-02T10:20:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-03T09:30:00.000Z",
    date: "2024-03-03T09:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-04T08:15:00.000Z",
    date: "2024-03-04T08:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-05T09:40:00.000Z",
    date: "2024-03-05T09:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-06T10:00:00.000Z",
    date: "2024-03-06T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-07T08:45:00.000Z",
    date: "2024-03-07T08:45:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-08T09:05:00.000Z",
    date: "2024-03-08T09:05:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-09T10:15:00.000Z",
    date: "2024-03-09T10:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-10T09:00:00.000Z",
    date: "2024-03-10T09:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-11T09:25:00.000Z",
    date: "2024-03-11T09:25:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-12T08:30:00.000Z",
    date: "2024-03-12T08:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-13T10:00:00.000Z",
    date: "2024-03-13T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-14T09:10:00.000Z",
    date: "2024-03-14T09:10:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-15T11:00:00.000Z",
    date: "2024-03-15T11:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-16T09:45:00.000Z",
    date: "2024-03-16T09:45:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-17T08:50:00.000Z",
    date: "2024-03-17T08:50:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-18T10:30:00.000Z",
    date: "2024-03-18T10:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-19T09:00:00.000Z",
    date: "2024-03-19T09:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-20T09:15:00.000Z",
    date: "2024-03-20T09:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-21T10:00:00.000Z",
    date: "2024-03-21T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-22T08:40:00.000Z",
    date: "2024-03-22T08:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-23T09:55:00.000Z",
    date: "2024-03-23T09:55:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-24T09:20:00.000Z",
    date: "2024-03-24T09:20:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-25T10:00:00.000Z",
    date: "2024-03-25T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-26T08:30:00.000Z",
    date: "2024-03-26T08:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-27T09:40:00.000Z",
    date: "2024-03-27T09:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-28T11:00:00.000Z",
    date: "2024-03-28T11:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-29T09:00:00.000Z",
    date: "2024-03-29T09:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-30T08:50:00.000Z",
    date: "2024-03-30T08:50:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-03-31T10:20:00.000Z",
    date: "2024-03-31T10:20:00.000Z",
    weight: 63,
    notes: "End of month, solid maintenance.",
  },
  {
    createdAt: "2024-04-01T09:30:00.000Z",
    date: "2024-04-01T09:30:00.000Z",
    weight: 63,
    notes: "April Fools! Still on target.",
  },
  {
    createdAt: "2024-04-02T08:15:00.000Z",
    date: "2024-04-02T08:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-03T09:40:00.000Z",
    date: "2024-04-03T09:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-04T10:00:00.000Z",
    date: "2024-04-04T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-05T08:45:00.000Z",
    date: "2024-04-05T08:45:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-06T09:05:00.000Z",
    date: "2024-04-06T09:05:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-07T10:15:00.000Z",
    date: "2024-04-07T10:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-08T09:00:00.000Z",
    date: "2024-04-08T09:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-09T09:25:00.000Z",
    date: "2024-04-09T09:25:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-10T08:30:00.000Z",
    date: "2024-04-10T08:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-11T10:00:00.000Z",
    date: "2024-04-11T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-12T09:10:00.000Z",
    date: "2024-04-12T09:10:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-13T11:00:00.000Z",
    date: "2024-04-13T11:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-14T09:45:00.000Z",
    date: "2024-04-14T09:45:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-15T08:50:00.000Z",
    date: "2024-04-15T08:50:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-16T10:30:00.000Z",
    date: "2024-04-16T10:30:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-17T09:00:00.000Z",
    date: "2024-04-17T09:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-18T09:15:00.000Z",
    date: "2024-04-18T09:15:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-19T10:00:00.000Z",
    date: "2024-04-19T10:00:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-20T08:40:00.000Z",
    date: "2024-04-20T08:40:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-21T09:55:00.000Z",
    date: "2024-04-21T09:55:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-22T09:20:00.000Z",
    date: "2024-04-22T09:20:00.000Z",
    weight: 63,
    notes: null,
  },
  {
    createdAt: "2024-04-23T10:00:00.000Z",
    date: "2024-04-23T10:00:00.000Z",
    weight: 63,
    notes: "100 entries, still maintaining!",
  },
];

async function main() {
  console.log("start seed");
  await prisma.weighing.createMany({
    data: MockWeighing.map((weighing) => ({
      ...weighing,
      createdAt: new Date(weighing.createdAt),
      date: new Date(weighing.date),
    })),
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
