module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}


/*
Alright! Imagine you're building a big, interactive website using a tool called Express.js. This tool helps you create different pages and connect them together. Now, some pages on your website need to do complex tasks, like saving information to a database or fetching data from another website. These tasks can take some time, so you want to handle them in a special way.

This code you've shown does just that. It's like a special wrapper for these complex tasks. Here's how it works:

You define your complex task as a function. For example, let's say you're saving a user's information to your website's database.
    You use this special wrapper function on that complex task function. It's like putting a nice cover around it. This wrapper makes sure that if something goes wrong (like an error happens), it catches that error.
So, whenever you use this wrapper around your task, if there's an error, it's caught and handled in a smart way. It doesn't make your website crash; instead, it sends the error to another part of your website that knows how to deal with it.
In simple terms, it's like having a safety net around your important tasks. If something goes wrong, instead of everything falling apart, it gets caught and dealt with calmly.*/
