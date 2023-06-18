import type { UserJSON as User} from "@clerk/types";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profile_image_url,
  };
};
