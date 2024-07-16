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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/headers${stringifiedQuery}&select[0]=title&select[1]=title&select[2]=logo&select[3]=primaryNavigation.type&select[4]=primaryNavigation.navItems.reference.title&select[5]=primaryNavigation.navItems.reference.breadcrumbs`,
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
