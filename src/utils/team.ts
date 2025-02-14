export const getCategoryDescription = (category: string): string => {
  switch (category) {
    case "Founders":
      return "The visionaries who established and shaped our organization";
    case "Board":
      return "Our esteemed board members providing strategic guidance";
    case "Staff":
      return "Dedicated professionals driving our mission forward";
    default:
      return "";
  }
};

export const sortStaffMembers = (staff: any[]) => {
  return staff.sort((a, b) => {
    if (a.position.toLowerCase().includes("multimedia web developer"))
      return -1;
    if (b.position.toLowerCase().includes("multimedia web developer")) return 1;
    return a.name.localeCompare(b.name);
  });
};
