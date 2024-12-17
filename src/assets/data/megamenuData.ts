interface Menu {
    title?: string;
    menu: {
        title: string;
        link: string;
    }
}

interface MegaMenuData {
    title: string;
    link?: string;
    grid?: number;
    subMenu: {
        title?: string;
        menu: {
            title: string;
            link: string;
            subSubMenu?: { title: string, link: string }[]
        }[]
    }[]
}
export const MegaMenuData: MegaMenuData[] = [
    {
        title: "Platform",
        grid: 2,
        subMenu: [
            {
                title: "Why BigCommerce?",
                menu: [
                    {
                        title: "Engage",
                        link: "/"
                    },
                    {
                        title: "Attract",
                        link: "/"
                    },
                    {
                        title: "Convert",
                        link: "/"
                    },
                    {
                        title: "Expand",
                        link: "/"
                    },
                    {
                        title: "Operate",
                        link: "/"
                    },
                ]
            },
            {
                title: "Product",
                menu: [
                    {
                        title: "Features",
                        link: "/"
                    }, {
                        title: "Services",
                        link: "/"
                    }
                ]
            },
        ]
    },
    {
        title: "Solution",
        grid: 2,
        subMenu: [
            {
                title: "By use case",
                menu: [
                    {
                        title: "Multi-Storefront",
                        link: "/"
                    },
                    {
                        title: "Headless Commerce",
                        link: "/"
                    },
                    {
                        title: "B2B",
                        link: "/"
                    },
                    {
                        title: "Wholesale",
                        link: "/"
                    },
                    {
                        title: "Omnichannel",
                        link: "/"
                    },
                    {
                        title: "International",
                        link: "/"
                    },
                    {
                        title: "Commerce-as-a-Service",
                        link: "/"
                    },
                    {
                        title: "Crypto",
                        link: "/"
                    },
                    {
                        title: "Data & Personalization",
                        link: "/"
                    },
                    {
                        title: "AI for Commerce",
                        link: "/"
                    },
                ]

            },
            {
                title: "By industry",
                menu: [
                    {
                        title: "Fashion & Apparel",
                        link: "/"
                    },
                    {
                        title: "Health & Beauty",
                        link: "/"
                    },
                    {
                        title: "Food & Beverage",
                        link: "/"
                    },
                    {
                        title: "Manufacturing",
                        link: "/"
                    },
                    {
                        title: "Automotive",
                        link: "/"
                    },
                    {
                        title: "CBD",
                        link: "/"
                    },
                    {
                        title: "Home & Garden",
                        link: "/"
                    },

                ]
            }
        ]
    },
    {
        title: "Customers",
        grid: 1,
        subMenu: [
            {
                menu: [
                    {
                        title: "Case Studies",
                        link: "/"
                    },
                    {
                        title: "Customer Examples",
                        link: "/"
                    },

                ]

            },
        ]
    },
    {
        title: "Partners",
        grid: 1,
        subMenu: [
            {
                menu: [
                    {
                        title: "Overview",
                        link: "/"
                    },
                    {
                        title: "Become a Partner",
                        link: "/"
                    },
                    {
                        title: "Find an Agency Partner",
                        link: "/"
                    },
                    {
                        title: "Find a Technology Partner",
                        link: "/"
                    },
                    {
                        title: "Powered By",
                        link: "/"
                    },

                ]

            },
        ]
    },
    {
        title: "Resources",
        grid: 1,
        subMenu: [
            {
                menu: [
                    {
                        title: "Overview",
                        link: "/"
                    },
                    {
                        title: "Articles",
                        link: "/"
                    },
                    {
                        title: "Press",
                        link: "/press"

                    },
                    {
                        title: "Front Cloud  Academy",
                        link: "/",
                        subSubMenu: [

                            {
                                title: "Guide",
                                link: "/resources/guides"
                            },
                            {
                                title: "Webinars",
                                link: "/resources/webinars"
                            },
                            {
                                title: "Podcast",
                                link: "/resources/podcasts"
                            },

                            {
                                title: "Videos",
                                link: "/resources/videos"
                            },

                        ]
                    },
                    {
                        title: "Reports",
                        link: "/"
                    },
                    {
                        title: "University",
                        link: "/"
                    },
                    {
                        title: "Events",
                        link: "/"
                    },
                    {
                        title: "Blog",
                        link: "/"
                    },

                ]

            },
        ]
    },
    {
        title: "Pricing",
        link: "/pricing",
        grid: 1,
        subMenu: [
        ]
    },
]

