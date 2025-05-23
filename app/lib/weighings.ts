import { PrismaClient } from "@/generated/prisma";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { create } from "node:domain";
import { z } from "zod";
import prisma from "./prisma";
import { Timeframe } from "@/components/chart/timeframeSelector/timeframeSelector";
import { sub, subMonths, subYears } from "date-fns";

export const fetchAllWeighings = createServerFn({ method: "GET" }).handler(
  async () => {
    return await prisma.weighing.findMany({ orderBy: { date: "asc" } });
  }
);

const Sort = z.array(z.object({ id: z.string(), desc: z.boolean() })).min(1);
const Pagination = z.object({
  pageIndex: z.number().min(0),
  pageSize: z.number(),
});
const FetchWeighingsForHistoryParams = z.object({
  sort: Sort,
  pagination: Pagination,
});

export const fetchWeighingsForHistory = createServerFn({ method: "GET" })
  .validator((d: unknown) => FetchWeighingsForHistoryParams.parse(d))
  .handler(async ({ data }) => {
    const { sort: sorts, pagination } = data;

    const pages = Math.ceil(
      (await prisma.weighing.count({})) / pagination.pageSize
    );
    return {
      entries: await prisma.weighing.findMany({
        orderBy: [
          ...sorts.map((sort) => ({ [sort.id]: sort.desc ? "desc" : "asc" })),
        ],
        skip: pagination.pageSize * pagination.pageIndex,
        take: pagination.pageSize,
      }),
      pages,
    };
  });

export const weighingsQueryOptions = () =>
  queryOptions({
    queryKey: ["weighings"],
    queryFn: () => fetchAllWeighings(),
  });

export const fetchWeighingsInTimeframe = createServerFn({ method: "GET" })
  .validator((d: Timeframe) => d)
  .handler(async ({ data }) => {
    const timeframe = data;
    if (timeframe === "all") return await fetchAllWeighings();
    const durationInt = +timeframe.substring(0, 1);
    const durationType = timeframe.substring(1, 2);
    const endDate = new Date();
    const startDate =
      durationType === "m"
        ? subMonths(endDate, durationInt)
        : subYears(endDate, durationInt);

    return await prisma.weighing.findMany({
      orderBy: { date: "asc" },
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  });

export const fetchWeighing = createServerFn({ method: "GET" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
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
    return await prisma.weighing.findFirst({
      orderBy: { date: "desc" },
    });
  }
);

const fetchCurrentWeightChange = createServerFn({ method: "GET" }).handler(
  async () => {
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
    return await prisma.weighing.delete({
      where: {
        id: ctx.data.id,
      },
    });
  });

const fetchGoalWeight = createServerFn({ method: "GET" }).handler(async () => {
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
