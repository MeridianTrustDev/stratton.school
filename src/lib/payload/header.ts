import qs from "qs";

export const getHeader = async () => {
  try {
    const query = {
      "tenant.name": {
        equals: "Stratton School",
      },
    };

    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/headers${stringifiedQuery}&select[0]=title&select[2]=logo&select[3]=primaryNavigation.type&select[4]=primaryNavigation.navItems.reference.title&select[5]=primaryNavigation.navItems.reference.breadcrumbs&select[6]=primaryNavigation.navItems.children.type&select[7]=primaryNavigation.navItems.children.reference.slug&select[8]=primaryNavigation.navItems.children.children.type&select[9]=primaryNavigation.navItems.children.children.reference.slug&select[10]=primaryNavigation.navItems.label&select[11]=primaryNavigation.navItems.children.label&select[12]=primaryNavigation.navItems.children.children.label&select[7]=primaryNavigation.navItems.children.reference.id`,
      {
        next: {
          tags: ["navigation"],
        },
      }
    );

    return (await response.json()).docs[0];
  } catch (error) {
    console.log(error);
    return;
  }
};
