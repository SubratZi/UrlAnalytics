# UrlAnalytics
UrlAnalytics is a web app that gives the shortened url of the given url and lets user analyse their website visitors and helps them boost their website use for production. It analyses on different categories like: Visitor's device, Who was the referer, which country was the visitor from, how many times they clicked , whats the click ratio and which variation wins among all of them. It lets user provide different url (different variations) and finally analyses the result among those variations. It can be a simple easy to use and goto analyser for analysis their website results.


## Motivation:

 Basically I wondered making UrlAnalytics just a week ago when I was working on a team project with my group and we had to share resources with our team. We had to share same text same message , everything same but links different depending on content we want them to see. But I encountered a problem. I didnt find any way to see who clicked the link which link got more attention. I also wondered what if the content is same but just the links are different which link would they prefer like the long one or the short one or even if its short one which short link would get more attention. For example: One friend sends the link of hackclub and the next one sends the same link but there are two varities (two different short codes) which links gets more attention or better I would say which friend can get more attention as both links are shortened. So, I wasnt getting any platform to solve this problem in simplest of ways possible, even if I got , they were loaded with ads and complaications. So I made UrlAnalytics that shortens your url and anlaysses it on the basis of click-count ratio and further information.


## Project Structure:
```
UrlAnalytics/
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── database.py
│       ├── redis_client.py
│       ├── schemas.py
│       ├── models/
│       │   ├── __init__.py
│       │   └── models.py
│       ├── routes/
│       │   ├── __init__.py
│       │   ├── projects.py
│       │   ├── redirect.py
│       │   └── analytics.py
│       └── services/
│           ├── __init__.py
│           └── tracking.py
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/
        │   └── client.js
        ├── pages/
        │   ├── Home.jsx
        │   ├── CreateProject.jsx
        │   ├── EditProject.jsx
        │   └── Analytics.jsx
        └── components/
            ├── Navbar.jsx
            ├── ProjectCard.jsx
            ├── VariationRow.jsx
            ├── BreakdownChart.jsx
            └── Skeleton.jsx
```