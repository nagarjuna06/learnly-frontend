const categories = [
  {
    title: "Development",
    url: "/courses/development",
    subCategories: [
      {
        title: "Web Development",
        url: "/courses/development/web-development",
      },
      {
        title: "Mobile Development",
        url: "/courses/development/mobile-development",
      },
      {
        title: "Programming Languages",
        url: "/courses/development/programming-languages",
      },
      {
        title: "Game Development",
        url: "/courses/development/game-development",
      },
      {
        title: "Database Design and Development",
        url: "/courses/development/database-design-and-development",
      },
      {
        title: "Software Testing",
        url: "/courses/development/software-testing",
      },
    ],
  },
  {
    title: "Business",
    url: "/courses/business",
    subCategories: [
      {
        title: "Entrepreneurship",
        url: "/courses/business/entrepreneurship",
      },
      {
        title: "Communication",
        url: "/courses/business/communication",
      },
      {
        title: "Management",
        url: "/courses/business/management",
      },
      {
        title: "Sales",
        url: "/courses/business/sales",
      },
      {
        title: "Business Strategy",
        url: "/courses/business/strategy",
      },
    ],
  },
  {
    title: "Design",
    url: "/courses/design",
    subCategories: [
      {
        title: "User Experience Design",
        url: "/courses/design/user-experience-design",
      },
      {
        title: "Web Design",
        url: "/courses/design/web-design",
      },
      {
        title: "Graphic Design and Illustration",
        url: "/courses/design/graphic-design-and-illustration",
      },
      {
        title: "Fashion Design",
        url: "/courses/design/fashion-design",
      },
      {
        title: "Game Design",
        url: "/courses/design/game-design",
      },
      {
        title: "Interior Design",
        url: "/courses/design/interior-design",
      },
    ],
  },
  {
    title: "Marketing",
    url: "/courses/marketing",
    subCategories: [
      {
        title: "Digital Marketing",
        url: "/courses/marketing/digital-marketing",
      },
      {
        title: "Search Engine Optimization",
        url: "/courses/marketing/search-engine-optimization",
      },
      {
        title: "Social Media Marketing",
        url: "/courses/marketing/social-media-marketing",
      },
      {
        title: "Branding",
        url: "/courses/marketing/branding",
      },
      {
        title: "Growth Hacking",
        url: "/courses/marketing/growth-hacking",
      },
    ],
  },
  {
    title: "Personal Development",
    url: "/courses/personal-development",
    subCategories: [
      {
        title: "Leadership",
        url: "/courses/personal-development/leadership",
      },
      {
        title: "Career Development",
        url: "/courses/personal-development/career-development",
      },
      {
        title: "Personal Productivity",
        url: "/courses/personal-development/personal-productivity",
      },
    ],
  },
  {
    title: "Health and Fitness",
    url: "/courses/health-and-fitness",
    subCategories: [
      {
        title: "Fitness",
        url: "/courses/health-and-fitness/fitness",
      },
      {
        title: "Yoga",
        url: "/courses/health-and-fitness/yoga",
      },
      {
        title: "Meditation",
        url: "/courses/health-and-fitness/meditation",
      },
      {
        title: "Nutrition and Diet",
        url: "/courses/health-and-fitness/nutrition-and-diet",
      },
      {
        title: "Mental Health",
        url: "/courses/health-and-fitness/mental-health",
      },
    ],
  },
];
export default categories;

export const getUrl = (value) => {
  for (let category of categories) {
    if (category.title === value.category) {
      for (let sub of category.subCategories) {
        if (sub.title === value.sub) {
          return { categoryUrl: category.url, subUrl: sub.url };
        }
      }
    }
  }
};
