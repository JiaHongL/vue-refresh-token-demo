import { useUserStore } from "../stores/userStore";

export const fetchDataBeforeEnter = async (to, from, next) => {
  try {
    const userStore = useUserStore();
    const categories = await userStore.getCategories();
    const profile = await userStore.getProfile();
    if (categories && profile) {
      next();
    } else {
      next(false);
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    next(false);
  }
};