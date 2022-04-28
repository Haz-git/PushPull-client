
# PushPull (Client-Side/Front-End)
A *fitness programming* web-app created for rapid prototyping of workout-related programs and serve as a fitness community.

- This repository houses the client-side of my web application *PushPull*. As such, most of the details mentioned here are largely front-end related. If you want to learn about my API (server-side) please visit [PushPull's server-side repository](https://github.com/Haz-git/PushPull-server).

### About The Project
---
*PushPull* is my newest passion project designed for the rapid creation of fitness programs for distribution. Whether fitness trainer, professional bodybuilder, student athlete, or just a general fitness enthusiast like me-- I wanted PushPull to serve as a centralized community where people can create, search, rate, and discuss a variety of workout programs.

During my fitness journey, I jumped from one workout program to another when the time felt right. I perused Reddit for hours to find the best workout programs for my current level. Then, after long contemplation, I visited multiple sketchy blog websites to find and download that fitness program. My dislike toward this process led to the creation of *PushPull*.

#### Built With
- TypeScript
- JavaScript
- HTML5
- CSS3
- ReactJS
- Redux, React-Redux
- Styled-Components
- Mantine (Component Library)

*For more, see **acknowledgements***.

### Usage
---

1. Head over to [PushPull's Website](https://www.gopushpull.com/).
2. Click 'Sign up' in the upper right--create an account.
3. Log in.
4. Start exploring!

### Feature Highlights
---
**Here are just a few features in *PushPull***.

The **Landing Page** was designed in collaboration with a UI/UX designer. Authentication system complete with protected routes was developed by integrating the auth provider *UserFront*. The user can sign up or log in at any unprotected page.

![](https://media.giphy.com/media/Ee4JJT2M9Ad3s8BtBV/giphy.gif)

The **Search Database** allows users to use an incredible range of filters to sift through many workout programs.

![](https://media.giphy.com/media/6Szg20JjYA6qCaBMKF/giphy.gif)

Authenticated users are able to submit a review of a workout program by filling out a **Review Form**. This review form is a custom wizard form implemented from scratch. The review contributes to the program's overall ratings and other users can choose to like or dislike the review.

![](https://media.giphy.com/media/lQr2hmTsrAdftL6O9r/giphy.gif)

Authenticated users have access to their **Profile Page** which includes avatar and user detail customization.

![](https://media.giphy.com/media/fIe8TvQnnIhGfpHpPg/giphy.gif)

Authenticated users also have access to **Builder Mode** which enables crafting of custom workout routines. Here, the user can create *projects* and then nest individual *templates* within each project.

![](https://media.giphy.com/media/GRzFToVGn7KjHBDhUH/giphy.gif)

In the **Builder Mode**, the owner can add exercises as blocks where they can drag and drop to corresponding columns defaultly labeled as 'day 1', 'day 2', etc. The block-building architecture allows the construction of complex workout routines. Workout routines can also be separated by 'sheets' allowing for more organizational capabilities.

Once the owner publishes, they (and other guests!) can view and download the routine as a PDF!

![](https://media.giphy.com/media/CFhiWDr7ygtMwwrG5s/giphy.gif)

**PushPull** offers more capabilities than the features described here. Head over to **Usage** to try Pushpull yourself!
    
### Contributing
---
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions or suggestions to this project are appreciated.

1. Fork the Project.
2. Create your Feature Branch (git checkout -b feature/yourFeature).
3. Commit your Changes (git commit -m 'Add some yourFeature').
4. Push to the Branch (git push origin feature/yourFeature).
5. Open a Pull Request.

### License
---
Distributed under the GPL-3.0 License. See [LICENSE](https://github.com/Haz-git/PushPull-client/blob/master/LICENSE) for more information.

### Contact
---
- Created By: Harry Zhou
- Email: harryzhou.swe@gmail.com

### Acknowledgements
---
**The following are some packages used in the creation of this app.**
- react-pdf
- react-nprogress
- react-beautiful-dnd
- react-grid-layout
- userfront/react
- axios
- dayJS
- react-quill
- recharts
- redux-persist
- redux-thunk
- ...and more..
