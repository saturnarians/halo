import { prisma } from "@/lib/prisma";

/**
 * Resolve tenant by slug. If none provided, tries default from env.
 * Returns tenant or null.
 */
export async function resolveTenantBySlug(slug?: string) {
  const effective = slug ?? process.env.NEXT_PUBLIC_DEFAULT_TENANT_SLUG ?? "root";
  return prisma.tenant.findUnique({ where: { slug: effective } });
}
