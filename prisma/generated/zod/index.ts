import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const CountryScalarFieldEnumSchema = z.enum(['id','name']);

export const RegionScalarFieldEnumSchema = z.enum(['id','name','countryId']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name']);

export const TechScalarFieldEnumSchema = z.enum(['id','name']);

export const PositionScalarFieldEnumSchema = z.enum(['id','title','description','reward','companyId','countryId','regionId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COUNTRY SCHEMA
/////////////////////////////////////////

export const CountrySchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Country = z.infer<typeof CountrySchema>

/////////////////////////////////////////
// REGION SCHEMA
/////////////////////////////////////////

export const RegionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  countryId: z.number().int(),
})

export type Region = z.infer<typeof RegionSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// TECH SCHEMA
/////////////////////////////////////////

export const TechSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Tech = z.infer<typeof TechSchema>

/////////////////////////////////////////
// POSITION SCHEMA
/////////////////////////////////////////

export const PositionSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  reward: z.number().int().nullable(),
  companyId: z.number().int(),
  countryId: z.number().int(),
  regionId: z.number().int(),
})

export type Position = z.infer<typeof PositionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COUNTRY
//------------------------------------------------------

export const CountryIncludeSchema: z.ZodType<Prisma.CountryInclude> = z.object({
  regions: z.union([z.boolean(),z.lazy(() => RegionFindManyArgsSchema)]).optional(),
  Position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CountryArgsSchema: z.ZodType<Prisma.CountryDefaultArgs> = z.object({
  select: z.lazy(() => CountrySelectSchema).optional(),
  include: z.lazy(() => CountryIncludeSchema).optional(),
}).strict();

export const CountryCountOutputTypeArgsSchema: z.ZodType<Prisma.CountryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CountryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CountryCountOutputTypeSelectSchema: z.ZodType<Prisma.CountryCountOutputTypeSelect> = z.object({
  regions: z.boolean().optional(),
  Position: z.boolean().optional(),
}).strict();

export const CountrySelectSchema: z.ZodType<Prisma.CountrySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  regions: z.union([z.boolean(),z.lazy(() => RegionFindManyArgsSchema)]).optional(),
  Position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REGION
//------------------------------------------------------

export const RegionIncludeSchema: z.ZodType<Prisma.RegionInclude> = z.object({
  Position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RegionArgsSchema: z.ZodType<Prisma.RegionDefaultArgs> = z.object({
  select: z.lazy(() => RegionSelectSchema).optional(),
  include: z.lazy(() => RegionIncludeSchema).optional(),
}).strict();

export const RegionCountOutputTypeArgsSchema: z.ZodType<Prisma.RegionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RegionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RegionCountOutputTypeSelectSchema: z.ZodType<Prisma.RegionCountOutputTypeSelect> = z.object({
  Position: z.boolean().optional(),
}).strict();

export const RegionSelectSchema: z.ZodType<Prisma.RegionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  countryId: z.boolean().optional(),
  Position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  position: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TECH
//------------------------------------------------------

export const TechIncludeSchema: z.ZodType<Prisma.TechInclude> = z.object({
  position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TechArgsSchema: z.ZodType<Prisma.TechDefaultArgs> = z.object({
  select: z.lazy(() => TechSelectSchema).optional(),
  include: z.lazy(() => TechIncludeSchema).optional(),
}).strict();

export const TechCountOutputTypeArgsSchema: z.ZodType<Prisma.TechCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TechCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TechCountOutputTypeSelectSchema: z.ZodType<Prisma.TechCountOutputTypeSelect> = z.object({
  position: z.boolean().optional(),
}).strict();

export const TechSelectSchema: z.ZodType<Prisma.TechSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  position: z.union([z.boolean(),z.lazy(() => PositionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TechCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POSITION
//------------------------------------------------------

export const PositionIncludeSchema: z.ZodType<Prisma.PositionInclude> = z.object({
  techStack: z.union([z.boolean(),z.lazy(() => TechFindManyArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  region: z.union([z.boolean(),z.lazy(() => RegionArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PositionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PositionArgsSchema: z.ZodType<Prisma.PositionDefaultArgs> = z.object({
  select: z.lazy(() => PositionSelectSchema).optional(),
  include: z.lazy(() => PositionIncludeSchema).optional(),
}).strict();

export const PositionCountOutputTypeArgsSchema: z.ZodType<Prisma.PositionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PositionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PositionCountOutputTypeSelectSchema: z.ZodType<Prisma.PositionCountOutputTypeSelect> = z.object({
  techStack: z.boolean().optional(),
}).strict();

export const PositionSelectSchema: z.ZodType<Prisma.PositionSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  reward: z.boolean().optional(),
  companyId: z.boolean().optional(),
  countryId: z.boolean().optional(),
  regionId: z.boolean().optional(),
  techStack: z.union([z.boolean(),z.lazy(() => TechFindManyArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  country: z.union([z.boolean(),z.lazy(() => CountryArgsSchema)]).optional(),
  region: z.union([z.boolean(),z.lazy(() => RegionArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PositionCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CountryWhereInputSchema: z.ZodType<Prisma.CountryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  regions: z.lazy(() => RegionListRelationFilterSchema).optional(),
  Position: z.lazy(() => PositionListRelationFilterSchema).optional()
}).strict();

export const CountryOrderByWithRelationInputSchema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  regions: z.lazy(() => RegionOrderByRelationAggregateInputSchema).optional(),
  Position: z.lazy(() => PositionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CountryWhereUniqueInputSchema: z.ZodType<Prisma.CountryWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  regions: z.lazy(() => RegionListRelationFilterSchema).optional(),
  Position: z.lazy(() => PositionListRelationFilterSchema).optional()
}).strict());

export const CountryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CountryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CountryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CountryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CountryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CountryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CountrySumOrderByAggregateInputSchema).optional()
}).strict();

export const CountryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CountryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RegionWhereInputSchema: z.ZodType<Prisma.RegionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  Position: z.lazy(() => PositionListRelationFilterSchema).optional(),
  country: z.union([ z.lazy(() => CountryRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
}).strict();

export const RegionOrderByWithRelationInputSchema: z.ZodType<Prisma.RegionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  Position: z.lazy(() => PositionOrderByRelationAggregateInputSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional()
}).strict();

export const RegionWhereUniqueInputSchema: z.ZodType<Prisma.RegionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionWhereInputSchema),z.lazy(() => RegionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  Position: z.lazy(() => PositionListRelationFilterSchema).optional(),
  country: z.union([ z.lazy(() => CountryRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
}).strict());

export const RegionOrderByWithAggregationInputSchema: z.ZodType<Prisma.RegionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RegionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RegionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RegionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RegionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RegionSumOrderByAggregateInputSchema).optional()
}).strict();

export const RegionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RegionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RegionScalarWhereWithAggregatesInputSchema),z.lazy(() => RegionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionScalarWhereWithAggregatesInputSchema),z.lazy(() => RegionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  countryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.lazy(() => PositionListRelationFilterSchema).optional()
}).strict();

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => PositionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  position: z.lazy(() => PositionListRelationFilterSchema).optional()
}).strict());

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CompanyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CompanySumOrderByAggregateInputSchema).optional()
}).strict();

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TechWhereInputSchema: z.ZodType<Prisma.TechWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechWhereInputSchema),z.lazy(() => TechWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechWhereInputSchema),z.lazy(() => TechWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.lazy(() => PositionListRelationFilterSchema).optional()
}).strict();

export const TechOrderByWithRelationInputSchema: z.ZodType<Prisma.TechOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => PositionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TechWhereUniqueInputSchema: z.ZodType<Prisma.TechWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TechWhereInputSchema),z.lazy(() => TechWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechWhereInputSchema),z.lazy(() => TechWhereInputSchema).array() ]).optional(),
  position: z.lazy(() => PositionListRelationFilterSchema).optional()
}).strict());

export const TechOrderByWithAggregationInputSchema: z.ZodType<Prisma.TechOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TechCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TechAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TechMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TechMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TechSumOrderByAggregateInputSchema).optional()
}).strict();

export const TechScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TechScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TechScalarWhereWithAggregatesInputSchema),z.lazy(() => TechScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechScalarWhereWithAggregatesInputSchema),z.lazy(() => TechScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PositionWhereInputSchema: z.ZodType<Prisma.PositionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PositionWhereInputSchema),z.lazy(() => PositionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PositionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PositionWhereInputSchema),z.lazy(() => PositionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  regionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  techStack: z.lazy(() => TechListRelationFilterSchema).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => CountryRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  region: z.union([ z.lazy(() => RegionRelationFilterSchema),z.lazy(() => RegionWhereInputSchema) ]).optional(),
}).strict();

export const PositionOrderByWithRelationInputSchema: z.ZodType<Prisma.PositionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  techStack: z.lazy(() => TechOrderByRelationAggregateInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  country: z.lazy(() => CountryOrderByWithRelationInputSchema).optional(),
  region: z.lazy(() => RegionOrderByWithRelationInputSchema).optional()
}).strict();

export const PositionWhereUniqueInputSchema: z.ZodType<Prisma.PositionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PositionWhereInputSchema),z.lazy(() => PositionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PositionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PositionWhereInputSchema),z.lazy(() => PositionWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  regionId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  techStack: z.lazy(() => TechListRelationFilterSchema).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => CountryRelationFilterSchema),z.lazy(() => CountryWhereInputSchema) ]).optional(),
  region: z.union([ z.lazy(() => RegionRelationFilterSchema),z.lazy(() => RegionWhereInputSchema) ]).optional(),
}).strict());

export const PositionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PositionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PositionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PositionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PositionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PositionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PositionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PositionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PositionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PositionScalarWhereWithAggregatesInputSchema),z.lazy(() => PositionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PositionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PositionScalarWhereWithAggregatesInputSchema),z.lazy(() => PositionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  countryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  regionId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const CountryCreateInputSchema: z.ZodType<Prisma.CountryCreateInput> = z.object({
  name: z.string(),
  regions: z.lazy(() => RegionCreateNestedManyWithoutCountryInputSchema).optional(),
  Position: z.lazy(() => PositionCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateInputSchema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  regions: z.lazy(() => RegionUncheckedCreateNestedManyWithoutCountryInputSchema).optional(),
  Position: z.lazy(() => PositionUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUpdateInputSchema: z.ZodType<Prisma.CountryUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  regions: z.lazy(() => RegionUpdateManyWithoutCountryNestedInputSchema).optional(),
  Position: z.lazy(() => PositionUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  regions: z.lazy(() => RegionUncheckedUpdateManyWithoutCountryNestedInputSchema).optional(),
  Position: z.lazy(() => PositionUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUpdateManyMutationInputSchema: z.ZodType<Prisma.CountryUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegionCreateInputSchema: z.ZodType<Prisma.RegionCreateInput> = z.object({
  name: z.string(),
  Position: z.lazy(() => PositionCreateNestedManyWithoutRegionInputSchema).optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutRegionsInputSchema)
}).strict();

export const RegionUncheckedCreateInputSchema: z.ZodType<Prisma.RegionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  countryId: z.number().int(),
  Position: z.lazy(() => PositionUncheckedCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionUpdateInputSchema: z.ZodType<Prisma.RegionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.lazy(() => PositionUpdateManyWithoutRegionNestedInputSchema).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutRegionsNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.lazy(() => PositionUncheckedUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionUpdateManyMutationInputSchema: z.ZodType<Prisma.RegionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.object({
  name: z.string(),
  position: z.lazy(() => PositionCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  position: z.lazy(() => PositionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.lazy(() => PositionUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.lazy(() => PositionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechCreateInputSchema: z.ZodType<Prisma.TechCreateInput> = z.object({
  name: z.string(),
  position: z.lazy(() => PositionCreateNestedManyWithoutTechStackInputSchema).optional()
}).strict();

export const TechUncheckedCreateInputSchema: z.ZodType<Prisma.TechUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  position: z.lazy(() => PositionUncheckedCreateNestedManyWithoutTechStackInputSchema).optional()
}).strict();

export const TechUpdateInputSchema: z.ZodType<Prisma.TechUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.lazy(() => PositionUpdateManyWithoutTechStackNestedInputSchema).optional()
}).strict();

export const TechUncheckedUpdateInputSchema: z.ZodType<Prisma.TechUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.lazy(() => PositionUncheckedUpdateManyWithoutTechStackNestedInputSchema).optional()
}).strict();

export const TechUpdateManyMutationInputSchema: z.ZodType<Prisma.TechUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TechUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PositionCreateInputSchema: z.ZodType<Prisma.PositionCreateInput> = z.object({
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  techStack: z.lazy(() => TechCreateNestedManyWithoutPositionInputSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutPositionInputSchema),
  country: z.lazy(() => CountryCreateNestedOneWithoutPositionInputSchema),
  region: z.lazy(() => RegionCreateNestedOneWithoutPositionInputSchema)
}).strict();

export const PositionUncheckedCreateInputSchema: z.ZodType<Prisma.PositionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  companyId: z.number().int(),
  countryId: z.number().int(),
  regionId: z.number().int(),
  techStack: z.lazy(() => TechUncheckedCreateNestedManyWithoutPositionInputSchema).optional()
}).strict();

export const PositionUpdateInputSchema: z.ZodType<Prisma.PositionUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.lazy(() => TechUpdateManyWithoutPositionNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  region: z.lazy(() => RegionUpdateOneRequiredWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.lazy(() => TechUncheckedUpdateManyWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUpdateManyMutationInputSchema: z.ZodType<Prisma.PositionUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PositionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const RegionListRelationFilterSchema: z.ZodType<Prisma.RegionListRelationFilter> = z.object({
  every: z.lazy(() => RegionWhereInputSchema).optional(),
  some: z.lazy(() => RegionWhereInputSchema).optional(),
  none: z.lazy(() => RegionWhereInputSchema).optional()
}).strict();

export const PositionListRelationFilterSchema: z.ZodType<Prisma.PositionListRelationFilter> = z.object({
  every: z.lazy(() => PositionWhereInputSchema).optional(),
  some: z.lazy(() => PositionWhereInputSchema).optional(),
  none: z.lazy(() => PositionWhereInputSchema).optional()
}).strict();

export const RegionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RegionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PositionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PositionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CountryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CountryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountrySumOrderByAggregateInputSchema: z.ZodType<Prisma.CountrySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const CountryRelationFilterSchema: z.ZodType<Prisma.CountryRelationFilter> = z.object({
  is: z.lazy(() => CountryWhereInputSchema).optional(),
  isNot: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const RegionCountOrderByAggregateInputSchema: z.ZodType<Prisma.RegionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RegionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RegionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionMinOrderByAggregateInputSchema: z.ZodType<Prisma.RegionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RegionSumOrderByAggregateInputSchema: z.ZodType<Prisma.RegionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanySumOrderByAggregateInputSchema: z.ZodType<Prisma.CompanySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechCountOrderByAggregateInputSchema: z.ZodType<Prisma.TechCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TechAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TechMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechMinOrderByAggregateInputSchema: z.ZodType<Prisma.TechMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TechSumOrderByAggregateInputSchema: z.ZodType<Prisma.TechSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TechListRelationFilterSchema: z.ZodType<Prisma.TechListRelationFilter> = z.object({
  every: z.lazy(() => TechWhereInputSchema).optional(),
  some: z.lazy(() => TechWhereInputSchema).optional(),
  none: z.lazy(() => TechWhereInputSchema).optional()
}).strict();

export const CompanyRelationFilterSchema: z.ZodType<Prisma.CompanyRelationFilter> = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const RegionRelationFilterSchema: z.ZodType<Prisma.RegionRelationFilter> = z.object({
  is: z.lazy(() => RegionWhereInputSchema).optional(),
  isNot: z.lazy(() => RegionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TechOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TechOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PositionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PositionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PositionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PositionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PositionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PositionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PositionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PositionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PositionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PositionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reward: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  countryId: z.lazy(() => SortOrderSchema).optional(),
  regionId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const RegionCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.RegionCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutCountryInputSchema),z.lazy(() => RegionCreateWithoutCountryInputSchema).array(),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.PositionCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCountryInputSchema),z.lazy(() => PositionCreateWithoutCountryInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RegionUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.RegionUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutCountryInputSchema),z.lazy(() => RegionCreateWithoutCountryInputSchema).array(),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionUncheckedCreateNestedManyWithoutCountryInputSchema: z.ZodType<Prisma.PositionUncheckedCreateNestedManyWithoutCountryInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCountryInputSchema),z.lazy(() => PositionCreateWithoutCountryInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const RegionUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.RegionUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutCountryInputSchema),z.lazy(() => RegionCreateWithoutCountryInputSchema).array(),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegionUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => RegionUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegionUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => RegionUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegionUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => RegionUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegionScalarWhereInputSchema),z.lazy(() => RegionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.PositionUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCountryInputSchema),z.lazy(() => PositionCreateWithoutCountryInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RegionUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutCountryInputSchema),z.lazy(() => RegionCreateWithoutCountryInputSchema).array(),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => RegionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RegionUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => RegionUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RegionWhereUniqueInputSchema),z.lazy(() => RegionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RegionUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => RegionUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RegionUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => RegionUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RegionScalarWhereInputSchema),z.lazy(() => RegionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionUncheckedUpdateManyWithoutCountryNestedInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutCountryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCountryInputSchema),z.lazy(() => PositionCreateWithoutCountryInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCountryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutCountryInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutCountryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutCountryInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutCountryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.PositionCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutRegionInputSchema),z.lazy(() => PositionCreateWithoutRegionInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryCreateNestedOneWithoutRegionsInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutRegionsInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutRegionsInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const PositionUncheckedCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.PositionUncheckedCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutRegionInputSchema),z.lazy(() => PositionCreateWithoutRegionInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.PositionUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutRegionInputSchema),z.lazy(() => PositionCreateWithoutRegionInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateOneRequiredWithoutRegionsNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutRegionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutRegionsInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutRegionsInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutRegionsInputSchema),z.lazy(() => CountryUpdateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutRegionsInputSchema) ]).optional(),
}).strict();

export const PositionUncheckedUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutRegionInputSchema),z.lazy(() => PositionCreateWithoutRegionInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema),z.lazy(() => PositionCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.PositionCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCompanyInputSchema),z.lazy(() => PositionCreateWithoutCompanyInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCompanyInputSchema),z.lazy(() => PositionCreateWithoutCompanyInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.PositionUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCompanyInputSchema),z.lazy(() => PositionCreateWithoutCompanyInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutCompanyInputSchema),z.lazy(() => PositionCreateWithoutCompanyInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PositionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionCreateNestedManyWithoutTechStackInputSchema: z.ZodType<Prisma.PositionCreateNestedManyWithoutTechStackInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutTechStackInputSchema),z.lazy(() => PositionCreateWithoutTechStackInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema),z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionUncheckedCreateNestedManyWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUncheckedCreateNestedManyWithoutTechStackInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutTechStackInputSchema),z.lazy(() => PositionCreateWithoutTechStackInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema),z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PositionUpdateManyWithoutTechStackNestedInputSchema: z.ZodType<Prisma.PositionUpdateManyWithoutTechStackNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutTechStackInputSchema),z.lazy(() => PositionCreateWithoutTechStackInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema),z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutTechStackInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutTechStackInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutTechStackInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutTechStackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutTechStackInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutTechStackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PositionUncheckedUpdateManyWithoutTechStackNestedInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutTechStackNestedInput> = z.object({
  create: z.union([ z.lazy(() => PositionCreateWithoutTechStackInputSchema),z.lazy(() => PositionCreateWithoutTechStackInputSchema).array(),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema),z.lazy(() => PositionCreateOrConnectWithoutTechStackInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PositionUpsertWithWhereUniqueWithoutTechStackInputSchema),z.lazy(() => PositionUpsertWithWhereUniqueWithoutTechStackInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PositionWhereUniqueInputSchema),z.lazy(() => PositionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PositionUpdateWithWhereUniqueWithoutTechStackInputSchema),z.lazy(() => PositionUpdateWithWhereUniqueWithoutTechStackInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PositionUpdateManyWithWhereWithoutTechStackInputSchema),z.lazy(() => PositionUpdateManyWithWhereWithoutTechStackInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TechCreateNestedManyWithoutPositionInputSchema: z.ZodType<Prisma.TechCreateNestedManyWithoutPositionInput> = z.object({
  create: z.union([ z.lazy(() => TechCreateWithoutPositionInputSchema),z.lazy(() => TechCreateWithoutPositionInputSchema).array(),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema),z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyCreateNestedOneWithoutPositionInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutPositionInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPositionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutPositionInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const CountryCreateNestedOneWithoutPositionInputSchema: z.ZodType<Prisma.CountryCreateNestedOneWithoutPositionInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPositionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutPositionInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional()
}).strict();

export const RegionCreateNestedOneWithoutPositionInputSchema: z.ZodType<Prisma.RegionCreateNestedOneWithoutPositionInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedCreateWithoutPositionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegionCreateOrConnectWithoutPositionInputSchema).optional(),
  connect: z.lazy(() => RegionWhereUniqueInputSchema).optional()
}).strict();

export const TechUncheckedCreateNestedManyWithoutPositionInputSchema: z.ZodType<Prisma.TechUncheckedCreateNestedManyWithoutPositionInput> = z.object({
  create: z.union([ z.lazy(() => TechCreateWithoutPositionInputSchema),z.lazy(() => TechCreateWithoutPositionInputSchema).array(),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema),z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TechUpdateManyWithoutPositionNestedInputSchema: z.ZodType<Prisma.TechUpdateManyWithoutPositionNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechCreateWithoutPositionInputSchema),z.lazy(() => TechCreateWithoutPositionInputSchema).array(),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema),z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechUpsertWithWhereUniqueWithoutPositionInputSchema),z.lazy(() => TechUpsertWithWhereUniqueWithoutPositionInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechUpdateWithWhereUniqueWithoutPositionInputSchema),z.lazy(() => TechUpdateWithWhereUniqueWithoutPositionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechUpdateManyWithWhereWithoutPositionInputSchema),z.lazy(() => TechUpdateManyWithWhereWithoutPositionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechScalarWhereInputSchema),z.lazy(() => TechScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutPositionNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutPositionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPositionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutPositionInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutPositionInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutPositionInputSchema),z.lazy(() => CompanyUpdateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutPositionInputSchema) ]).optional(),
}).strict();

export const CountryUpdateOneRequiredWithoutPositionNestedInputSchema: z.ZodType<Prisma.CountryUpdateOneRequiredWithoutPositionNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPositionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CountryCreateOrConnectWithoutPositionInputSchema).optional(),
  upsert: z.lazy(() => CountryUpsertWithoutPositionInputSchema).optional(),
  connect: z.lazy(() => CountryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CountryUpdateToOneWithWhereWithoutPositionInputSchema),z.lazy(() => CountryUpdateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPositionInputSchema) ]).optional(),
}).strict();

export const RegionUpdateOneRequiredWithoutPositionNestedInputSchema: z.ZodType<Prisma.RegionUpdateOneRequiredWithoutPositionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RegionCreateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedCreateWithoutPositionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RegionCreateOrConnectWithoutPositionInputSchema).optional(),
  upsert: z.lazy(() => RegionUpsertWithoutPositionInputSchema).optional(),
  connect: z.lazy(() => RegionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RegionUpdateToOneWithWhereWithoutPositionInputSchema),z.lazy(() => RegionUpdateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutPositionInputSchema) ]).optional(),
}).strict();

export const TechUncheckedUpdateManyWithoutPositionNestedInputSchema: z.ZodType<Prisma.TechUncheckedUpdateManyWithoutPositionNestedInput> = z.object({
  create: z.union([ z.lazy(() => TechCreateWithoutPositionInputSchema),z.lazy(() => TechCreateWithoutPositionInputSchema).array(),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema),z.lazy(() => TechCreateOrConnectWithoutPositionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TechUpsertWithWhereUniqueWithoutPositionInputSchema),z.lazy(() => TechUpsertWithWhereUniqueWithoutPositionInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TechWhereUniqueInputSchema),z.lazy(() => TechWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TechUpdateWithWhereUniqueWithoutPositionInputSchema),z.lazy(() => TechUpdateWithWhereUniqueWithoutPositionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TechUpdateManyWithWhereWithoutPositionInputSchema),z.lazy(() => TechUpdateManyWithWhereWithoutPositionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TechScalarWhereInputSchema),z.lazy(() => TechScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RegionCreateWithoutCountryInputSchema: z.ZodType<Prisma.RegionCreateWithoutCountryInput> = z.object({
  name: z.string(),
  Position: z.lazy(() => PositionCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.RegionUncheckedCreateWithoutCountryInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  Position: z.lazy(() => PositionUncheckedCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const RegionCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.RegionCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => RegionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegionCreateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const PositionCreateWithoutCountryInputSchema: z.ZodType<Prisma.PositionCreateWithoutCountryInput> = z.object({
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  techStack: z.lazy(() => TechCreateNestedManyWithoutPositionInputSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutPositionInputSchema),
  region: z.lazy(() => RegionCreateNestedOneWithoutPositionInputSchema)
}).strict();

export const PositionUncheckedCreateWithoutCountryInputSchema: z.ZodType<Prisma.PositionUncheckedCreateWithoutCountryInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  companyId: z.number().int(),
  regionId: z.number().int(),
  techStack: z.lazy(() => TechUncheckedCreateNestedManyWithoutPositionInputSchema).optional()
}).strict();

export const PositionCreateOrConnectWithoutCountryInputSchema: z.ZodType<Prisma.PositionCreateOrConnectWithoutCountryInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PositionCreateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const RegionUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.RegionUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => RegionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RegionUpdateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => RegionCreateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const RegionUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.RegionUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => RegionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RegionUpdateWithoutCountryInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const RegionUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.RegionUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => RegionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RegionUpdateManyMutationInputSchema),z.lazy(() => RegionUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const RegionScalarWhereInputSchema: z.ZodType<Prisma.RegionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RegionScalarWhereInputSchema),z.lazy(() => RegionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RegionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RegionScalarWhereInputSchema),z.lazy(() => RegionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PositionUpsertWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.PositionUpsertWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PositionUpdateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutCountryInputSchema) ]),
  create: z.union([ z.lazy(() => PositionCreateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCountryInputSchema) ]),
}).strict();

export const PositionUpdateWithWhereUniqueWithoutCountryInputSchema: z.ZodType<Prisma.PositionUpdateWithWhereUniqueWithoutCountryInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateWithoutCountryInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutCountryInputSchema) ]),
}).strict();

export const PositionUpdateManyWithWhereWithoutCountryInputSchema: z.ZodType<Prisma.PositionUpdateManyWithWhereWithoutCountryInput> = z.object({
  where: z.lazy(() => PositionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateManyMutationInputSchema),z.lazy(() => PositionUncheckedUpdateManyWithoutCountryInputSchema) ]),
}).strict();

export const PositionScalarWhereInputSchema: z.ZodType<Prisma.PositionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PositionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PositionScalarWhereInputSchema),z.lazy(() => PositionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reward: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  countryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  regionId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PositionCreateWithoutRegionInputSchema: z.ZodType<Prisma.PositionCreateWithoutRegionInput> = z.object({
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  techStack: z.lazy(() => TechCreateNestedManyWithoutPositionInputSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutPositionInputSchema),
  country: z.lazy(() => CountryCreateNestedOneWithoutPositionInputSchema)
}).strict();

export const PositionUncheckedCreateWithoutRegionInputSchema: z.ZodType<Prisma.PositionUncheckedCreateWithoutRegionInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  companyId: z.number().int(),
  countryId: z.number().int(),
  techStack: z.lazy(() => TechUncheckedCreateNestedManyWithoutPositionInputSchema).optional()
}).strict();

export const PositionCreateOrConnectWithoutRegionInputSchema: z.ZodType<Prisma.PositionCreateOrConnectWithoutRegionInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PositionCreateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const CountryCreateWithoutRegionsInputSchema: z.ZodType<Prisma.CountryCreateWithoutRegionsInput> = z.object({
  name: z.string(),
  Position: z.lazy(() => PositionCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutRegionsInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutRegionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  Position: z.lazy(() => PositionUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutRegionsInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutRegionsInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionsInputSchema) ]),
}).strict();

export const PositionUpsertWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.PositionUpsertWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PositionUpdateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutRegionInputSchema) ]),
  create: z.union([ z.lazy(() => PositionCreateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const PositionUpdateWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.PositionUpdateWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateWithoutRegionInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutRegionInputSchema) ]),
}).strict();

export const PositionUpdateManyWithWhereWithoutRegionInputSchema: z.ZodType<Prisma.PositionUpdateManyWithWhereWithoutRegionInput> = z.object({
  where: z.lazy(() => PositionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateManyMutationInputSchema),z.lazy(() => PositionUncheckedUpdateManyWithoutRegionInputSchema) ]),
}).strict();

export const CountryUpsertWithoutRegionsInputSchema: z.ZodType<Prisma.CountryUpsertWithoutRegionsInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutRegionsInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedCreateWithoutRegionsInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutRegionsInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutRegionsInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutRegionsInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutRegionsInputSchema) ]),
}).strict();

export const CountryUpdateWithoutRegionsInputSchema: z.ZodType<Prisma.CountryUpdateWithoutRegionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.lazy(() => PositionUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutRegionsInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutRegionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.lazy(() => PositionUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const PositionCreateWithoutCompanyInputSchema: z.ZodType<Prisma.PositionCreateWithoutCompanyInput> = z.object({
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  techStack: z.lazy(() => TechCreateNestedManyWithoutPositionInputSchema).optional(),
  country: z.lazy(() => CountryCreateNestedOneWithoutPositionInputSchema),
  region: z.lazy(() => RegionCreateNestedOneWithoutPositionInputSchema)
}).strict();

export const PositionUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  countryId: z.number().int(),
  regionId: z.number().int(),
  techStack: z.lazy(() => TechUncheckedCreateNestedManyWithoutPositionInputSchema).optional()
}).strict();

export const PositionCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.PositionCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PositionCreateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const PositionUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PositionUpdateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => PositionCreateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const PositionUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateWithoutCompanyInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const PositionUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => PositionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateManyMutationInputSchema),z.lazy(() => PositionUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const PositionCreateWithoutTechStackInputSchema: z.ZodType<Prisma.PositionCreateWithoutTechStackInput> = z.object({
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutPositionInputSchema),
  country: z.lazy(() => CountryCreateNestedOneWithoutPositionInputSchema),
  region: z.lazy(() => RegionCreateNestedOneWithoutPositionInputSchema)
}).strict();

export const PositionUncheckedCreateWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUncheckedCreateWithoutTechStackInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string(),
  reward: z.number().int().optional().nullable(),
  companyId: z.number().int(),
  countryId: z.number().int(),
  regionId: z.number().int()
}).strict();

export const PositionCreateOrConnectWithoutTechStackInputSchema: z.ZodType<Prisma.PositionCreateOrConnectWithoutTechStackInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PositionCreateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema) ]),
}).strict();

export const PositionUpsertWithWhereUniqueWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUpsertWithWhereUniqueWithoutTechStackInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PositionUpdateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutTechStackInputSchema) ]),
  create: z.union([ z.lazy(() => PositionCreateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedCreateWithoutTechStackInputSchema) ]),
}).strict();

export const PositionUpdateWithWhereUniqueWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUpdateWithWhereUniqueWithoutTechStackInput> = z.object({
  where: z.lazy(() => PositionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateWithoutTechStackInputSchema),z.lazy(() => PositionUncheckedUpdateWithoutTechStackInputSchema) ]),
}).strict();

export const PositionUpdateManyWithWhereWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUpdateManyWithWhereWithoutTechStackInput> = z.object({
  where: z.lazy(() => PositionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PositionUpdateManyMutationInputSchema),z.lazy(() => PositionUncheckedUpdateManyWithoutTechStackInputSchema) ]),
}).strict();

export const TechCreateWithoutPositionInputSchema: z.ZodType<Prisma.TechCreateWithoutPositionInput> = z.object({
  name: z.string()
}).strict();

export const TechUncheckedCreateWithoutPositionInputSchema: z.ZodType<Prisma.TechUncheckedCreateWithoutPositionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const TechCreateOrConnectWithoutPositionInputSchema: z.ZodType<Prisma.TechCreateOrConnectWithoutPositionInput> = z.object({
  where: z.lazy(() => TechWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TechCreateWithoutPositionInputSchema),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema) ]),
}).strict();

export const CompanyCreateWithoutPositionInputSchema: z.ZodType<Prisma.CompanyCreateWithoutPositionInput> = z.object({
  name: z.string()
}).strict();

export const CompanyUncheckedCreateWithoutPositionInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutPositionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();

export const CompanyCreateOrConnectWithoutPositionInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutPositionInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPositionInputSchema) ]),
}).strict();

export const CountryCreateWithoutPositionInputSchema: z.ZodType<Prisma.CountryCreateWithoutPositionInput> = z.object({
  name: z.string(),
  regions: z.lazy(() => RegionCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryUncheckedCreateWithoutPositionInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutPositionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  regions: z.lazy(() => RegionUncheckedCreateNestedManyWithoutCountryInputSchema).optional()
}).strict();

export const CountryCreateOrConnectWithoutPositionInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutPositionInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPositionInputSchema) ]),
}).strict();

export const RegionCreateWithoutPositionInputSchema: z.ZodType<Prisma.RegionCreateWithoutPositionInput> = z.object({
  name: z.string(),
  country: z.lazy(() => CountryCreateNestedOneWithoutRegionsInputSchema)
}).strict();

export const RegionUncheckedCreateWithoutPositionInputSchema: z.ZodType<Prisma.RegionUncheckedCreateWithoutPositionInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  countryId: z.number().int()
}).strict();

export const RegionCreateOrConnectWithoutPositionInputSchema: z.ZodType<Prisma.RegionCreateOrConnectWithoutPositionInput> = z.object({
  where: z.lazy(() => RegionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RegionCreateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedCreateWithoutPositionInputSchema) ]),
}).strict();

export const TechUpsertWithWhereUniqueWithoutPositionInputSchema: z.ZodType<Prisma.TechUpsertWithWhereUniqueWithoutPositionInput> = z.object({
  where: z.lazy(() => TechWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TechUpdateWithoutPositionInputSchema),z.lazy(() => TechUncheckedUpdateWithoutPositionInputSchema) ]),
  create: z.union([ z.lazy(() => TechCreateWithoutPositionInputSchema),z.lazy(() => TechUncheckedCreateWithoutPositionInputSchema) ]),
}).strict();

export const TechUpdateWithWhereUniqueWithoutPositionInputSchema: z.ZodType<Prisma.TechUpdateWithWhereUniqueWithoutPositionInput> = z.object({
  where: z.lazy(() => TechWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TechUpdateWithoutPositionInputSchema),z.lazy(() => TechUncheckedUpdateWithoutPositionInputSchema) ]),
}).strict();

export const TechUpdateManyWithWhereWithoutPositionInputSchema: z.ZodType<Prisma.TechUpdateManyWithWhereWithoutPositionInput> = z.object({
  where: z.lazy(() => TechScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TechUpdateManyMutationInputSchema),z.lazy(() => TechUncheckedUpdateManyWithoutPositionInputSchema) ]),
}).strict();

export const TechScalarWhereInputSchema: z.ZodType<Prisma.TechScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TechScalarWhereInputSchema),z.lazy(() => TechScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TechScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TechScalarWhereInputSchema),z.lazy(() => TechScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CompanyUpsertWithoutPositionInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutPositionInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutPositionInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPositionInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutPositionInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutPositionInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutPositionInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutPositionInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutPositionInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutPositionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUncheckedUpdateWithoutPositionInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutPositionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUpsertWithoutPositionInputSchema: z.ZodType<Prisma.CountryUpsertWithoutPositionInput> = z.object({
  update: z.union([ z.lazy(() => CountryUpdateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPositionInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedCreateWithoutPositionInputSchema) ]),
  where: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryUpdateToOneWithWhereWithoutPositionInputSchema: z.ZodType<Prisma.CountryUpdateToOneWithWhereWithoutPositionInput> = z.object({
  where: z.lazy(() => CountryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CountryUpdateWithoutPositionInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutPositionInputSchema) ]),
}).strict();

export const CountryUpdateWithoutPositionInputSchema: z.ZodType<Prisma.CountryUpdateWithoutPositionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  regions: z.lazy(() => RegionUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateWithoutPositionInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutPositionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  regions: z.lazy(() => RegionUncheckedUpdateManyWithoutCountryNestedInputSchema).optional()
}).strict();

export const RegionUpsertWithoutPositionInputSchema: z.ZodType<Prisma.RegionUpsertWithoutPositionInput> = z.object({
  update: z.union([ z.lazy(() => RegionUpdateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutPositionInputSchema) ]),
  create: z.union([ z.lazy(() => RegionCreateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedCreateWithoutPositionInputSchema) ]),
  where: z.lazy(() => RegionWhereInputSchema).optional()
}).strict();

export const RegionUpdateToOneWithWhereWithoutPositionInputSchema: z.ZodType<Prisma.RegionUpdateToOneWithWhereWithoutPositionInput> = z.object({
  where: z.lazy(() => RegionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RegionUpdateWithoutPositionInputSchema),z.lazy(() => RegionUncheckedUpdateWithoutPositionInputSchema) ]),
}).strict();

export const RegionUpdateWithoutPositionInputSchema: z.ZodType<Prisma.RegionUpdateWithoutPositionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutRegionsNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateWithoutPositionInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateWithoutPositionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RegionUpdateWithoutCountryInputSchema: z.ZodType<Prisma.RegionUpdateWithoutCountryInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.lazy(() => PositionUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Position: z.lazy(() => PositionUncheckedUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const RegionUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.RegionUncheckedUpdateManyWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PositionUpdateWithoutCountryInputSchema: z.ZodType<Prisma.PositionUpdateWithoutCountryInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.lazy(() => TechUpdateManyWithoutPositionNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  region: z.lazy(() => RegionUpdateOneRequiredWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateWithoutCountryInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.lazy(() => TechUncheckedUpdateManyWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateManyWithoutCountryInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutCountryInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PositionUpdateWithoutRegionInputSchema: z.ZodType<Prisma.PositionUpdateWithoutRegionInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.lazy(() => TechUpdateManyWithoutPositionNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateWithoutRegionInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.lazy(() => TechUncheckedUpdateManyWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateManyWithoutRegionInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PositionUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUpdateWithoutCompanyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  techStack: z.lazy(() => TechUpdateManyWithoutPositionNestedInputSchema).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  region: z.lazy(() => RegionUpdateOneRequiredWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.lazy(() => TechUncheckedUpdateManyWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PositionUpdateWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUpdateWithoutTechStackInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  country: z.lazy(() => CountryUpdateOneRequiredWithoutPositionNestedInputSchema).optional(),
  region: z.lazy(() => RegionUpdateOneRequiredWithoutPositionNestedInputSchema).optional()
}).strict();

export const PositionUncheckedUpdateWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateWithoutTechStackInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PositionUncheckedUpdateManyWithoutTechStackInputSchema: z.ZodType<Prisma.PositionUncheckedUpdateManyWithoutTechStackInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reward: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  countryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  regionId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechUpdateWithoutPositionInputSchema: z.ZodType<Prisma.TechUpdateWithoutPositionInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechUncheckedUpdateWithoutPositionInputSchema: z.ZodType<Prisma.TechUncheckedUpdateWithoutPositionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TechUncheckedUpdateManyWithoutPositionInputSchema: z.ZodType<Prisma.TechUncheckedUpdateManyWithoutPositionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CountryFindFirstArgsSchema: z.ZodType<Prisma.CountryFindFirstArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CountryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CountryFindFirstOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CountryFindManyArgsSchema: z.ZodType<Prisma.CountryFindManyArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CountryAggregateArgsSchema: z.ZodType<Prisma.CountryAggregateArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CountryGroupByArgsSchema: z.ZodType<Prisma.CountryGroupByArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithAggregationInputSchema.array(),CountryOrderByWithAggregationInputSchema ]).optional(),
  by: CountryScalarFieldEnumSchema.array(),
  having: CountryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CountryFindUniqueArgsSchema: z.ZodType<Prisma.CountryFindUniqueArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict()

export const CountryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CountryFindUniqueOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict()

export const RegionFindFirstArgsSchema: z.ZodType<Prisma.RegionFindFirstArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RegionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RegionFindFirstOrThrowArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RegionFindManyArgsSchema: z.ZodType<Prisma.RegionFindManyArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RegionAggregateArgsSchema: z.ZodType<Prisma.RegionAggregateArgs> = z.object({
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithRelationInputSchema.array(),RegionOrderByWithRelationInputSchema ]).optional(),
  cursor: RegionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RegionGroupByArgsSchema: z.ZodType<Prisma.RegionGroupByArgs> = z.object({
  where: RegionWhereInputSchema.optional(),
  orderBy: z.union([ RegionOrderByWithAggregationInputSchema.array(),RegionOrderByWithAggregationInputSchema ]).optional(),
  by: RegionScalarFieldEnumSchema.array(),
  having: RegionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RegionFindUniqueArgsSchema: z.ZodType<Prisma.RegionFindUniqueArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
}).strict()

export const RegionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RegionFindUniqueOrThrowArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
}).strict()

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(),CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(),
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict()

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict()

export const TechFindFirstArgsSchema: z.ZodType<Prisma.TechFindFirstArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereInputSchema.optional(),
  orderBy: z.union([ TechOrderByWithRelationInputSchema.array(),TechOrderByWithRelationInputSchema ]).optional(),
  cursor: TechWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechScalarFieldEnumSchema,TechScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TechFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TechFindFirstOrThrowArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereInputSchema.optional(),
  orderBy: z.union([ TechOrderByWithRelationInputSchema.array(),TechOrderByWithRelationInputSchema ]).optional(),
  cursor: TechWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechScalarFieldEnumSchema,TechScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TechFindManyArgsSchema: z.ZodType<Prisma.TechFindManyArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereInputSchema.optional(),
  orderBy: z.union([ TechOrderByWithRelationInputSchema.array(),TechOrderByWithRelationInputSchema ]).optional(),
  cursor: TechWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TechScalarFieldEnumSchema,TechScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TechAggregateArgsSchema: z.ZodType<Prisma.TechAggregateArgs> = z.object({
  where: TechWhereInputSchema.optional(),
  orderBy: z.union([ TechOrderByWithRelationInputSchema.array(),TechOrderByWithRelationInputSchema ]).optional(),
  cursor: TechWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TechGroupByArgsSchema: z.ZodType<Prisma.TechGroupByArgs> = z.object({
  where: TechWhereInputSchema.optional(),
  orderBy: z.union([ TechOrderByWithAggregationInputSchema.array(),TechOrderByWithAggregationInputSchema ]).optional(),
  by: TechScalarFieldEnumSchema.array(),
  having: TechScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TechFindUniqueArgsSchema: z.ZodType<Prisma.TechFindUniqueArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereUniqueInputSchema,
}).strict()

export const TechFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TechFindUniqueOrThrowArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereUniqueInputSchema,
}).strict()

export const PositionFindFirstArgsSchema: z.ZodType<Prisma.PositionFindFirstArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereInputSchema.optional(),
  orderBy: z.union([ PositionOrderByWithRelationInputSchema.array(),PositionOrderByWithRelationInputSchema ]).optional(),
  cursor: PositionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PositionScalarFieldEnumSchema,PositionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PositionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PositionFindFirstOrThrowArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereInputSchema.optional(),
  orderBy: z.union([ PositionOrderByWithRelationInputSchema.array(),PositionOrderByWithRelationInputSchema ]).optional(),
  cursor: PositionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PositionScalarFieldEnumSchema,PositionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PositionFindManyArgsSchema: z.ZodType<Prisma.PositionFindManyArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereInputSchema.optional(),
  orderBy: z.union([ PositionOrderByWithRelationInputSchema.array(),PositionOrderByWithRelationInputSchema ]).optional(),
  cursor: PositionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PositionScalarFieldEnumSchema,PositionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PositionAggregateArgsSchema: z.ZodType<Prisma.PositionAggregateArgs> = z.object({
  where: PositionWhereInputSchema.optional(),
  orderBy: z.union([ PositionOrderByWithRelationInputSchema.array(),PositionOrderByWithRelationInputSchema ]).optional(),
  cursor: PositionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PositionGroupByArgsSchema: z.ZodType<Prisma.PositionGroupByArgs> = z.object({
  where: PositionWhereInputSchema.optional(),
  orderBy: z.union([ PositionOrderByWithAggregationInputSchema.array(),PositionOrderByWithAggregationInputSchema ]).optional(),
  by: PositionScalarFieldEnumSchema.array(),
  having: PositionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PositionFindUniqueArgsSchema: z.ZodType<Prisma.PositionFindUniqueArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereUniqueInputSchema,
}).strict()

export const PositionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PositionFindUniqueOrThrowArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereUniqueInputSchema,
}).strict()

export const CountryCreateArgsSchema: z.ZodType<Prisma.CountryCreateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
}).strict()

export const CountryUpsertArgsSchema: z.ZodType<Prisma.CountryUpsertArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
  create: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
  update: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
}).strict()

export const CountryDeleteArgsSchema: z.ZodType<Prisma.CountryDeleteArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict()

export const CountryUpdateArgsSchema: z.ZodType<Prisma.CountryUpdateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
  where: CountryWhereUniqueInputSchema,
}).strict()

export const CountryUpdateManyArgsSchema: z.ZodType<Prisma.CountryUpdateManyArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema,CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(),
}).strict()

export const CountryDeleteManyArgsSchema: z.ZodType<Prisma.CountryDeleteManyArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
}).strict()

export const RegionCreateArgsSchema: z.ZodType<Prisma.RegionCreateArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  data: z.union([ RegionCreateInputSchema,RegionUncheckedCreateInputSchema ]),
}).strict()

export const RegionUpsertArgsSchema: z.ZodType<Prisma.RegionUpsertArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
  create: z.union([ RegionCreateInputSchema,RegionUncheckedCreateInputSchema ]),
  update: z.union([ RegionUpdateInputSchema,RegionUncheckedUpdateInputSchema ]),
}).strict()

export const RegionDeleteArgsSchema: z.ZodType<Prisma.RegionDeleteArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  where: RegionWhereUniqueInputSchema,
}).strict()

export const RegionUpdateArgsSchema: z.ZodType<Prisma.RegionUpdateArgs> = z.object({
  select: RegionSelectSchema.optional(),
  include: RegionIncludeSchema.optional(),
  data: z.union([ RegionUpdateInputSchema,RegionUncheckedUpdateInputSchema ]),
  where: RegionWhereUniqueInputSchema,
}).strict()

export const RegionUpdateManyArgsSchema: z.ZodType<Prisma.RegionUpdateManyArgs> = z.object({
  data: z.union([ RegionUpdateManyMutationInputSchema,RegionUncheckedUpdateManyInputSchema ]),
  where: RegionWhereInputSchema.optional(),
}).strict()

export const RegionDeleteManyArgsSchema: z.ZodType<Prisma.RegionDeleteManyArgs> = z.object({
  where: RegionWhereInputSchema.optional(),
}).strict()

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
}).strict()

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
  create: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
}).strict()

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict()

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema,
}).strict()

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema,CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(),
}).strict()

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
}).strict()

export const TechCreateArgsSchema: z.ZodType<Prisma.TechCreateArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  data: z.union([ TechCreateInputSchema,TechUncheckedCreateInputSchema ]),
}).strict()

export const TechUpsertArgsSchema: z.ZodType<Prisma.TechUpsertArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereUniqueInputSchema,
  create: z.union([ TechCreateInputSchema,TechUncheckedCreateInputSchema ]),
  update: z.union([ TechUpdateInputSchema,TechUncheckedUpdateInputSchema ]),
}).strict()

export const TechDeleteArgsSchema: z.ZodType<Prisma.TechDeleteArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  where: TechWhereUniqueInputSchema,
}).strict()

export const TechUpdateArgsSchema: z.ZodType<Prisma.TechUpdateArgs> = z.object({
  select: TechSelectSchema.optional(),
  include: TechIncludeSchema.optional(),
  data: z.union([ TechUpdateInputSchema,TechUncheckedUpdateInputSchema ]),
  where: TechWhereUniqueInputSchema,
}).strict()

export const TechUpdateManyArgsSchema: z.ZodType<Prisma.TechUpdateManyArgs> = z.object({
  data: z.union([ TechUpdateManyMutationInputSchema,TechUncheckedUpdateManyInputSchema ]),
  where: TechWhereInputSchema.optional(),
}).strict()

export const TechDeleteManyArgsSchema: z.ZodType<Prisma.TechDeleteManyArgs> = z.object({
  where: TechWhereInputSchema.optional(),
}).strict()

export const PositionCreateArgsSchema: z.ZodType<Prisma.PositionCreateArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  data: z.union([ PositionCreateInputSchema,PositionUncheckedCreateInputSchema ]),
}).strict()

export const PositionUpsertArgsSchema: z.ZodType<Prisma.PositionUpsertArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereUniqueInputSchema,
  create: z.union([ PositionCreateInputSchema,PositionUncheckedCreateInputSchema ]),
  update: z.union([ PositionUpdateInputSchema,PositionUncheckedUpdateInputSchema ]),
}).strict()

export const PositionDeleteArgsSchema: z.ZodType<Prisma.PositionDeleteArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  where: PositionWhereUniqueInputSchema,
}).strict()

export const PositionUpdateArgsSchema: z.ZodType<Prisma.PositionUpdateArgs> = z.object({
  select: PositionSelectSchema.optional(),
  include: PositionIncludeSchema.optional(),
  data: z.union([ PositionUpdateInputSchema,PositionUncheckedUpdateInputSchema ]),
  where: PositionWhereUniqueInputSchema,
}).strict()

export const PositionUpdateManyArgsSchema: z.ZodType<Prisma.PositionUpdateManyArgs> = z.object({
  data: z.union([ PositionUpdateManyMutationInputSchema,PositionUncheckedUpdateManyInputSchema ]),
  where: PositionWhereInputSchema.optional(),
}).strict()

export const PositionDeleteManyArgsSchema: z.ZodType<Prisma.PositionDeleteManyArgs> = z.object({
  where: PositionWhereInputSchema.optional(),
}).strict()