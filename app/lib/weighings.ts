import { PrismaClient } from "@/generated/prisma";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { create } from "node:domain";
import { z } from "zod";

export const fetchWeighings = createServerFn({ method: "GET" }).handler(
  async () => {
    const prisma = new PrismaClient();
    return await prisma.weighing.findMany({ orderBy: { date: "asc" } });
  }
);

export const weighingsQueryOptions = () =>
  queryOptions({
    queryKey: ["weighings"],
    queryFn: () => fetchWeighings(),
  });

export const fetchWeighing = createServerFn({ method: "GET" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const prisma = new PrismaClient();
    return await prisma.weighing.findFirst({
      where: {
        id: data,
      },
    });
  });

export const weighingQueryOptions = (weighingId: number) =>
  queryOptions({
    queryKey: ["weighing", weighingId],
    queryFn: () => fetchWeighing({ data: weighingId }),
  });

const fetchCurrentWeight = createServerFn({ method: "GET" }).handler(
  async () => {
    const prisma = new PrismaClient();
    return await prisma.weighing.findFirst({
      orderBy: { date: "desc" },
    });
  }
);

const fetchCurrentWeightChange = createServerFn({ method: "GET" }).handler(
  async () => {
    const prisma = new PrismaClient();
    const weighings = await prisma.weighing.findMany({
      orderBy: { date: "desc" },
      take: 2,
    });
    if (weighings.length <= 1) return 0;
    const diffenrenz = weighings[0].weight - weighings[1].weight;
    return diffenrenz >= 0 ? `+${diffenrenz}` : diffenrenz.toString();
  }
);

const fetchStartingWeight = createServerFn({ method: "GET" }).handler(
  async () => {
    const prisma = new PrismaClient();
    return await prisma.weighing.findFirst({
      orderBy: { date: "asc" },
    });
  }
);

export const fetchDashboardData = createServerFn({ method: "GET" }).handler(
  async () => {
    const [currentWeight, currentWeightChange, startingWeight] =
      await Promise.all([
        (await fetchCurrentWeight())?.weight || 0,
        fetchCurrentWeightChange(),
        (await fetchStartingWeight())?.weight || 0,
      ]);
    const startingWeightChange = currentWeight - startingWeight;

    return {
      currentWeight,
      currentWeightChange,
      startingWeight,
      startingWeightChange:
        startingWeightChange >= 0
          ? `+${startingWeightChange}`
          : startingWeightChange.toString(),
    };
  }
);

const Weighing = z.object({
  weight: z.number().gt(0),
  date: z.date(),
  notes: z.string().optional(),
});

export const addWeighing = createServerFn({ method: "POST" })
  .validator((weighing: unknown) => {
    return Weighing.parse(weighing);
  })
  .handler(async (ctx) => {
    const prisma = new PrismaClient();
    return await prisma.weighing.create({
      data: {
        ...ctx.data,
      },
    });
  });

export const deleteWeighing = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    return z.object({ id: z.number() }).parse(id);
  })
  .handler(async (ctx) => {
    const prisma = new PrismaClient();
    return await prisma.weighing.delete({
      where: {
        id: ctx.data.id,
      },
    });
  });

const fetchGoalWeight = createServerFn({ method: "GET" }).handler(async () => {
  const prisma = new PrismaClient();
  return await prisma.goal.findFirst();
});

export const fetchGoalData = createServerFn({ method: "GET" }).handler(
  async () => {
    const [goalWeight, currentWeight] = await Promise.all([
      (await fetchGoalWeight())?.weight || 0,
      (await fetchCurrentWeight())?.weight || 0,
    ]);
    const toGo = currentWeight - goalWeight;
    return {
      goalWeight,
      toGo,
    };
  }
);

export const updateGoalWeight = createServerFn({ method: "POST" })
  .validator((weight: unknown) => {
    return z.object({ weight: z.number().gt(0) }).parse(weight);
  })
  .handler(async (ctx) => {
    const prisma = new PrismaClient();
    return await prisma.goal.upsert({
      create: {
        id: 1,
        weight: ctx.data.weight,
      },
      update: {
        weight: ctx.data.weight,
      },
      where: {
        id: 1,
      },
    });
  });
