# inventory-management-app

A full-stack web application that allows users to manage their inventory of available and sold items.

**Link to project:** https://inventory-management-app.fly.dev/

![alt text](https://i.imgur.com/626VcJZ.png)

## How It's Made:

**Tech used:** EJS, CSS, JavaScript, Node.js, Express, MongoDB, Mongoose, Passport

This full-stack web application was made using Node.js and Express. EJS was used to dynamically render HTML on the page. MongoDB was used as the database and stores all the users and items added by users. Mongoose was used to make working with MongoDB easier and made it easier to structure the data of the application using schemas and models. Passport was used for authentication and passwords were hashed using bcrypt and user sessions were stored in MongoDB using the connect-mongo package. This application was organized using the MVC (Model-View-Controller) design pattern.

## Optimizations:

I would like to improve the styling of this app by using either Bootstrap or Tailwind CSS. This application only allows users to see their own items and they are unable to view items from other users which is something I would like to improve on. I would also like to add more routes to the application to make it more interactive such as making a comment system or messaging system to allow users to conduct transactions with other users.

## Lessons Learned:

I was able to learn how to use EJS templating language and use it to make dynamic pages. The MVC design pattern was really useful in terms of making my code easier to read and organize. MongoDB was my first experience with using a database and it made it a lot easier to persist data when compared to storing data in local storage. I also learned that it is best to use something like passport for authentication instead of trying to design your own authentication system.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**ItemPickups:** https://github.com/vzMars/item-pickups

**MyBootList API:** https://github.com/vzMars/mybooklist-api

**Discord YouTube Bot:** https://github.com/vzMars/discord-youtube-bot
