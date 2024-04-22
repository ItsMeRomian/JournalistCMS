import { getCurrentUser } from "vuefire";

export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser();

  if (user?.uid == undefined || user?.uid == null) {
    console.log(`[AUTH] Page ${to.path} requires authentication`);
    return navigateTo("/admin/login");
  } else {
    console.log(`[AUTH] User ${user.uid} is authenticated`);
  }
});
